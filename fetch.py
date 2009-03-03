import re, urllib2, urlparse, html5lib
from BeautifulSoup import BeautifulSoup
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
from google.appengine.api.urlfetch import DownloadError

class Fetch(webapp.RequestHandler):
	def get(self):
		if 'u' not in self.request.GET:
			self.error(400)
			self.response.out.write('The request must contain the parameter u.')
			return

		try:
			url = self.request.get('u')
			response = urllib2.urlopen(url)
		except ValueError:
			self.error(400)
			self.response.out.write('The parameter u is not a valid URI.')
			return
		except DownloadError:
			self.error(400)
			self.response.out.write('The parameter u is a nonexistent URI.')
			return

		data = response.read()
		# don't add html tags to a text response
		if re.search('<head>', data):
			parser = html5lib.HTMLParser(tree=html5lib.treebuilders.getTreeBuilder('beautifulsoup'))
			soup = parser.parse(data)
			for e in soup(src=True):
				# remove images and scripts to avoid 404 errors
				e.extract()
			for e in soup(href=True):
				# convert relative to absolute urls
				e['href'] = urlparse.urljoin(url, e['href'])
			self.response.out.write(str(soup))
		else:
			self.response.out.write(data)

application = webapp.WSGIApplication([('/fetch', Fetch)], debug=True)

def main():
	run_wsgi_app(application)

if __name__ == "__main__":
	main()
