// http://en.wikipedia.org/w/api.php
$.artist = function() {
	$.getJSON(
		'http://en.wikipedia.org/w/api.php?action=query&list=random&rnnamespace=0&format=json&callback=?',
		function(data) {
			// remove disambiguations, e.g. (novel), (actor), (disambiguation), etc.
			artist = data.query.random[0].title.replace(/\s+\(.+?\)/, '');
			$('#artist').html(artist);
		}
	);
}
// use fetch.py to avoid Access to restricted URI denied exception
// album is slowest since we need to create and search the DOM
$.album = function() {
	$.get(
		'/fetch?u=' + encodeURIComponent('http://www.quotationspage.com/random.php3'),
		function(data) {
			// remove period, extract last six words of quotation, change to lowercase
			words = $(data).find('a[title^=Click]:last').html().replace(/.$/, '').split(' ');
			album = words.slice(Math.max(words.length - 6, 0), words.length).join(' ');
			$('#album').html(album.toLowerCase());
		}
	);
}
// http://www.flickr.com/services/api/flickr.interestingness.getList.html
// http://www.flickr.com/services/api/response.json.html
// http://www.flickr.com/services/api/misc.urls.html
$.artwork = function() {
	$.getJSON(
		'http://api.flickr.com/services/rest/?api_key=509624220dfe5d4bc3d7ab02cfa03650&method=flickr.interestingness.getList&per_page=1&page=' + Math.floor(Math.random() * 500) + '&format=json&jsoncallback=?',
		function(data) {
			photo = data.photos.photo[0];
			src = 'http://farm' + photo.farm + '.static.flickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg';
			artwork = $('<img />').attr('src', src);
			$('#artwork').html(artwork);
		}
	);
}

$(function() {
	// run album first because it's slow
	$.album();
	$.artist();
	$.artwork();
	$('button.artist').click(function() {
		$.artist();
		return false;
	});
	$('button.album').click(function() {
		$.album();
		return false;
	});
	$('button.artwork').click(function() {
		$.artwork();
		return false;
	});
	$('button.picnik').click(function() {
		// http://www.picnik.com/service/?_api_key=8a74cebc7377d3d8da46d15a8974d1f3
	});
});
