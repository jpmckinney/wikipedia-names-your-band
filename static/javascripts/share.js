var addthis_pub = 'jpmckinney'
var addthis_options = 'twitter, facebook, digg, delicious, myspace, google, reddit, live, friendfeed, more'

$.query = function() {
	var r = {}
	var q = location.search
	q = q.replace(/^\?/, '')
	q = q.replace(/\&$/, '')
	$.each(q.split('&'), function() {
		key = this.split('=')[0]
		val = this.split('=')[1]
		r[key] = unescape(val)
	})
	return r
}

$(function() {
	params = $.query()
	cover = $('<img />').attr('src', params.file).prependTo('#cover')
	$('<meta />').attr('name', 'title').attr('content', params.title).appendTo('head')
	$('<link />').attr('rel', 'image_src').attr('content', params.file).appendTo('head')
	$('#email').click(function() {
		return addthis_open(this, 'email', '[URL]', params.title)
	})
	$('#share').hover(
		function() {
			return addthis_open(this, '', '[URL]', params.title)
		},
		function() {
			addthis_close()
		}
	)
})
