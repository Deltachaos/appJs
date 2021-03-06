
App.hash = new function() {

	var self = this;

	self.equals = function(x, y) {
		for(p in y) {
			if(typeof x[p] == 'undefined') {
				return false;
			}
		}

		for(p in y) {
			if(y[p]) {
				switch(typeof y[p]) {
					case 'object':
						if(!self.equals(y[p], x[p])) {
							return false;
						}
						break;
					case 'function':
						if(typeof x[p] == 'undefined' || (p != 'equals' && y[p].toString() != x[p].toString())) {
							return false;
						}
						break;
					default:
						if(y[p] != x[p]) {
							return false;
						}
				}
			} else {
				if (x[p]) {
					return false;
				}
			}
		}

		for(p in x) {
			if(typeof y[p] == 'undefined') {
				return false;
			}
		}

		return true;
	}
	self.forceReload = false;

	self.events = {
		url: {},
		data: {},
		anchor: {}
	};

	self.current = {
		url: '',
		anchor: '',
		data: {}
	}

	self.data = {};
	self.baseurl = App.config.baseurl;
	self.setLocation = function(location) {
		self.location = location;
		self.requestUrl = self.baseurl + self.location.substr(1);
	}
	self.setLocation('/');
	self.anchor = '';


	var getType = function(type, callback) {
		var key, pos;
		pos = type.indexOf('.');
		if(pos == -1) {
			key = callback;
		} else {
			key = type.substr(pos + 1);
			type = type.substr(0, pos);
		}
		return [type, key];
	}

	self.unregisterEvent = function(type, callback) {
		var key, tmp;
		tmp = getType(type, callback);
		type = tmp[0];
		key = tmp[1];
		delete self.events[type][key];
	}
	self.registerEvent = function(type, callback, autounregister) {
		var originaltype, tmp, key;
		originaltype = type;
		tmp = getType(type, callback);
		type = tmp[0];
		key = tmp[1];
		if(type == 'url' || type == 'data' || type == 'anchor')  {
			if(autounregister != null) {
				window.jQuery(autounregister).livequery(function() {
				}, function() {
					self.unregisterEvent(originaltype, callback);
				});
			}
			self.events[type][key] = callback;
		}
	}
	self.callEvent = function() {
	}

	self.error = function() {

	}

	self.parseData = function(data) {
		var obj = {};
		var pos;
		//TODO: Encode
		$.each(data.split('/'), function(index, value) {
			pos = value.indexOf(':');
			if(pos > 0) {
				obj[value.substr(0, pos)] = value.substr(pos + 1);
			}
		});
		return obj;
	}

	self.parseHash = function() {
		var hash, pos, data;
		data = '';
		hash = window.location.hash.substr(1);
		if(hash.length == 0) {
			hash = '/';
			self.anchor = '';
		} else {
			pos = hash.indexOf('!');
			if(pos == -1) {
				self.error();
				return;
			}
			self.anchor = hash.substr(0, pos);
			hash = hash.substr(pos + 1);
			pos = hash.indexOf('/!#/');
			if(pos > 0) {
				data = hash.substr(pos + 4);
				hash = hash.substr(0, pos);
			}
		}
		self.data = self.parseData(data);
		self.setLocation(hash);
		debug("New Hash Data:" +
			"\nAnchor: " + self.anchor +
			"\nLocation: " + self.location +
			"\nData: " + App.jsonEncode(self.data), 'Hash');
	}

	self.checkChange = function(type) {
		switch(type) {
			case 'anchor':
				if(self.current[type] == self.anchor) {
					return false;
				} else {
					self.current[type] = self.anchor;
				}
				break;
			case 'url':
				if(self.current[type] == self.location) {
					return false;
				} else {
					self.current[type] = self.location;
				}
				break;
			case 'data':
				if(self.equals(self.current[type], self.data)) {
					return false;
				} else {
					self.current[type] = self.data;
				}
				break;
		}
		return true;
	}

	self.hashChange = function() {
		self.parseHash();
		jQuery.each(self.events, function(key, events) {
			if(self.checkChange(key)) {
				jQuery.each(events, function(dummy, event) {
					event.call(self);
				});
			}
		});
		self.forceReload = false;
	}

	self.getPathname = function(pathname) {
		if(!pathname) {
			pathname = window.location.pathname;
		}
		//return the pathname without baseurl
		return pathname.substr(App.config.baseurl.length);
	}

	self.getAnchor = function(anchor) {
		if(!anchor) {
			anchor = '';
		}
		return '#' + anchor + '!';
	}

	self.getDataUrl = function(data) {
		if(!data) {
			return '';
		}
		var prefix = '/!#/';
		var str = '';
		$.each(data, function(key, value) {
			//TODO: Encode
			if(value !== undefined) {
				str += key + ':' + value + '/';
			}
		})
		if(str == '') {
			return '';
		}
		return prefix + str;
	}

	self.getHash = function(href, data, anchor) {
		if(href) {
			self.setLocation('/' + self.getPathname(href));
		} else {
			if(!anchor) {
				anchor = self.anchor;
			}
			if(!data) {
				data = self.data;
			}
		}
		anchor = self.getAnchor(anchor);
		data = self.getDataUrl(data);
		return anchor + self.location + data;
	}

	self.href = function(href, data, anchor) {
		var hash = self.getHash(href, data, anchor);
		var triggerEvent = false;
		if(window.location.hash == hash) {
			triggerEvent = true;
		}
		window.location.hash = hash;
		if(triggerEvent) {
			window.onhashchange.call(window);
		}
		return true;
	}


	//API functions
	self.setData = function(data) {
		self.data = data;
		return self.href();
	}

	self.unsetData = function() {
		self.data = {};
		return self.href();
	}

	self.set = function(key, value) {
		self.data[key] = value;
		return self.href();
	}

	self.unset = function(key) {
		delete self.data[key];
		return self.href();
	}

	self.goPath = function(href, triggerEvent) {
		if(triggerEvent === undefined) {
			triggerEvent = true;
		}
		return self.href(href);
	}

	self.goAnchor = function(anchor, triggerEvent) {
		if(triggerEvent === undefined) {
			triggerEvent = true;
		}
		if(anchor.substr(0, 1) == '#') {
			anchor = anchor.substr(1);
		}
		return self.href(null, null, anchor);
	}



	self.redirect = function(href, data, anchor) {
		window.location.href = App.config.baseurl + self.getHash(href, data, anchor);
		return true;
	}

	//onHashChange
	self.hash = window.location.hash;
	if(!('onhashchange' in window)) {
		//Fallback if onhashchange was not implemented
		setInterval(function() {
			if(window.location.hash != self.hash
				&& window.location.hash.length > 0
				&& typeof (window.onhashchange) === 'function') {
				self.hash = window.location.hash;
				window.onhashchange.call(window);
			}
		}, 100);
	}
	window.onhashchange = self.hashChange;

	if(self.getPathname().length > 0) {
		self.redirect(window.location.pathname, null, self.hash.substr(1));
	}
	window.onhashchange.call(window);

	//Handle anchors and forms with ajax
	window.jQuery(document).ready(function() {
		window.jQuery('a[href^="/"][target!="_blank"]:not(.noHash)').live('click', function(e) {
			self.forceReload = true;
			self.goPath($(this).attr('href'));
			e.stopImmediatePropagation();
			return false;
		});
		window.jQuery('a[href^="#"][target!="_blank"]:not(.noHash)').live('click', function(e) {
			self.goAnchor($(this).attr('href'));
			e.stopImmediatePropagation();
			return false;
		});
	});

};

