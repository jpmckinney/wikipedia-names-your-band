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
	anchor = $('<a />').attr('href', params.file).prependTo('#cover')
	cover = $('<img />').attr('src', params.file).prependTo('#cover a')
	$.get(
		'/fetch?u=' + encodeURIComponent('http://is.gd/api.php?longurl=' + encodeURIComponent(location.href)),
		function(data) {
			url = data
			$('#short_url').val(url)
		}
	)
	$('#short_url').click(function() {
		this.select()
		this.focus()
	})
	$('#short_url').select(function() {
		this.select()
		this.focus()
	})
	$('#short_url').keyup(function() {
		this.select()
		this.focus()
	})
	$('#email').click(function() {
		return addthis_open(this, 'email', url, '[TITLE]')
	})
	$('#share').click(function() {
		return addthis_sendto()
	})
	$('#share').hover(
		function() {
			return addthis_open(this, '', url, '[TITLE]')
		},
		function() {
			addthis_close()
		}
	)
})
