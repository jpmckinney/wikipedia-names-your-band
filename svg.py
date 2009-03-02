from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app

class SVG(webapp.RequestHandler):
	def get(self):
		self.response.headers['Content-Type'] = 'image/svg+xml'
		svg = self.request.get('svg')
		self.response.out.write(svg)

application = webapp.WSGIApplication([('/svg', SVG)], debug=True)

def main():
	run_wsgi_app(application)

if __name__ == "__main__":
	main()
