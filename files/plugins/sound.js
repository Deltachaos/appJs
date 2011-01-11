if (/* App.config.browser && /* TODO: Uncomment if Native Sound API is ready */ (typeof soundManager) != 'undefined') {
	App.sound = soundManager;
} else if(App.config.air) {
	//soundManager API compatible
	App.sound = new function() {
		
		var self = this;
		
		if(App.config.air) {
			//TODO: Use Native Sound API
		}
		
	}
} else {
	//TODO: Add dummy API
}
 
