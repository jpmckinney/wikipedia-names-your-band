var width
var height
var params
var settings = {
	'font-family': [
		'Arial',
		'Arial Black', 
		// nobody likes 'Comic Sans MS'
		'Courier New',
		'Georgia',
		'Impact',
		'Times New Roman',
		'Trebuchet MS',
		'Verdana'
	],
	'font-style': [
		'normal',
		'italic'
	],
	'fill': [
		'#000000',
		'#ff0000',
		'#00ff00',
		'#0000ff',
		'#ffff00',
		'#ff00ff',
		'#00ffff',
		'#ffffff'
	],
	'stroke': [
		'#000000',
		'#ffffff'
	],
	'stroke-width': [
		'0',
		'2px'
	],
}

$.random = {
	color: function() {
		r = Math.floor(Math.random() * 256)
		g = Math.floor(Math.random() * 256)
		b = Math.floor(Math.random() * 256)
		return 'rgb(' + r + ',' + g + ',' + b + ')'
	},
	fontSize: function(min, max) {
		return min + Math.floor(Math.random() * (max - min)) + '%'
	},
	opacity: function(min, max) {
		return min + Math.floor(Math.random() * (max - min))
	},
	y: function(min, max) {
		return min + Math.floor(Math.random() * (max - min))
	},
	settings: function(string, width) {
		s = {}
		for (key in settings) {
			s[key] = settings[key][Math.floor(Math.random() * settings[key].length)]
		}
		// max font-size depends on string length and image width
		max = parseInt(1 / string.length * width * 12.8)
		s['font-size'] = $.random.fontSize(150, max)
		s['fill-opacity'] = $.random.opacity(0.8, 1.0)
		s['stroke-opacity'] = $.random.opacity(0.8, 1.0)
		return s
	}
}
$.draw = function() {
	canvas = $('#canvas').svg('get')
	canvas.clear()
	texts = canvas.createText()
	canvas.image(0, 0, width, height, params.artwork)
	canvas.text(5, $.random.y(100, height), texts.reset().span(params.artist, $.random.settings(params.artist, width)))
	canvas.text(5, $.random.y(100, height), texts.reset().span(params.album, $.random.settings(params.album, width)))
}

$(function() {
	params = $.query.get()
	$('#canvas').svg()
	$.getJSON(
		'http://api.flickr.com/services/rest/?api_key=509624220dfe5d4bc3d7ab02cfa03650&method=flickr.photos.getSizes&photo_id=' + params.photo_id + '&format=json&jsoncallback=?',
		function(data) {
			width = parseInt(data.sizes.size[3].width)
			height = parseInt(data.sizes.size[3].height)
			$.draw()
		}
	)
	$('button.retry').click(function() {
		$.draw()
		return false
	})
	$('button.export').click(function() {
		location.href = '/svg?svg=' + encodeURIComponent($('#canvas').svg('get').toSVG())
		return false
	})
})
