var App;
App = {
	debug: {
		cache: [],
		log: function(msg, tab, time) {
			if(typeof App.debug.tabs == 'undefined') {
				App.debug.cache.push({
					msg: msg,
					tab: tab,
					time: time
				});
			}
		}
	}
};
function debug(msg, tab, time) {
	App.debug.log(msg, tab, time);
};