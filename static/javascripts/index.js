// load the feeds module of the Google AJAX APIs
google.load('feeds', '1')
// store photo.id for "I'm feeling lucky"
var photo_id
// http://en.wikipedia.org/w/api.php
$.artist = function() {
	$.getJSON(
		'http://en.wikipedia.org/w/api.php?action=query&list=random&rnnamespace=0&format=json&callback=?',
		function(data) {
			// remove disambiguations, e.g. (novel), (actor), (disambiguation), etc.
			html = data.query.random[0].title.replace(/\s+\(.+?\)/, '')
			$('#artist').html(html)
		}
	)
}
// use Google AJAX API to avoid 'Access to restricted URI denied' exception
// add a random number to the query string to avoid Google cache
// http://code.google.com/apis/ajaxfeeds/documentation/#HelloWorld
$.album = function() {
	var feed = new google.feeds.Feed('http://www.quotedb.com/quote/quote.php?action=random_quote_rss&' + Math.floor(Math.random() * 9999));
	feed.load(function(result) {
		if (!result.error) {
			// remove period, extract last six words of quotation, change to lowercase
			words = result.feed.entries[0].content.replace(/"$/, '').replace(/.$/, '').split(' ')
			html = words.slice(Math.max(words.length - 6, 0), words.length).join(' ')
			$('#album').html(html.toLowerCase())
		}
	})
}
// http://www.flickr.com/services/api/flickr.interestingness.getList.html
// http://www.flickr.com/services/api/response.json.html
// http://www.flickr.com/services/api/misc.urls.html
$.artwork = function() {
	$.getJSON(
		'http://api.flickr.com/services/rest/?api_key=509624220dfe5d4bc3d7ab02cfa03650&method=flickr.interestingness.getList&per_page=1&page=' + Math.floor(Math.random() * 500) + '&format=json&jsoncallback=?',
		function(data) {
			photo = data.photos.photo[0]
			href = 'http://www.flickr.com/photos/' + photo.owner + '/' + photo.id
			src = 'http://farm' + photo.farm + '.static.flickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg'
			html = $('<a />').attr('href', href).append($('<img />').attr('src', src))
			$('#artwork').html(html)
			photo_id = photo.id
		}
	)
}

// http://www.picnik.com/info/api
$(function() {
	$.album()
	$.artist()
	$.artwork()
	$('button.all').click(function() {
		$.album()
		$.artist()
		$.artwork()
		return false
	})
	$('button.artist').click(function() {
		$.artist()
		return false
	})
	$('button.album').click(function() {
		$.album()
		return false
	})
	$('button.artwork').click(function() {
		$.artwork()
		return false
	})
	$('button.picnik').click(function() {
		q = $.query.set({
			_apikey: '8a74cebc7377d3d8da46d15a8974d1f3',
			_exclude: 'in',
			_page: '/create/text',
			_import: $('#artwork img').attr('src'),
			_export: 'http://wnyb.slashpoundbang.com/share.html',
			_export_title: 'Save Album Cover',
			_export_agent: 'browser',
			_close_target: 'http://wnyb.slashpoundbang.com',
			_host_name: 'Wikipedia Names Your Band',
			_title: $('#artist').html()
		})
		window.open('http://www.picnik.com/service/?' + q)
		return false
	})
	$('button.lucky').click(function() {
		q = $.query.set({
			artwork: $('#artwork img').attr('src'),
			artist: $('#artist').html(),
			album: $('#album').html(),
			photo_id: photo_id
		})
		location.href = '/svg.html?' + q
		return false
	})
})
