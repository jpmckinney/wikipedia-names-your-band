import urllib2, urlparse, html5lib
from BeautifulSoup import BeautifulSoup
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app

class Fetch(webapp.RequestHandler):
	def get(self):
		url = self.request.get('u')
		response = urllib2.urlopen(url)
		# convert relative to absolute urls to avoid 404 errors in Google logs
		parser = html5lib.HTMLParser(tree=html5lib.treebuilders.getTreeBuilder('beautifulsoup'))
		soup = parser.parse(response)
		for e in soup(src=True):
			e['src'] = urlparse.urljoin(url, e['src'])
		for e in soup(href=True):
			e['href'] = urlparse.urljoin(url, e['href'])
		self.response.out.write(str(soup))

application = webapp.WSGIApplication([('/fetch', Fetch)], debug=True)

def main():
	run_wsgi_app(application)

if __name__ == "__main__":
	main()
