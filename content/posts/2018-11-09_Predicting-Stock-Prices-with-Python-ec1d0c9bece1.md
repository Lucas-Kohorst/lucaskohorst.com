+++ 
date = "2018-11-09"
title = "Predicting Stock Prices with Python"
slug = "stock-predictions" 
tags = ['Prediction', 'Finance', 'Python']
categories = []
+++

Investing in the stock market used to require a ton of capital and a
broker that would take a cut from your earnings. Then Robinhood
disrupted the industry allowing you to invest as little as \$1 and avoid
a broker altogether. Robinhood and apps like it have opened up investing
to anyone with a connected device and gave non-investors the opportunity
to profit from the newest tech start-up.

![](https://cdn-images-1.medium.com/max/800/0*kHERZYJucDouYv--)

“space gray iPhone X turned on” by
[rawpixel](https://unsplash.com/@rawpixel?utm_source=medium&utm_medium=referral)
on [Unsplash](https://unsplash.com?utm_source=medium&utm_medium=referral)

However, giving those of us who are not economists or accountants the
freedom to invest our money in the “hottest” or “trending” stocks is not
always the best financial decision.

Thousands of companies use software to predict the movement in the stock
market in order to aid their investing decisions. The average Robinhood
user does not have this available to them. Primitive predicting
algorithms such as a time-sereis linear regression can be done with a
time series prediction by leveraging python packages like
[scikit-learn](https://pypi.org/project/scikit-learn/) and
[iexfinnance](https://pypi.org/project/iexfinance/).

This program will scrape a given amount of stocks from the web, predict
their price in a set number of days and send an SMS message to the user
informing them of stocks that might be good to check out and invest in.

### Setup {#e63d .graf .graf--h3 .graf-after--p name="e63d"}

In order to create a program that predicts the value of a stock in a set
amount of days, we need to use some very useful python packages. You
will need to install the following packages:

1.  [nump](https://pypi.org/project/numpy/)y
2.  [selenium](https://pypi.org/project/selenium/)
3.  [sklearn](https://pypi.org/project/scikit-learn/)
4.  i[exfinance](https://pypi.org/project/iexfinance/)

If you do not already have some of these packages you can install them
through `pip install PACKAGE`{.markup--code .markup--p-code} or by
cloning the git repository.

Here is an example of installing numpy with pip

``` {#6fa2 .graf .graf--pre .graf-after--p name="6fa2"}
pip install numpy
```

and with git

``` {#ea4c .graf .graf--pre .graf-after--p name="ea4c"}
git clone https://github.com/numpy/numpycd numpypython setup.py install
```

Now open up your favorite text editor and create a new python file.
Start by importing the following packages

``` {#ab92 .graf .graf--pre .graf-after--p name="ab92"}
import numpy as npfrom datetime import datetimeimport smtplibimport timefrom selenium import webdriver
```

``` {#49c7 .graf .graf--pre .graf-after--pre name="49c7"}
#For Predictionfrom sklearn.linear_model import LinearRegressionfrom sklearn import preprocessing, cross_validation, svm
```

``` {#a8dc .graf .graf--pre .graf-after--pre name="a8dc"}
#For Stock Datafrom iexfinance import Stockfrom iexfinance import get_historical_data
```

*Note: the datetime, time and smtplib packages come with python*

In order to scrape the Yahoo stock screener, you will also need to
install the Chromedriver in order to properly use Selenium. That can be
found [here](https://sites.google.com/a/chromium.org/chromedriver/)

### Getting the Stocks {#d3de .graf .graf--h3 .graf-after--p name="d3de"}

Using the Selenium package we can scrape Yahoo stock screeners for
stock’s ticker abbreviations.

First, make a function `getStocks`{.markup--code .markup--p-code} that
takes a parameter of `n`{.markup--code .markup--p-code}, where n is the
number of stocks we wish to retrieve.

``` {#de1f .graf .graf--pre .graf-after--p name="de1f"}
def getStocks(n):
```

In the function create your chrome driver then use
`driver.get(url)`{.markup--code .markup--p-code} to retrieve the desired
webpage. We will be navigating to
[https://finance.yahoo.com/screener/predefined/aggressive\_small\_caps?offset=0&count=202](https://finance.yahoo.com/screener/predefined/aggressive_small_caps?offset=0&count=202)
which will display 200 stocks listed in the category “aggressive small
caps”. If you go to
[https://finance.yahoo.com/screener](https://finance.yahoo.com/screener)
you will see a list of all screener categories that Yahoo provides. You
can then change the URL to your liking.

``` {#da2b .graf .graf--pre .graf-after--p name="da2b"}
#Navigating to the Yahoo stock screener
```

``` {#4cb2 .graf .graf--pre .graf-after--pre name="4cb2"}
driver = webdriver.Chrome(
```

``` {#dfb1 .graf .graf--pre .graf--startsWithSingleQuote .graf-after--pre name="dfb1"}
‘PATH TO CHROME DRIVER’)
```

``` {#c8b1 .graf .graf--pre .graf-after--pre name="c8b1"}
url = “https://finance.yahoo.com/screener/predefined/aggressive_small_caps?offset=0&count=202"
```

``` {#e32d .graf .graf--pre .graf-after--pre name="e32d"}
driver.get(url)
```

Make sure to add the path to where you downloaded the chromedriver to
where the bolded code is.

You will now need to create a list to hold the ticker values
`stock_list = []`{.markup--code .markup--p-code} .

Next, we need to find the XPath for the ticker elements so that we can
scrape them. Go to the screener URL and open up developer tools in your
web browser (**Command+Option+i** / **Control+Shift+I** or **F12** for
Windows).

Click the “Select Element” button

![](https://cdn-images-1.medium.com/max/800/1*95J7ATFmf79k4Z4R-T5u2w.jpeg)

Click on the ticker and inspect its attributes

![](https://cdn-images-1.medium.com/max/800/1*jeq-TTXviKVBh3aDjGE3VA.jpeg)

Finally, copy the XPath of the first ticker the HTML element should look
something like this

``` {#ba2e .graf .graf--pre .graf-after--p name="ba2e"}
<a href=”/quote/RAD?p=RAD” title=”Rite Aid Corporation” class=”Fw(b)” data-reactid=”79">RAD</a>
```

![](https://cdn-images-1.medium.com/max/800/1*9LafC5A2cq5_3HzQzZz4OA.jpeg)

The XPath should look something like this

``` {#96d4 .graf .graf--pre .graf-after--p name="96d4"}
//*[@id=”scr-res-table”]/div[2]/table/tbody/tr[1]/td[1]/a
```

If you inspect the ticker attributes below the first one you will notice
that the XPath is exactly the same except the bolded 1 in the code above
increments by 1 for each ticker. So the 57th ticker XPath value is

``` {#2461 .graf .graf--pre .graf-after--p name="2461"}
//*[@id=”scr-res-table”]/div[2]/table/tbody/tr[57]/td[1]/a
```

This greatly helps us. We can simply make a `for`{.markup--code
.markup--p-code} loop that increments that value every time it runs and
stores the value of the ticker to our `stock_list`{.markup--code
.markup--p-code}.

``` {#e306 .graf .graf--pre .graf-after--p name="e306"}
stock_list = []n += 1
```

``` {#5399 .graf .graf--pre .graf-after--pre name="5399"}
for i in range(1, n):  ticker = driver.find_element_by_xpath(
```

``` {#df6a .graf .graf--pre .graf--startsWithSingleQuote .graf-after--pre name="df6a"}
‘//*[@id = “scr-res-table”]/div[2]/table/tbody/tr[‘ + str(i) +          ‘]/td[1]/a’)
```

``` {#535d .graf .graf--pre .graf-after--pre name="535d"}
stock_list.append(ticker.text)
```

`n`{.markup--code .markup--p-code} is the number of stocks that our
function, `getStocks(n)`{.markup--code .markup--p-code}, will retrieve.
We have to increment by 1 since Python is 0-indexed. Then we use the
value `i `{.markup--code .markup--p-code}to modify our XPath for each
ticker attribute.

Use `driver.quit()`{.markup--code .markup--p-code} to exit the web
browser. We now have all ticker values and are ready to predict the
stocks.

We are going to create a function to predict the stocks in the next
section but right now we can create another `for`{.markup--code
.markup--p-code} loop that cycles through all the ticker values in our
list and predicts the price for each.

``` {#00e6 .graf .graf--pre .graf-after--p name="00e6"}
#Using the stock list to predict the future price of the stock a specificed amount of days
```

``` {#fabf .graf .graf--pre .graf-after--pre name="fabf"}
for i in stock_list:  try:    predictData(i, 5)  except:    print("Stock: " + i + " was not predicted")
```

Handle the code with a try and except block (just in case our stock
package does not recognize the ticker value).

### Predicting the Stocks {#11cc .graf .graf--h3 .graf-after--p name="11cc"}

Create a new function `predictData`{.markup--code .markup--p-code} that
takes the parameters `stock`{.markup--code .markup--p-code} and
`days`{.markup--code .markup--p-code} (where days is the number of days
we want to predict the stock in the future). We are going to use about 2
years of data for our prediction from January 1, 2017, until now
(although you could use whatever you want). Set
`start = datetime(2017, 1, 1)`{.markup--code .markup--p-code} and
`end = datetime.now()`{.markup--code .markup--p-code}. Then use the
iexfinance function to get the historical data for the given stock
`df = get_historical_data(stock, start=start, end=end, output_format=’pandas’)`{.markup--code
.markup--p-code}.

Then export the historical data to a .csv file, create a new virtual
column for the prediction and set
`forecast_time = int(days)`{.markup--code .markup--p-code}

``` {#b9d4 .graf .graf--pre .graf-after--p name="b9d4"}
start = datetime(2017, 1, 1)end = datetime.now()
```

``` {#c66a .graf .graf--pre .graf-after--pre name="c66a"}
#Outputting the Historical data into a .csv for later usedf = get_historical_data(stock, start=start, end=end,     output_format='pandas')
```

``` {#ab28 .graf .graf--pre .graf-after--pre name="ab28"}
csv_name = ('Exports/' + stock + '_Export.csv')df.to_csv(csv_name)df['prediction'] = df['close'].shift(-1)df.dropna(inplace=True)forecast_time = int(days)
```

Use numpy to manipulate the array then, preprocess the values and create
X and Y training and testing values. For this prediction, we are going
to use a test\_size of `0.5`{.markup--code .markup--p-code} this value
gave me the most accurate results.

``` {#aa55 .graf .graf--pre .graf-after--p name="aa55"}
X = np.array(df.drop(['prediction'], 1))Y = np.array(df['prediction'])X = preprocessing.scale(X)X_prediction = X[-forecast_time:]
```

``` {#3804 .graf .graf--pre .graf-after--pre name="3804"}
X_train, X_test, Y_train, Y_test =         cross_validation.train_test_split(X, Y, test_size=0.5)
```

Finally, run a linear regression on the data. Create a variable
`clf = LinearRegression()`{.markup--code .markup--p-code}, fit the X and
Y training data and store the X value prediction in a variable
`prediction`{.markup--code .markup--p-code}.

``` {#48c2 .graf .graf--pre .graf-after--p name="48c2"}
#Performing the Regression on the training data
```

``` {#e113 .graf .graf--pre .graf-after--pre name="e113"}
clf = LinearRegression()clf.fit(X_train, Y_train)prediction = (clf.predict(X_prediction))
```

In the next section, we will define the function,
`sendMessage`{.markup--code .markup--p-code}, that sends the prediction
of the stocks via SMS. In the `predictData`{.markup--code
.markup--p-code} function add an `if`{.markup--code .markup--p-code}
statement that stores a string as the output and calls the
`sendMessage`{.markup--code .markup--p-code} function passing it the
parameter `output`{.markup--code .markup--p-code}.

The variable `output`{.markup--code .markup--p-code} can contain
whatever information that you find useful. I had it tell me the stock
name, the 1-day prediction and the 5-day prediction.

``` {#dd3e .graf .graf--pre .graf-after--p name="dd3e"}
#Sending the SMS if the predicted price of the stock is at least 1 greater than the previous closing price
```

``` {#399f .graf .graf--pre .graf-after--pre name="399f"}
last_row = df.tail(1)if (float(prediction[4]) > (float(last_row['close']))):
```

``` {#d1cb .graf .graf--pre .graf-after--pre name="d1cb"}
output = ("\n\nStock:" + str(stock) + "\nPrior Close:\n" +         str(last_row['close']) + "\n\nPrediction in 1 Day: " + str(prediction[0]) + "\nPrediction in 5 Days: " + str(prediction[4]))
```

``` {#ba0f .graf .graf--pre .graf-after--pre name="ba0f"}
sendMessage(output)
```

### Sending the Message {#8a5f .graf .graf--h3 .graf-after--pre name="8a5f"}

Create a function `sendMessage`{.markup--code .markup--p-code} that
takes `output`{.markup--code .markup--p-code} as a parameter. To send an
SMS message we are going to use the `smtplib`{.markup--code
.markup--p-code} package making it so we can send text messages through
our email.

Store your email username, password and the receiving number as
variables. My cell phone carrier is Verizon so I am using the @vtext
domain here are some popular phone companies extensions thanks to this
[website](https://20somethingfinance.com/how-to-send-text-messages-sms-via-email-for-free/).

-   AT&T: number@txt.att.net (SMS), number@mms.att.net (MMS)
-   T-Mobile: number@tmomail.net(SMS & MMS)
-   Verizon: number@vtext.com (SMS), number@vzwpix.com (MMS)
-   Sprint: number@messaging.sprintpcs.com(SMS), number@pm.sprint.com
    (MMS)
-   Virgin Mobile: number@vmobl.com (SMS), number@vmpix.com (MMS)

``` {#ff1c .graf .graf--pre .graf-after--li name="ff1c"}
def sendMessage(output):
```

``` {#29ba .graf .graf--pre .graf-after--pre name="29ba"}
username = "EMAIL"  password = "PASSWORD"  vtext = "PHONENUMBER@vtext.com"
```

Use the following lines to send the SMS with the proper message

``` {#93fb .graf .graf--pre .graf-after--p name="93fb"}
message = outputmsg = """From: %s To: %s %s""" % (username, vtext, message)
```

``` {#dc61 .graf .graf--pre .graf-after--pre name="dc61"}
server = smtplib.SMTP('smtp.gmail.com', 587)server.starttls()server.login(username, password)server.sendmail(username, vtext, msg)server.quit()
```

### Running the Program {#82ff .graf .graf--h3 .graf-after--pre name="82ff"}

Finally, create a main method to run the program. We are going to set
the number of stocks to be predicted at 200.

``` {#01f5 .graf .graf--pre .graf-after--p name="01f5"}
if __name__ == '__main__':  getStocks(200)
```

### Conclusion {#e311 .graf .graf--h3 .graf-after--pre name="e311"}

Running the prediction on just 10 stocks the average percent error
between the actual 1-day price and 1 day predicted price was
**9.02%**where the 5-day percent error was a surprising **5.90%**off.
This means that, on average, the 5-day prediction was only **\$0.14**
off of the actual price.

These results could be attributed to a small sample size but either way
they are promising and can serve as a great aid when you are investing
in stocks.

* * * * *

[View the full source code on
Github](https://github.com/Lucas-Kohorst/Python-Stock/)

[**Create a Twitter Bot in Python Using Tweepy**\
*With about 15% of Twitter being composed of bots, I wanted to try my
hand at it. I googled how to create a Twitter
bot…*medium.freecodecamp.org](https://medium.freecodecamp.org/creating-a-twitter-bot-in-python-with-tweepy-ac524157a607 "https://medium.freecodecamp.org/creating-a-twitter-bot-in-python-with-tweepy-ac524157a607")[](https://medium.freecodecamp.org/creating-a-twitter-bot-in-python-with-tweepy-ac524157a607)

[**Twitter Data Analysis**\
*After creating the Free Wtr bot using Tweepy and Python and this code,
I wanted a way to see how Twitter users
were…*medium.co](https://medium.com/@lucaskohorst/twitter-data-analysis-d5fb7d42ebc7 "https://medium.com/@lucaskohorst/twitter-data-analysis-d5fb7d42ebc7")[](https://medium.com/@lucaskohorst/twitter-data-analysis-d5fb7d42ebc7)

[**Ranking News Bias in Python**\
*I recently read an article in the Washington Post titled, “Ranking the
media from liberal to conservative, based
on…*towardsdatascience.com](https://towardsdatascience.com/ranking-news-bias-in-python-e9bb5d1ba93f "https://towardsdatascience.com/ranking-news-bias-in-python-e9bb5d1ba93f")[](https://towardsdatascience.com/ranking-news-bias-in-python-e9bb5d1ba93f)

By [Lucas Kohorst](https://medium.com/@lucaskohorst) on [November 9,
2018](https://medium.com/p/ec1d0c9bece1).

[Canonical
link](https://medium.com/@lucaskohorst/predicting-stock-prices-with-python-ec1d0c9bece1)

Exported from [Medium](https://medium.com) on March 5, 2020.
