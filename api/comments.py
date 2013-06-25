import webapp2
import json

import api
import logging


COMMENT_TYPES = ['FORUM', 'NEEDS', 'MESSAGE']

class Comments(webapp2.RequestHandler):

	def get(self):
		#Default status if none are set
		self.response.set_status(api.HTTP_NOT_IMPLEMENTED,"")

		#Check for optional parameters:
		commentType = self.request.get("type")
		if commentType:
			#We have an optional parameter. Is it well formed?
			if commentType.upper() in COMMENT_TYPES:
				#Yes it is well formed and we may execute a datastore query for the comments
				pass
				#TODO: Eventually return this response once things are done
				#self.response.set_status(api.HTTP_OK,"")
			else:
				#Semantically incorrect query
				self.response.set_status(api.HTTP_REQUEST_SEMANTICS_PROBLEM,"")


		#TODO
		
		self.response.write("{}")	

	def post(self):
		self.response.set_status(api.HTTP_NOT_IMPLEMENTED,"")

		#Confirm that all elements of the json are there.
		logging.info(self.request.body)
		try:
			json.loads(self.request.body)
		except Exception, e:
			#The request body is malformed. 
			self.response.set_status(api.HTTP_REQUEST_SYNTAX_PROBLEM,"")
			self.response.write("{}")
			#Don't allow execution to proceed any further than this
			return
		info = json.loads(self.request.body)

		#Request is well formed, but does it hold the proper semantic meaning for us? (all keys present)
		try:
			info['type']
			info['message']
		except Exception, e:
			#The request body lacks proper keys
			self.response.set_status(api.HTTP_REQUEST_SEMANTICS_PROBLEM,"")
			self.response.write("{}")
			return

		#Request has proper required keys
		typeOfComment = info['type']
		commentMessage = info['message']

		pin = None
		try:
			info['pin']
			pin = info['pin']
		except Exception, e:
			#Die silently if the pine is not there as it is optional
			pass
		
		#All information present. Store information in the database

		self.response.write("{}")

		

application = webapp2.WSGIApplication([
    ('/api/comments', Comments),

], debug=True)