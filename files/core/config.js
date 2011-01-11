(function(self) {
	
	//initialize
	self.configVars = ['version', 'name', 'description', 'copyright'];
	for(var i in self.configVars) {
		self[self.configVars[i]] = null;
	}
	self.browser = {
		name: navigator.appName,
		version: 0
	};
	self.air = false;
	self.platform = null;
	self.engine = {name: 'unknown', version: 0};
	/* TODO: Complete Browser detection */
	self.engines = {
		presto: function(){
			if(typeof window.opera != 'undefined') {
				self.browser.version = parseFloat(window.opera.version());
				return 0;
			}
			return false;
		},
		trident: function() {
			if(typeof window.ActiveXObject != 'undefined') {
				self.browser.name = 'MSIE';
			}
			return false;
		},
		webkit: function() {
			return false;
		},
		gecko: function() {
			return false;
		}
	};

	for(var engine in self.engines){
		var version = self.engines[engine]();
		self.engines[engine] = false;
		if (version) {
			self.engine = {name: engine, version: version};
			self.engines[engine] = true;
		}
	}

	debug('navigator.userAgent: ' + navigator.userAgent, 'App');
	debug('navigator.platform: ' + navigator.platform, 'App');

	debug('Detected Engine: ' + self.engine.name + '. Version: ' + self.engine.version, 'App');

	var ua = navigator.userAgent.toLowerCase(),
		platform = navigator.platform.toLowerCase();

	if (/adobeair/i.test(navigator.userAgent)) {
		self.air = {
			version: 1, //TODO: Read version
			sandbox: (typeof window.runtime!='undefined' && typeof window.nativeWindow!='undefined')
		}
		var descriptor = air.NativeApplication.nativeApplication.applicationDescriptor;
		var parser = new DOMParser();
		var xmlDoc = parser.parseFromString(descriptor, "text/xml");
		for(var i in self.configVars) {
			var tag = xmlDoc.getElementsByTagName(self.configVars[i]);
			if (tag.length > 0) {
				self[self.configVars[i]] = tag[0].textContent;
			}
		}
		debug('Running in AIR version: ' + self.air.version + '. Sandbox: ' + (self.air.sandbox ? 'true' : 'false'), 'App');
	} else {
		/* TODO: Complete Browser detection */
		//its a browser
		self.platform = {
			name: ua.match(/ip(?:ad|od|hone)/) ? 'ios' : (ua.match(/(?:webos|android)/) || platform.match(/mac|win|linux/) || ['other'])[0]
		};
		
		debug('Detected Browser: ' + self.browser.name + '. Version: ' + self.browser.version, 'App');
	}

	debug('App.config.debug: ' + self.debug, 'App');
	debug('App.config.baseurl: ' + self.baseurl, 'App');
	debug('App.config.language.iso2: ' + self.language.iso2, 'App');
	debug('App.config.language.iso3: ' + self.language.iso3, 'App');

})(App.config);