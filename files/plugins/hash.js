/*
App.hash = new function() {

	var self = this;
	self.forceReload = false;
	self.data = {};
	self.url = {};
	
	
	self.registerEvent = function(type, callback, autounregister) {

	}
	self.unregisterEvent = function(type, callback) {

	}

	self.hashChange = function() {
		
		alert(window.location.hash);
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
		return '#!' + anchor + '/';
	}

	self.getDataUrl = function(data) {
		if(!data) {
			return '';
		}
		var str = '/!#/';
		$.each(data, function(key, value) {
			str += key + ':' + value + '/';
		})
		return str;
	}

	self.getHash = function(href, data, anchor) {
		href = self.getPathname(href);
		data = self.getDataUrl(data);
		anchor = self.getAnchor(anchor);
		return anchor + href + data;
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

	self.goToPathname = function(href, triggerEvent) {
		if(triggerEvent === undefined) {
			triggerEvent = true;
		}
		return self.href(href);
	}

	self.goToAnchor = function(anchor, triggerEvent) {
		if(triggerEvent === undefined) {
			triggerEvent = true;
		}
		if(anchor.substr(0, 1) == '#') {
			anchor = anchor.substr(1);
		}
		return self.href(null, null, anchor);
	}

	self.redirect = function(href, data, anchor) {
		window.location.href = '/' + self.getHash(href, data, anchor);
		return true;
	}

	//onHashChange
	self.hash = window.location.hash;
	if(!('onhashchange' in window)) {
		//Fallback if onhashchange was not implemented
		setInterval(function() {
			if(window.location.hash != self.hash && window.location.hash.length > 0 && typeof (window.onhashchange) === 'function') {
				self.hash = window.location.hash;
				window.onhashchange.call(window);
			}
		}, 100);
	}
	window.onhashchange = self.hashChange;

	if(self.hash.length > 0 && self.hash.substr(0, 2) != '#!' || self.getPathname().length > 0) {
		self.redirect(window.location.pathname, null, self.hash.substr(1));
	} else if(self.hash.length > 0 && self.hash.substr(0, 2) == '#!') {
		window.onhashchange.call(window);
	}

	//Handle anchors and forms with ajax
	$(document).ready(function() {
		$('a[href^="/"][target!="_blank"]:not(.noHash)').live('click', function(e) {
			self.forceReload = true;
			self.goToPathname($(this).attr('href'));
			e.stopImmediatePropagation();
			return false;
		});
		$('a[href^="#"][target!="_blank"]:not(.noHash)').live('click', function(e) {
			self.goToAnchor($(this).attr('href'));
			e.stopImmediatePropagation();
			return false;
		});
	});

};

*/