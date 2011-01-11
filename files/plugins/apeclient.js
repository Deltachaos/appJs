/*
App.ape = new function(client) {
	var self = this;

	//Instantiate APE Client
	self.client = new APE.Client;

	//1) Load APE Core
	self.client.load();
	//2) Intercept 'load' event. This event is fired when the Core is loaded and ready to connect to APE Server
	self.client.addEvent('load', function() {
		//3) Call core start function to connect to APE Server, and prompt the user for a nickname

		self.client.core.start({name:'asd'});
	});

	//4) Listen to the ready event to know when your client is connected
	self.client.addEvent('ready', function() {
		debug('Your client is now connected');

		//1) join 'testChannel' and 'testChannel2'
		self.client.core.join('testChannel');

		//multiPipeCreate event is fired when you join a channel
		self.client.addEvent('multiPipeCreate', function(pipe, options) {
			pipe.request.send('login', {name: 'asd'});
			debug('Sending name: ' + 'asd', 'Login');
		});
		self.client.core.onRaw('login', function(raw, pipe) {
			debug('Login: ' + raw.data.toSource(), 'Login');
		});
	});
	//4) Intercept the reception of new message.
	self.client.onRaw('data', function(raw, pipe) {
		debug('Receiving : \n' + raw.data.toSource());
	});
}
*/