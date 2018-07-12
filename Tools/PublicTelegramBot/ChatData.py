# class to store information about a chatroom
# need to make data/chatIdMap.txt before initializing

import os.path
import json


class chatData:
	def __init__(self, name):
		# usermap stores a map of people to whoever invited them and the time they were invited
		self.usermap = {}
		chatIdfilename = os.getcwd()+"/data/chatIdMap.txt"
		with open(chatIdfilename, 'r') as f:
			self.chat_id = json.load(f)[name]
		# an array of [time, nMembers] so that we can track progress over time
		self.membersStats = []
		# array of [time, nReferals]
		self.referalStats = []
		self.nMembers = 0
		self.nReferals = 0