// http://www.picnik.com/info/api
var picnikParams = {
	_apikey: '8a74cebc7377d3d8da46d15a8974d1f3',
	_exclude: 'in',
	_page: '/create/text',
	_export: 'http://localhost:8080/share.html',
	_export_title: 'Save Album Cover',
	_export_agent: 'browser',
	_close_target: 'http://localhost:8080',
	_host_name: 'Wikipedia Names Your Band'
}

// http://en.wikipedia.org/w/api.php
$.artist = function() {
	$.getJSON(
		'http://en.wikipedia.org/w/api.php?action=query&list=random&rnnamespace=0&format=json&callback=?',
		function(data) {
			// remove disambiguations, e.g. (novel), (actor), (disambiguation), etc.
			artist = data.query.random[0].title.replace(/\s+\(.+?\)/, '')
			$('#artist').html(artist)
		}
	)
}
// use fetch.py to avoid "Access to restricted URI denied" exception
$.album = function() {
	$.get(
		'/fetch?u=' + encodeURIComponent('http://www.quotationspage.com/random.php3'),
		function(data) {
			// remove period, extract last six words of quotation, change to lowercase
			words = $(data).find('a[title^=Click]:last').html().replace(/.$/, '').split(' ')
			album = words.slice(Math.max(words.length - 6, 0), words.length).join(' ')
			$('#album').html(album.toLowerCase())
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
			src = 'http://farm' + photo.farm + '.static.flickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg'
			artwork = $('<img />').attr('src', src)
			$('#artwork').html(artwork)
		}
	)
}

$(function() {
	// album is slowest because we need to create and search a DOM
	$.album()
	$.artist()
	$.artwork()
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
	$('a.picnik').click(function() {
		href = 'http://www.picnik.com/service/?'
		picnikParams._import = $('#artwork img').attr('src')
		picnikParams._title = $('#artist').html()
		picnikParams.title = $('#artist').html() + ' - ' + $('#album').html()
		for (var key in picnikParams) {
			href += key + '=' + encodeURIComponent(picnikParams[key]) + '&'
		}
		window.open(href)
		return false
	})
})
