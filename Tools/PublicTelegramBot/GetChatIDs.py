# run this to generate the data/chatIdMap.txt file, which stores
# a map of all chatroom titles to there id's for chat rooms that
# the bot is on, and that have updates to report.

from telegram import Bot
import os.path
import json

# token for the bot
token='<token for bot>'
bot = Bot(token)
chatIdMap = {}
filename = os.getcwd()+"/"+"data/chatIdMap.txt"
if(os.path.isfile(filename)):
    with open(filename, 'r') as f:
        chatIdMap = json.load(f)

updates = bot.getUpdates()
for update in updates:
	chatIdMap[update.message.chat.title] = update.message.chat.id

with open(filename, 'w') as f:
    json.dump(chatIdMap,f)

