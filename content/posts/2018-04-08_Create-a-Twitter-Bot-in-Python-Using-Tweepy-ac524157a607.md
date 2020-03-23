+++ 
date = "2018-04-08"
title = "Create a Twitter Bot in Python Using Tweepy"
slug = "create-twitter-bot" 
tags = ['Twitter', 'Bot', 'Python']
categories = []
+++

With about 15% of Twitter being composed of bots, I wanted to try my
hand at it. I googled how to create a Twitter bot and was brought to a
cleanly laid out web app. It allowed you to create a bot that would
like, follow, or retweet a tweet based on a keyword. The problem was
that you could only create one bot for one function.

So I decided to code a bot myself with Python and the Tweepy library.

### Setup {#c1ed .graf .graf--h3 .graf-after--p name="c1ed"}

First, I downloaded Tweepy. You can do this using the pip package
manager.

``` {#b88a .graf .graf--pre .graf-after--p name="b88a"}
pip install tweepy
```

You can also clone the GitHub repository if you do not have pip
installed.

``` {#fec6 .graf .graf--pre .graf-after--p name="fec6"}
git clone https://github.com/tweepy/tweepy.gitcd tweepypython setup.py install
```

You’ll need to import Tweepy and Tkinter (for the GUI interface).

``` {#87e4 .graf .graf--pre .graf-after--p name="87e4"}
import tweepyimport Tkinter
```

### Credentials {#21bb .graf .graf--h3 .graf-after--pre name="21bb"}

Next, we need to link our Twitter account to our Python script. Go to
[apps.twitter.com](https://apps.twitter.com/) and sign in with your
account. Create a Twitter application and generate a Consumer Key,
Consumer Secret, Access Token, and Access Token Secret. Now you are
ready to begin!

Under your import statements store your credentials within variables and
then use the second block of code to authenticate your account with
tweepy.

``` {#4353 .graf .graf--pre .graf-after--p name="4353"}
consumer_key = 'consumer key'consumer_secret = 'consumer secrets'access_token = 'access token'access_token_secret = 'access token secret'
```

``` {#da2d .graf .graf--pre .graf-after--pre name="da2d"}
auth = tweepy.OAuthHandler(consumer_key, consumer_secret)auth.set_access_token(access_token, access_token_secret)api = tweepy.API(auth)
```

In order to check if your program is working you could add:

``` {#cab1 .graf .graf--pre .graf-after--p name="cab1"}
user = api.me()print (user.name)
```

This should return the name of your Twitter account in the console.

### Building the Bot {#8af7 .graf .graf--h3 .graf-after--p name="8af7"}

This bot is meant to:

1.  Follow everyone following you.
2.  Favorite and Retweet a Tweet based on keywords.
3.  Reply to a user based on a keyword.

Step one is the easiest, you simply **loop** through your followers and
then follow each one.

``` {#05db .graf .graf--pre .graf-after--p name="05db"}
for follower in tweepy.Cursor(api.followers).items():    follower.follow()    print ("Followed everyone that is following " + user.name)
```

At this point in order to make sure your code is working you should log
onto Twitter and watch as the people you’re following increase.

From this point onwards, besides setting up and packing the labels in
the GUI, I am coding everything**under the function
`mainFunction()`{.markup--code .markup--p-code}.

``` {#1466 .graf .graf--pre .graf-after--p name="1466"}
def mainFunction():    #The code
```

You might be able to see where this is going. In order to favorite or
retweet a tweet we can use a for loop and a try statement like this:

``` {#5f8f .graf .graf--pre .graf-after--p name="5f8f"}
search = "Keyword"
```

``` {#aeb4 .graf .graf--pre .graf-after--pre name="aeb4"}
numberOfTweets = "Number of tweets you wish to interact with"
```

``` {#ab06 .graf .graf--pre .graf-after--pre name="ab06"}
for tweet in tweepy.Cursor(api.search, search).items(numberOfTweets):    try:        tweet.retweet()        print('Retweeted the tweet')
```

``` {#061b .graf .graf--pre .graf-after--pre name="061b"}
    except tweepy.TweepError as e:        print(e.reason)
```

``` {#ed74 .graf .graf--pre .graf-after--pre name="ed74"}
    except StopIteration:        break
```

In order to favorite a tweet you can simply replace the

``` {#79e8 .graf .graf--pre .graf-after--p name="79e8"}
tweet.retweet()
```

with

``` {#dea6 .graf .graf--pre .graf-after--p name="dea6"}
tweet.favorite()
```

In order to reply to a user based on a keyword, we need to store the
users username and twitter ID.

``` {#0344 .graf .graf--pre .graf-after--p name="0344"}
tweetId = tweet.user.idusername = tweet.user.screen_name
```

We can then loop through the tweets and update our status (tweet) at
each user.

``` {#268e .graf .graf--pre .graf-after--p name="268e"}
phrase = "What you would like your response tweet to say"
```

``` {#6e53 .graf .graf--pre .graf-after--pre name="6e53"}
for tweet in tweepy.Cursor(api.search, search).items(numberOfTweets):            try:                tweetId = tweet.user.id                username = tweet.user.screen_name                api.update_status("@" + username + " " + phrase, in_reply_to_status_id = tweetId)                print ("Replied with " + phrase)                       except tweepy.TweepError as e:                print(e.reason)
```

``` {#7718 .graf .graf--pre .graf-after--pre name="7718"}
           except StopIteration:                break
```

If you want to only utilize the script through the terminal and update
the code every time you wish to run it then you have completed your bot.

### Creating the GUI {#d387 .graf .graf--h3 .graf-after--p name="d387"}

We can create a GUI application that will take our inputs of the keyword
you would like to search for and whether or not you would like to
favorite a tweet.

We first need to initialize Tkinter and setup the layout.

To create our user interface, we are going to have seven labels for
search, number of tweets, and reply. Plus the questions do you want to
reply, favorite, retweet the tweet, and follow the user.

Remember the code below is **outside** and **above** our
`mainFunction()`{.markup--code .markup--p-code}.

``` {#dae3 .graf .graf--pre .graf-after--p name="dae3"}
root = Tk()
```

``` {#0101 .graf .graf--pre .graf-after--pre name="0101"}
label1 = Label( root, text="Search")E1 = Entry(root, bd =5)
```

``` {#cd12 .graf .graf--pre .graf-after--pre name="cd12"}
label2 = Label( root, text="Number of Tweets")E2 = Entry(root, bd =5)
```

``` {#5a49 .graf .graf--pre .graf-after--pre name="5a49"}
label3 = Label( root, text="Response")E3 = Entry(root, bd =5)
```

``` {#a684 .graf .graf--pre .graf-after--pre name="a684"}
label4 = Label( root, text="Reply?")E4 = Entry(root, bd =5)
```

``` {#948a .graf .graf--pre .graf-after--pre name="948a"}
label5 = Label( root, text="Retweet?")E5 = Entry(root, bd =5)
```

``` {#c187 .graf .graf--pre .graf-after--pre name="c187"}
label6 = Label( root, text="Favorite?")E6 = Entry(root, bd =5)
```

``` {#69fa .graf .graf--pre .graf-after--pre name="69fa"}
label7 = Label( root, text="Follow?")E7 = Entry(root, bd =5)
```

We also need to **pack** each label so that they show up and then call
the root function in a loop so that it remains on the screen and doesn’t
immediately close.

The following is what **packing** the first label looks like. I packed
all of the labels below the `mainFunction()`{.markup--code
.markup--p-code}.

``` {#9ad4 .graf .graf--pre .graf-after--p name="9ad4"}
label1.pack()E1.pack()
```

``` {#eea5 .graf .graf--pre .graf-after--pre name="eea5"}
root.mainloop()
```

If you only ran your GUI code, it should look something like this:

![](https://cdn-images-1.medium.com/max/800/1*sMo1KjT_hWUfhf98IFAQUw.png)

However, inputing text into the labels or clicking the submit button
will do nothing at this point. As the interface is not yet connected to
the code.

In order to store the user input in the labels, we need to use
the `.get()`{.markup--code .markup--p-code} function. I used individual
functions for each label.

``` {#5ae7 .graf .graf--pre .graf-after--p name="5ae7"}
def getE1():    return E1.get()
```

Then in my `mainFunction()`{.markup--code .markup--p-code}, I called the
function `getE1()`{.markup--code .markup--p-code} and stored the input
into a variable. For E1 it looks like this:

``` {#f286 .graf .graf--pre .graf-after--p name="f286"}
getE1()search = getE1()
```

You must do this for every label. For the `numberOfTweets`{.markup--code
.markup--p-code} label make sure to convert the input into an integer.

``` {#780e .graf .graf--pre .graf-after--p name="780e"}
getE2()numberOfTweets = getE2()numberOfTweets = int(numberOfTweets)
```

For the last four labels (Reply, Favorite, Retweet and Follow), we need
to check to see if the input from the user is “yes” or “no” in order to
run that given function or not. This can be accomplished through **if**
statements.

This would be the code for the **reply** function:

``` {#2f25 .graf .graf--pre .graf-after--p name="2f25"}
if reply == "yes":
```

``` {#5448 .graf .graf--pre .graf-after--pre name="5448"}
    for tweet in tweepy.Cursor(api.search,     search).items(numberOfTweets):            try:                tweetId = tweet.user.id                username = tweet.user.screen_name                api.update_status("@" + username + " " + phrase, in_reply_to_status_id = tweetId)                print ("Replied with " + phrase)                       except tweepy.TweepError as e:                print(e.reason)
```

``` {#b606 .graf .graf--pre .graf-after--pre name="b606"}
except StopIteration:                break
```

For the favorite, retweet and follow functions simply replace the
**reply** with “retweet”, “favorite” and “follow”. Then copy and paste
the code you wrote above for each one underneath the **if**statement.

Now we just need to add the **submit**button and tell it to call the
`mainFunction()`{.markup--code .markup--p-code} and execute the code for
our Twitter Bot. Again, don’t forget to pack it!

``` {#f6a7 .graf .graf--pre .graf-after--p name="f6a7"}
submit = Button(root, text ="Submit", command = mainFunction)
```

That’s it! After you run your bot script, a GUI application should run
and you will be able to reply, retweet, favorite and follow users.

* * * * *

With this Twitter Bot, I have created the account
[FreeWtr](https://twitter.com/FreeWtr) which advocates for use of
filtered tap water over bottled water. Here is a screenshot of the
profile.

![](https://cdn-images-1.medium.com/max/800/1*PONvGc-nH38lwuley7JoSg.png)

Here is the [full source
code](https://github.com/Fidel-Willis/TwitterBot) on Github.

By [Lucas Kohorst](https://medium.com/@lucaskohorst) on [April 8,
2018](https://medium.com/p/ac524157a607).

[Canonical
link](https://medium.com/@lucaskohorst/creating-a-twitter-bot-in-python-with-tweepy-ac524157a607)

Exported from [Medium](https://medium.com) on March 5, 2020.
