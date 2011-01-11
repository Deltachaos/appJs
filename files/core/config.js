
App.config = new function() {
	
	var self = this;
	
	//initialize
	self.configVars = ['version', 'name', 'description', 'copyright'];
	for(var i in self.configVars) {
		self[self.configVars[i]] = null;
	}
	self.browser = false;
	self.air = false;
	self.debug = 0;
	self.platform = null;
	
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
	} else {
		//its a browser
		self.platform = {name: (window.orientation != undefined) ? 'ipod' : (navigator.platform.match(/mac|win|linux/i) || ['other'])[0].toLowerCase()};
		self.browser = {
			engine: {name: 'unknown', version: 0}
		};
	}
	
};