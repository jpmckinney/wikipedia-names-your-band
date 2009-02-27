import urllib2

from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app

class Fetch(webapp.RequestHandler):
	def get(self):
		url = self.request.get('u')
		response = urllib2.urlopen(url)
		self.response.out.write(response.read())

application = webapp.WSGIApplication([('/fetch', Fetch)], debug=True)

def main():
	run_wsgi_app(application)

if __name__ == "__main__":
	main()
