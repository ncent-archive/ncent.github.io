Must first go to the telegram BotFather to get a telegram bot token.
Must first create a twitter app to get twitter api credentials.
Then go through these scripts and replace the token and credentials with values.
TwitterToTelegram.py is run every minute to forward tweets to all telegram chatgroups. Data used by all scripts is stored and updated in data/

DataGetter.py is run every minute to store data for all the chatgroups. the data stored is a map of people to their inviters, and arrays of numbers of members and numbers of referals over time.

PublisLeaderboard.py counts the points based on data gathered by telegramBot_multipleChats.py and publishes the leaderboard for each chatroom for the referal competition.

GetChatIDs.py is called to initialize the file data/chatIdMap.txt, which stores a map of chatroom titles to chatroom IDs. This doesn't need to be called after the file exists and it gets chatroom ids from chat updates, so it might not include a chatroom that the bot is on if that chat room doesn't have any recent updates.

ChatData.py is the class that stores data for a chatroom.
