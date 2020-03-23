+++ 
date = "2018-06-22"
title = "Twitter Data Analysis"
slug = "data-analysis-in-python" 
tags = ['Python', 'Data Analysis']
categories = []
+++

After creating the [Free Wtr](https://twitter.com/freewtr) bot using
Tweepy and Python and [this
code](https://medium.freecodecamp.org/creating-a-twitter-bot-in-python-with-tweepy-ac524157a607),
I wanted a way to see how Twitter users were perceiving the bot and what
their sentiment was. So I created a simple data analysis program that
takes a given number of tweets, analyzes them, and displays the data in
a scatter plot.

![](https://cdn-images-1.medium.com/max/800/1*SsrUI-q_kWKPd-HKmcRNvg.png)

Image
[credit](https://pixabay.com/en/facebook-analytics-graphs-2265786/).

### Setup {#5aff .graf .graf--h3 .graf-after--figure name="5aff"}

I had to install a few packages to create this: **Tweepy**, **Tkinter**,
**Textblob** and **matplotlib**. You can install each of these with the
pip package manager. For example:

``` {#d465 .graf .graf--pre .graf-after--p name="d465"}
pip install tweepy
```

or you can clone into the Github repository like this.

``` {#e80d .graf .graf--pre .graf-after--p name="e80d"}
git clone https://github.com/sloria/textblobcd textblobpython setup.py install
```

Next you will need to create a new **Python** file and import the
following packages.

``` {#d313 .graf .graf--pre .graf-after--p name="d313"}
import tweepy #The Twitter APIfrom Tkinter import * #For the GUIfrom time import sleepfrom datetime import datetimefrom textblob import TextBlob #For Sentiment Analysisimport matplotlib.pyplot as plt #For Graphing the Data
```

### Twitter Credentials {#d7be .graf .graf--h3 .graf-after--pre name="d7be"}

Now we need to link a Twitter account to our script. If you don’t have
one already, create one.

Go to [apps.twitter.com](https://apps.twitter.com/) and sign in with
your account. Create a Twitter application and generate a Consumer Key,
Consumer Secret, Access Token, and Access Token Secret.

Under your import statements, store your credentials in variables and
then use the second block of code to authenticate your account with
Tweepy.

``` {#4353 .graf .graf--pre .graf-after--p name="4353"}
consumer_key = 'consumer key'consumer_secret = 'consumer secrets'access_token = 'access token'access_token_secret = 'access token secret'
```

``` {#da2d .graf .graf--pre .graf-after--pre name="da2d"}
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)auth.set_access_token(access_token, access_token_secret)api = tweepy.API(auth)
```

If you want to test to see if your account is properly authenticated,
you could simply print your username to the console.

``` {#0299 .graf .graf--pre .graf-after--p name="0299"}
user = api.me()print (user.name)
```

### Creating the GUI {#a97d .graf .graf--h3 .graf-after--pre name="a97d"}

For the interface, we will use two labels: one for the **search** and
the other for the **sample size** or number of tweets to be analyzed. We
will also need a submit button so that when clicked, we can call our
`getData`{.markup--code .markup--p-code} function.

``` {#ab2b .graf .graf--pre .graf-after--p name="ab2b"}
root = Tk()
```

``` {#285c .graf .graf--pre .graf-after--pre name="285c"}
label1 = Label(root, text="Search")E1 = Entry(root, bd =5)
```

``` {#cdcf .graf .graf--pre .graf-after--pre name="cdcf"}
label2 = Label(root, text="Sample Size")E2 = Entry(root, bd =5)
```

``` {#967a .graf .graf--pre .graf-after--pre name="967a"}
submit = Button(root, text ="Submit", command = getData)
```

So that the computer knows to keep the GUI on the screen, we need to
**pack** our labels and then **loop** the root display.

``` {#ee1c .graf .graf--pre .graf-after--p name="ee1c"}
label1.pack()E1.pack()
```

``` {#a359 .graf .graf--pre .graf-after--pre name="a359"}
label2.pack()E2.pack()
```

``` {#b59d .graf .graf--pre .graf-after--pre name="b59d"}
submit.pack(side =BOTTOM)
```

``` {#8462 .graf .graf--pre .graf-after--pre name="8462"}
root.mainloop()
```

Simply running this code, you should see a window that looks something
like this:

![](https://cdn-images-1.medium.com/max/800/1*MPxXav3xD3vfbRDyykXSPw.png)

However when text is input into the labels or the **submit** button is
clicked, nothing happens. We have to collect the data.

### Analyzing Tweets {#7abd .graf .graf--h3 .graf-after--p name="7abd"}

First, we have to get the text input into the labels.

``` {#a632 .graf .graf--pre .graf-after--p name="a632"}
def getE1():    return E1.get()
```

``` {#3af0 .graf .graf--pre .graf-after--pre name="3af0"}
def getE2():    return E2.get()
```

Now we are ready to code the `getData`{.markup--code .markup--p-code}
function. From now on, all code is in this function:

``` {#8da3 .graf .graf--pre .graf-after--p name="8da3"}
def getData():    #Code
```

We need to use the `GetE1()`{.markup--code .markup--p-code} and
`GetE2()`{.markup--code .markup--p-code} functions. These store our
**search**and **sample size** in variables that we can loop through.

``` {#68b0 .graf .graf--pre .graf-after--p name="68b0"}
getE1()    keyword = getE1()
```

``` {#77ab .graf .graf--pre .graf-after--pre name="77ab"}
getE2()    numberOfTweets = getE2()    numberOfTweets = int(numberOfTweets)
```

In order to store our data, we can use lists. One list is for the
polarity (or sentiment) of the tweets, and another for the number of the
tweet (so that we can graph the data).

``` {#80a0 .graf .graf--pre .graf-after--p name="80a0"}
polarity_list = []    numbers_list = []    number = 1
```

The number of tweets needs to be declared as 1 because the default value
is 0.

We can now begin to iterate through the tweets and analyze them. Using
TextBlob, we can find the sentiment of each tweet and store it to a
variable `polarity`{.markup--code .markup--p-code} . We can then append
this variable to our `polarity_list`{.markup--code .markup--p-code}
along with appending the number to our `number_list`{.markup--code
.markup--p-code}.

``` {#e231 .graf .graf--pre .graf-after--p name="e231"}
analysis = TextBlob(tweet.text)analysis = analysis.sentimentpolarity = analysis.polarity            polarity_list.append(polarity)            numbers_list.append(number)number = number + 1
```

We take this code and, using a `for`{.markup--code .markup--p-code} loop
and `try`{.markup--code .markup--p-code} statement, we iterate it over
the number of tweets for the search **keyword.**

``` {#b910 .graf .graf--pre .graf-after--p name="b910"}
for tweet in tweepy.Cursor(api.search, keyword, lang="en").items(numberOfTweets):        try:            analysis = TextBlob(tweet.text)            analysis = analysis.sentiment            polarity = analysis.polarity            polarity_list.append(polarity)            numbers_list.append(number)            number = number + 1
```

``` {#8f7c .graf .graf--pre .graf-after--pre name="8f7c"}
except tweepy.TweepError as e:            print(e.reason)
```

``` {#9674 .graf .graf--pre .graf-after--pre name="9674"}
except StopIteration:            break
```

### Graphing Scatter Plot {#87d1 .graf .graf--h3 .graf-after--pre name="87d1"}

In order to graph our scatter plot with **matplotlib,**we first have to
define the axis

``` {#36fd .graf .graf--pre .graf-after--p name="36fd"}
axes = plt.gca()axes.set_ylim([-1, 2])
```

and then plot our lists of data.

``` {#d6ae .graf .graf--pre .graf-after--p name="d6ae"}
plt.scatter(numbers_list, polarity_list)
```

Key information is shown in a box. In order to show the overall
sentiment of the tweets we gathered, we calculate the average across all
collected Tweets. Also, since we are displaying the sentiment at a
specific time, we want to display the date and time.

``` {#9d0e .graf .graf--pre .graf-after--p name="9d0e"}
averagePolarity = (sum(polarity_list))/(len(polarity_list))averagePolarity = "{0:.0f}%".format(averagePolarity * 100)time  = datetime.now().strftime("At: %H:%M\nOn: %m-%d-%y")
```

``` {#678c .graf .graf--pre .graf-after--pre name="678c"}
plt.text(0, 1.25, "Average Sentiment:  " + str(averagePolarity) + "\n" + time, fontsize=12, bbox = dict(facecolor='none', edgecolor='black', boxstyle='square, pad = 1'))
```

![](https://cdn-images-1.medium.com/max/800/1*tMqRJJ7yNHVUhi02q-M6cg.png)

For the title, we can use this

``` {#4a72 .graf .graf--pre .graf-after--p name="4a72"}
plt.title("Sentiment of " + keyword + " on Twitter") plt.xlabel("Number of Tweets")plt.ylabel("Sentiment")
```

and finally use `plot.show()`{.markup--code .markup--p-code} to display
the graph.

![](https://cdn-images-1.medium.com/max/800/1*4AFmEsfKAa3jW0OKYL4BCw.png)

### Example {#971a .graf .graf--h3 .graf-after--figure name="971a"}

Testing this for my [**Free Wtr**](https://twitter.com/freewtr)****bot,
the sentiment was sky high!

![](https://cdn-images-1.medium.com/max/800/1*r1ZHyGN5tuWIW6AUjJ1Zvw.png)

Sample Size of 250 Tweets

as for **Donald Trump,** I cannot say the same:

![](https://cdn-images-1.medium.com/max/800/1*_EUcoqrAaT32YGZR7izQ_w.png)

* * * * *

Here is the [full source
code](https://github.com/Fidel-Willis/Twitter-Data) on Github.

By [Lucas Kohorst](https://medium.com/@lucaskohorst) on [June 22,
2018](https://medium.com/p/d5fb7d42ebc7).

[Canonical
link](https://medium.com/@lucaskohorst/twitter-data-analysis-d5fb7d42ebc7)

Exported from [Medium](https://medium.com) on March 5, 2020.
