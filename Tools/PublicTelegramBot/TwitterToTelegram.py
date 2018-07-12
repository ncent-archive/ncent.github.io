# run this every minute to check for tweets and forward them to telegram

from telegram import Bot
import twitter
import pickle
import json
import os

# Telegram TOKEN
TOKEN = '<telegram bot token>'
bot = Bot(TOKEN)

# Twitter access data
# visit the twitter api page to create a new app go get the keys and toekns.
# Consumer Key (API Key)
CONS_KEY = '<Consumer Key>'
# Consumer Secret (API Secret)
CONS_SECRET = '<Consumer Secret>'
# Access Token
ACCESS_TOKEN = '<Access Token>'
# Access Token Secret
ACCESS_TOKEN_SECRET = '<Access Token Secret>'

# a map of twitter accounts to the tweet id of the last tweet forwarded
# need to store this data so that we forward the right tweets.
# make sure that this file is up to date before running, otherwise you
# might forward way too many tweets.
tweetmap = {"KK_ncnt":0}
tweetmapFilename = os.getcwd()+"/data/tweetmap.txt"
with open(tweetmapFilename, 'r') as f:
    tweetmap = json.load(f)

# map of chat.title to chat.id
chatIdMap = {}
filename = os.getcwd()+"/data/chatIdMap.txt"
with open(filename, 'r') as f:
    chatIdMap = json.load(f) 

def forward_tweets():
    api = twitter.Api(consumer_key=CONS_KEY,
                      consumer_secret=CONS_SECRET,
                      access_token_key=ACCESS_TOKEN,
                      access_token_secret=ACCESS_TOKEN_SECRET,
                      tweet_mode='extended')
    for u in tweetmap.keys():
        statuses = api.GetUserTimeline(screen_name = u, since_id = tweetmap[u])
        tweets = list(reversed(statuses))
        for tweet in tweets:
            for chat_id in chatIdMap.values():
                bot.sendMessage(chat_id, text=tweet.full_text)
                tweetmap[u] = tweet.id
            with open(tweetmapFilename, 'w') as f:
                json.dump(tweetmap,f)
    
forward_tweets()
