# run this every minute to store data for each of the chatrooms 
# data is saved in pickle format in /data/allChatsData.txt
# data is stored in chatData objects.
from telegram import Bot
import time
import json
import pickle
import os.path
import chatData
#import matplotlib.pyplot as plt

# token for the bot
token='<token for bot>'
bot = Bot(token)

# chatIdMap.txt is created when getChatIDs.py is called.
# it makes a map of chat_title to chat_id for all chats that have updates to report
chatIdMap = {}
filename = os.getcwd()+"/data/chatIdMap.txt"
with open(filename, 'r') as f:
    chatIdMap = json.load(f)

# a map of chat_title to chatData object
chatDataMap = {}
dataFilename = os.getcwd()+"/data/allChatsData.txt"
if(os.path.isfile(dataFilename)):
    with open(dataFilename, "r") as f:
        chatDataMap = pickle.load(f) # use pickle instead of json because it isn't json serializable
else:
    for chat in chatIdMap.keys():
        chatDataMap[chat] = chatData.chatData(chat)

# makes a map of users to the person who invited them and the time they were invited
def updateChatData():
    updates = bot.getUpdates(timeout = 50)
    # confirm updates so that next call to getUpdates gets more recent updates
    if updates != []:
        bot.getUpdates(offset = updates[-1].update_id+1, timeout = 0)
    now = time.time()
    for update in updates:
        if(not update.message.chat.title in chatDataMap.keys()): continue
        chat = chatDataMap[update.message.chat.title]
        if(update.effective_user.is_bot): continue
        creator = update.effective_user.username
        newMembers = update.effective_message.new_chat_members
        if(newMembers == []): continue
        if(not creator in chat.usermap.keys()):
            # if someone wasnt invited by anyone, they map to ""
            chat.usermap[creator] = ("",now)
            chat.nMembers +=1
        if(creator != newMembers[0].id):
            for member in newMembers:
                if(member.is_bot): continue
                if(not member.username in chat.usermap.keys()):
                    chat.usermap[member.username] = (creator,now)
                    chat.nMembers +=1
                    chat.nReferals +=1
    for chat in chatDataMap.values():
        chat.membersStats.append([now,chat.nMembers])
        chat.referalStats.append([now,chat.nReferals])
    with open(dataFilename, "w") as f:
        pickle.dump(chatDataMap,f)

updateChatData()

