# datastore entities required by API.
# https://developers.google.com/appengine/docs/python/gettingstartedpython27/usingdatastore
# building relationships: https://developers.google.com/appengine/articles/modeling

'''
	Datastore entities required by the API. Entities are organized in a hierarchy much like a filesystem, with entity groups 
	specified in order to create transactional domains, within which queries are strongly consistent. The root entity is the 
	'campaign', with sub entities such as 'greenup' being its children. 
'''

from google.appengine.ext import db
from handlerBase import *
from google.appengine.api import memcache # import memcache

import logging 

class Campaign(db.Model):
	pass

class Greenup(Campaign):	
	@classmethod
	def app_key(cls):
	    return db.Key.from_path('apps', 'greenup')

class Pins(Greenup):
	message = db.TextProperty()
	pinType = db.StringProperty(choices=('General Message', 'Help Needed', 'Trash Pickup'))
	lat = db.FloatProperty()
	lon = db.FloatProperty()
	latOffset = db.FloatProperty()
	lonOffset = db.FloatProperty()
	precision = db.FloatProperty()

	@classmethod
	def by_id(cls, pinId):
		return Pins.get_by_id(pinId, parent = app_key())

	@classmethod
	def by_message(cls, message):
		bc = Pins.all().filter('message =', message).get()
		return bc

	@classmethod
	def by_type(cls, pinType):
		bt = Pins.all().filter('pinType =', pinType).get()
		return bt

	@classmethod
	def by_lat(cls,lat):
		latitudes = Pins.all().filter('lat =', lat).get()
		return latitudes

	@classmethod
	def by_lon(cls,lon):
		longitudes = Pins.all().filter('lon =', lon).get()
		return longitudes

class Comments(Greenup):
	commentType = db.StringProperty(choices=('General Message', 'Help Needed', 'Trash Pickup'))
	message = db.TextProperty()
	timeSent = db.DateTimeProperty(auto_now_add = True)	
	pin = db.ReferenceProperty(Pins, collection_name ='pins')

	@classmethod
	def by_id(cls, commentId):
		# looks up comment by id
		return Comments.get_by_id(commentId, parent = app_key)
	
	@classmethod
	def by_type(cls,cType):
		# looks up comment by comment type
		ct = Comments.all().filter('commentType =', cType).get()

class GridPoints(Greenup):
	lat = db.FloatProperty()
	lon = db.FloatProperty()
	secondsWorked = db.FloatProperty()

	@classmethod
	def by_id(cls, gridId):
		return GridPoints.get_by_id(gridId, parent = app_key)

	@classmethod
	def by_lat(cls,lat):
		latitudes = GridPoints.all().filter('lat =', lat).get()
		return latitudes

	@classmethod
	def by_lon(cls,lon):
		longitudes = GridPoints.all().filter('lon =', lon).get()
		return longitudes

	@classmethod
	def by_latOffset(cls, offset, etc):
		# TODO: implement this
		pass

	@classmethod
	def by_lonOffset(cls, offset, etc):
		# TODO: implement this
		pass