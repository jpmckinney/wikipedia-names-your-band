jQuery.query = {
	get: function() {
		var r = {};
		var q = location.search;
		q = q.replace(/^\?/, '');
		q = q.replace(/\&$/, '');
		jQuery.each(q.split('&'), function() {
			var key = this.split('=')[0];
			var val = this.split('=')[1];
			r[key] = unescape(val);
		});
		return r;
	},
	set: function(pairs) {
		var q = '';
		for (var key in pairs) {
			q += key + '=' + encodeURIComponent(pairs[key]) + '&';
		}
		return q;
	}
}
