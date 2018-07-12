# call this script when you have gathered data from the chatrooms and want to broadcast the leaderboard
# for the referal competition for each of the chatrooms

from telegram import Bot
import time
import pickle
import os.path


# Telegram TOKEN
token='<token for bot>'
bot = Bot(token)

#chatDataMap is a map of chat titles to chatData objects
chatDataMap = {}
dataFilename = os.getcwd()+"/data/allChatsData.txt"
if(os.path.isfile(dataFilename)):
    with open(dataFilename, "r") as f:
        chatDataMap = pickle.load(f)

# given a map of people to the person who reffered them,
# make a map of people to their number of points.
# 1 point for each member, .5 points for their inviter, etc.
def assignPoints(usermap):
    pointmap = {}
    for user in usermap.keys():
        pointmap[user] = 0
    for user in usermap.keys():
        reward = 1.0
        while(True):
            pointmap[user]+= reward
            if(usermap[user][0] == ""): break
            user = usermap[user][0]
            reward = 0.5*reward
    return pointmap

for chat in chatDataMap.values():
    pointmap = assignPoints(chat.usermap)
    sortedmap = sorted(pointmap.iteritems(), key=lambda (k,v): (v,k))
    text = "Here is the curent leaderboard"
    for pair in sortedmap[-5:]:
        text += "\n"+ str(pair[0]) + ": " + str(pair[1])
        # to test that this works, just send it to the test chatgroup
        bot.sendMessage(chat.chat_id,text)
