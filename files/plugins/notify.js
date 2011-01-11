	function NotifyClass() {

		var self = this;
		self.options = new air.NativeWindowInitOptions();
		self.options.type = air.NativeWindowType.UTILITY;
		self.options.transparent = true;
		self.options.systemChrome = air.NativeWindowSystemChrome.NONE;

		self.visibleBounds = air.Screen.mainScreen.visibleBounds;
		self.bounds = new air.Rectangle(
							0,
							0,
							100,
							100
						);

		self.htmlLoader = air.HTMLLoader.createRootWindow(
								true, //makes the window visible
								self.options,
								false, // no scrollbars, optional
								self.bounds	// optional
							);
		self.htmlLoader.paintsDefaultBackground = false;
		self.htmlLoader.addEventListener(air.Event.HTML_DOM_INITIALIZE, function(){
			// Inject the opener, maybe for communication purposes
			self.htmlLoader.window.opener = window;
		});

		self.create = function() {
			self.htmlLoader.load( new air.URLRequest('html/windows/notification.html') );
		}

	};
	Notify = new NotifyClass();