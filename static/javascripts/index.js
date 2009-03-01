// http://www.picnik.com/info/api
var picnikParams = {
	_apikey: '8a74cebc7377d3d8da46d15a8974d1f3',
	_exclude: 'in',
	_page: '/create/text',
	_export: 'http://wnyb.slashpoundbang.com/share.html',
	_export_title: 'Save Album Cover',
	_export_agent: 'browser',
	_close_target: 'http://wnyb.slashpoundbang.com',
	_host_name: 'Wikipedia Names Your Band'
}

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
// use fetch.py to avoid "Access to restricted URI denied" exception
// $.album is slowest because we need to create and search a DOM
// add a random number to the query string to avoid Google cache
$.album = function() {
	$.get(
		'/fetch?u=' + encodeURIComponent('http://www.quotationspage.com/random.php3?' + Math.floor(Math.random() * 9999)),
		function(data) {
			// remove period, extract last six words of quotation, change to lowercase
			words = $(data).find('a[title^=Click]:last').html().replace(/.$/, '').split(' ')
			html = words.slice(Math.max(words.length - 6, 0), words.length).join(' ')
			$('#album').html(html.toLowerCase())
		}
	)
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
		}
	)
}

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
		href = 'http://www.picnik.com/service/?'
		picnikParams._import = $('#artwork img').attr('src')
		picnikParams._title = $('#artist').html()
		for (var key in picnikParams) {
			href += key + '=' + encodeURIComponent(picnikParams[key]) + '&'
		}
		window.open(href)
		return false
	})
})
