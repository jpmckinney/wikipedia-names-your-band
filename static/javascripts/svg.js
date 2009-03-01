$.getJSON(
	'http://api.flickr.com/services/rest/?api_key=509624220dfe5d4bc3d7ab02cfa03650&method=flickr.photos.getSizes&photo_id=' + photo.id + '&format=json&jsoncallback=?',
	function(data) {
		width = parseInt(data.sizes.size[3].width)
		height = parseInt(data.sizes.size[3].height)
		canvas = $('#canvas').svg('get')
		canvas.clear()
		canvas.image(0, 0, width, height, src)
		canvas.text(100, 100, $('#artist').html())
		canvas.text(100, 200, $('#album').html())
		canvas.toSVG()
	}
)

$(function() {
	$('#canvas').svg()
})