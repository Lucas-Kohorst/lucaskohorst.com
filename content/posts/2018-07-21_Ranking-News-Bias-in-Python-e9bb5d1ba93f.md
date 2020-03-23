+++ 
date = "2018-07-21"
title = "Ranking News Bias in Python"
slug = "ranking-news-bias-in-python" 
tags = ['Python', 'News', 'Bias']
categories = []
+++

I recently read an article in the Washington Post titled, [“Ranking the
media from liberal to conservative, based on their
audiences”](https://www.washingtonpost.com/news/the-fix/wp/2014/10/21/lets-rank-the-media-from-liberal-to-conservative-based-on-their-audiences/?noredirect=on&utm_term=.592ab216ff0a).
Inspiring me to rank news sites based on their subjectivity and polarity
on a given subject, in this case, Donald Trump.

![](https://cdn-images-1.medium.com/max/800/1*QZjMmT95qmq9SojCCI2NFQ.jpeg)

Photo by
[rawpixel](https://unsplash.com/photos/UrA0VtUAgmo?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)
on [Unsplash](https://unsplash.com/search/photos/newspapers-bias?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

I used Python to pull the following news sites for their 30 most recent
articles that contained the keyword “Trump” (ranging from the liberal
side of the Washington Post article to the conservative side):

1.  New Yorker
2.  NPR
3.  CNN
4.  Fox News
5.  Drudge Report
6.  Breitbart

Then performed a text analysis on the description of the article to
return a list of how subjective (or opinionated) an article was and the
polarity (whether the author felt positively or negatively about the
Trump). By doing this I could come up with a (very basic) ranking of the
News Sites on how biased they are about our President and what their
opinions of him are. With this, I could compare with the Post article to
what political affiliation the news source is most associated with and
which is the most biased.

### Imports {#e7cd .graf .graf--h3 .graf-after--p name="e7cd"}

To search google, I used [this
library](https://github.com/MarioVilas/googlesearch),
[TextBlob](https://textblob.readthedocs.io/en/dev/) for text analysis
and [TextTable](https://pypi.org/project/texttable/) for displaying the
results in the terminal.

``` {#ee87 .graf .graf--pre .graf-after--p name="ee87"}
from google import googlefrom textblob import TextBlobimport texttable as ttfrom time import sleep
```

### Search {#2a62 .graf .graf--h3 .graf-after--pre name="2a62"}

In order to get and analyze the articles from varying websites, I used
[Google Dork
searches](https://whatis.techtarget.com/definition/Google-dorkhttps://whatis.techtarget.com/definition/Google-dork)
which allow you to search a specific website for keywords (among many
other things). For example you can type

``` {#24b0 .graf .graf--pre .graf-after--p name="24b0"}
inurl:medium.com intext:python
```

In order to return search results just from the Medium website that
mention python.

![](https://cdn-images-1.medium.com/max/800/1*tOjIR9PttCqHzpsmZSAR-g.png)

I created a function called `search`{.markup--code .markup--p-code}
which takes the arguments of the site you are searching and the keyword
to search. Then setting the variable `search_results`{.markup--code
.markup--p-code} to the Google Dork search that uses the site and
keyword parameters, we can collect the articles.

I then created a `search_results_list`{.markup--code .markup--p-code},
`subjectivity_list`{.markup--code .markup--p-code}, and a
`polarity_list`{.markup--code .markup--p-code} to append the results to
later. Creating the `num`{.markup--code .markup--p-code} list is simply
to have the articles numbered as they appear in the text table.

``` {#ad64 .graf .graf--pre .graf-after--p name="ad64"}
def search(site, search): site = site search = search num_page = 3 search_results = google.search(“inurl:” + site + “ intext:” + search, 3) search_results_list = [] subjectivity_list = [] polarity_list = [] num = [] number = 1
```

### Sentiment Analysis {#a0ce .graf .graf--h3 .graf-after--pre name="a0ce"}

The next step is to determine the subjectivity and polarity of a given
article. This can be done by calling the
`result.description`{.markup--code .markup--p-code} method on the search
result, and then appending that to the
`search_results_list.`{.markup--code .markup--p-code}

By setting up TextBlob with the `search_results`{.markup--code
.markup--p-code} as its argument as a variable `analysis`{.markup--code
.markup--p-code} you perform basic sentiment analysis on the articles.
Run `analysis.sentiment.subjectivity`{.markup--code .markup--p-code} to
get the subjectivity for the results and
`analysis.sentiment.polarity`{.markup--code .markup--p-code} to return
the polarity. Append these results to their respective lists.

``` {#e98f .graf .graf--pre .graf-after--p name="e98f"}
for result in search_results: search_results = result.description search_results_list.append(search_results)
```

``` {#8bc1 .graf .graf--pre .graf-after--pre name="8bc1"}
 analysis = TextBlob(search_results) subjectivity = analysis.sentiment.subjectivity subjectivity_list.append(subjectivity) polarity = analysis.sentiment.polarity polarity_list.append(polarity) number = number + 1 num.append(number) sleep(5)
```

### Text Table {#b003 .graf .graf--h3 .graf-after--pre name="b003"}

In order to create the table, make a new variable `tab`{.markup--code
.markup--p-code} and set it equal to `tt.Texttable()`{.markup--code
.markup--p-code}. Then write out your headings, I used Number, Results,
Subjectivity, and Polarity.

``` {#3084 .graf .graf--pre .graf-after--p name="3084"}
tab = tt.Texttable()headings = [‘Number’,’Results’,’Subjectivity’, ‘Polarity’]tab.header(headings)
```

Then run a `for`{.markup--code .markup--p-code} loop to add each element
of the lists as a row to your table.

``` {#e74a .graf .graf--pre .graf-after--p name="e74a"}
for row in zip(num, search_results_list, subjectivity_list, polarity_list): tab.add_row(row)
```

Taking the subjectivity and polarity list we can find the average of
each news source, which we can then print out along with the given site,
search results and table.

``` {#c455 .graf .graf--pre .graf-after--p name="c455"}
avg_subjectivity = (sum(subjectivity_list) / len(subjectivity_list))avg_polarity = (sum(polarity_list) / len(polarity_list))
```

``` {#94e3 .graf .graf--pre .graf-after--pre name="94e3"}
table = tab.draw()print siteprint searchprint tableprint (site + “ average subjectivity: “ + str(avg_subjectivity))print (site + “ average polarity: “ + str(avg_polarity))
```

### Calling the Function {#a9c5 .graf .graf--h3 .graf-after--pre name="a9c5"}

Finally you must call the `search`{.markup--code .markup--p-code}
function for each news site.

``` {#2dc7 .graf .graf--pre .graf-after--p name="2dc7"}
search(“newyorker”, “trump”)search(“npr”, “trump”)search(“cnn”, “trump”)search(“foxnews”, “trump”)search(“drudgereport”, “trump”)search(“breitbart”, “trump”)
```

And thats it!

### Results {#f551 .graf .graf--h3 .graf-after--p name="f551"}

Running the script the terminal output will look something like this:

![](https://cdn-images-1.medium.com/max/800/1*zmrQTiyME5bU81K1GfzWvA.png)

![](https://cdn-images-1.medium.com/max/800/1*5YnCHuo9yotpc_UYUd5b3Q.png)

Displaying the site, the number of the article, article description, the
subjectivity and polarity for each article and then the average for the
site.

The averages for the site’s respective subjectivity are as follows (in
order from most objective to most subjective):

1.  NPR (0.21)
2.  Fox News (0.23)
3.  CNN (0.25)
4.  The New Yorker (0.27)
5.  Breitbart (0.34)
6.  Drudge Report (0.36)

No surprise that NPR is the most objective news source and that Drudge
Report and Breitbart are the most opinionated on the subject of Trump.
However, the fact that Fox News ranked 2nd in objectiveness surprised
me.

The rankings for the polarity where equally as surprising, the closer
the value is to -1 the more negative and closer to 1 the more positive.

1.  Fox News (0.04)
2.  NPR (0.05)
3.  CNN (0.07)
4.  The New Yorker (0.07)
5.  Drudge Report (0.11)
6.  Breitbart (0.12)

Once again Fox News surprised me as the had the most negative sentiment
towards Trump over 30 articles. After that, the news sources fall in
line as expected. It was very interesting to see that the highest
positive average was barely above zero! I expected Drudge Report and
Breitbart to be at least in the 0.6 range.

Breitbart recorded the most positive sentiment of 0.8 on an article,
however, it also had the most negative sentiment at -0.4. This leads me
to believe that Breitbart articles use far more connotative language
than its counterparts. Which is supported by the fact that Breitbart
ranks 2nd in subjectivity.

### Final Thoughts {#2642 .graf .graf--h3 .graf-after--p name="2642"}

Obviously, this was a very basic ranking and shouldn’t be taken as
truth, due to an extremely small and limited (only using the
description, not the full-length article) data set.

I saw the Post’s article and figured this would be a fun experiment to
run and see the results. Hope you enjoyed!

[Here is the full source code on
Github](https://github.com/Lucas-Kohorst/News-Bias)

Check out my other Python articles:

[**Create a Twitter Bot in Python Using Tweepy**\
*With about 15% of Twitter being composed of bots, I wanted to try my
hand at it. I googled how to create a Twitter
bot…*medium.freecodecamp.org](https://medium.freecodecamp.org/creating-a-twitter-bot-in-python-with-tweepy-ac524157a607 "https://medium.freecodecamp.org/creating-a-twitter-bot-in-python-with-tweepy-ac524157a607")[](https://medium.freecodecamp.org/creating-a-twitter-bot-in-python-with-tweepy-ac524157a607)

[**Basic data analysis on Twitter with Python**\
*After creating the Free Wtr bot using Tweepy and Python and this code,
I wanted a way to see how Twitter users
were…*medium.freecodecamp.org](https://medium.freecodecamp.org/basic-data-analysis-on-twitter-with-python-251c2a85062e "https://medium.freecodecamp.org/basic-data-analysis-on-twitter-with-python-251c2a85062e")[](https://medium.freecodecamp.org/basic-data-analysis-on-twitter-with-python-251c2a85062e)

By [Lucas Kohorst](https://medium.com/@lucaskohorst) on [July 21,
2018](https://medium.com/p/e9bb5d1ba93f).

[Canonical
link](https://medium.com/@lucaskohorst/ranking-news-bias-in-python-e9bb5d1ba93f)

Exported from [Medium](https://medium.com) on March 5, 2020.
