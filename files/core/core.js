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
	},
	jsonEncode: function(value, space, reviver) {
		if(window.JSON !== undefined && 'stringify' in window.JSON) {
			return window.JSON.stringify(value, reviver, space);
		} if('toSource' in value && reviver == undefined
			&& space == undefined) {
			return value.toSource();
		}
		return false;
	},
	jsonDecode: function(text, reviver) {
		if(window.JSON !== undefined && 'parse' in window.JSON) {
			return window.JSON.parse(text, reviver);
		} else if(window.jQuery !== undefined && 'parseJSON' in window.jQuery
			&& reviver === undefined) {
			window.jQuery.parseJSON(text);
		} else if(reviver === undefined) {
			return eval('('+text+')');
		}
		//Cannot decode
	}

};
function debug(msg, tab, time) {
	App.debug.log(msg, tab, time);
};