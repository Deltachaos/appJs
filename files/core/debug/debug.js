if (App.config.debug > 0) {
	App.debug = new function() {
		if(App.config.air && (typeof air.Introspector) != 'undefined') {
			air.Introspector.toggleWindow();
		}

		var self = this;
		self.tabs = {
			Main: 1
		}
		self.id = 2;

		var debugConsole = $('<div id="debugConsole"><a href="#" class="close noHash">x</a><ul><li class="active"><a class="noHash" href="#debugConsole-1">Main</a></li></ul><div style="display:block" class="debugDiv" id="debugConsole-1"></div></div>');
		debugConsole.children('a.close').click(function(e) {
			var toRight = ($('#debugConsole').outerWidth() - 25) * -1;
			var right = $('#debugConsole').css('right');
			right = right.substr(0, right.length - 2);
			if (right > toRight) {
				$('#debugConsole').stop(true).animate({
					right: toRight,
					opacity: .35
				}, function(){
					$('#debugConsole').resizable("option", "disabled", true);
				});
				$.cookie("debugConsole", 0);
			}
			e.stopImmediatePropagation();
			return false;
		});
		debugConsole.click(function(e){
			if (this == e.target) {
				var toRight = ($('#debugConsole').outerWidth() - 25) * -1;
				var right = $('#debugConsole').css('right');
				right = right.substr(0, right.length - 2);
				if (right == toRight) {
					$('#debugConsole').stop(true).animate({
						right: 10,
						opacity: 1
					}, 'fast', function(){
						$('#debugConsole').resizable("option", "disabled", false);
					});
					$.cookie("debugConsole", 1);
				}
				else {
					$('#debugConsole').children('a.close').click();
				}
			}
		});
		if ($.cookie("debugConsoleWidth") !== null) {
			debugConsole.width($.cookie("debugConsoleWidth"));
		}
		if ($.cookie("debugConsoleHeight") !== null) {
			debugConsole.height($.cookie("debugConsoleHeight"));
			debugConsole.children('div.debugDiv').height($.cookie("debugConsoleHeight") - 40);
		}
		debugConsole.appendTo('body');
		if (!(parseInt($.cookie("debugConsole")) > 0)) {
			$('#debugConsole').css({
				right: (($('#debugConsole').outerWidth() - 25) * -1) + 'px',
				opacity: .35
			});
		}
		$('#debugConsole').resizable({
			handles: 'nw',
			alsoResize: '#debugConsole > div.debugDiv',
			stop: function(){
				$.cookie("debugConsoleWidth", $('#debugConsole').width());
				$.cookie("debugConsoleHeight", $('#debugConsole').height());
				$('#debugConsole').children('div.debugDiv').height($('#debugConsole').height() - 40);
			}
		});
		$('#debugConsole').resizable("option", "disabled", (parseInt($.cookie("debugConsole")) == 0));

		$('#debugConsole > ul > li > a').live('click', function(e){
			$(this).parents('ul').children('li').removeClass('active');
			$(this).parent().addClass('active');
			$('#debugConsole').children('div.debugDiv').hide();
			$('#debugConsole ' + this.hash).show();
			$.cookie("debugConsoleTab", $(this).attr('tabname'));
			return false;
		});

		$('#debugConsole > ul > li > span').live('click', function(e) {
			$('#debugConsole ' + this.hash).remove();
			self.tabs[$(this).parent().children('a').attr('tabname')] = undefined;
			$(this).parent().remove();
			$('#debugConsole > ul > li > a:first-child').click();
			e.stopImmediatePropagation();
			return false;
		});

		self.getId = function(){
			var id = self.id;
			self.id++;
			return id;
		}

		self.addTab = function(tabname){
			var id = self.getId();
			$('#debugConsole').append('<div class="debugDiv" id="debugConsole-' + id + '"></div>');
			$('#debugConsole').children('div.debugDiv').height($('#debugConsole').height() - 40);
			$('#debugConsole ul').append('<li><a class="noHash" href="#debugConsole-' + id + '" tabname="' + htmlspecialchars(tabname) + '">' + htmlspecialchars(tabname) + '</a><span>x</span></li>');
			if ($.cookie("debugConsoleTab") == tabname) {
				$('#debugConsole > ul > li > a[href="#debugConsole-' + id + '"]').click();
			}
			return self.tabs[tabname] = id;
		}

		self.getTabByName = function(name){
			if (name === undefined) {
				name = 'Main';
			}
			if (self.tabs[name] !== undefined) {
				var tabid = self.tabs[name];
				if ($('#debugConsole div#debugConsole-' + tabid).length == 0) {
					tabid = self.addTab(name);
				}
			}
			else {
				tabid = self.addTab(name);
			}
			return $('#debugConsole div#debugConsole-' + tabid);
		}

		self.log = function(msg, tab){
			if(typeof msg == 'object' || typeof msg == 'array') {
				msg = App.jsonEncode(msg, "\t");
			}
			if(msg === undefined) {
				msg = "<i>undefined</i>";
			} else {
				var msg = htmlspecialchars(msg).replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1<br/>$2');
			}
			if (typeof console != 'undefined' && typeof console.log == 'function') {
				console.log((tab != null ? tab + ': ' : '') + msg);
			} else if(App.config.air && (typeof air.Introspector != 'undefined')) {
				air.Introspector.Console.log(msg);
			}
			var tab = self.getTabByName(tab);
			var scrollToBottom = false;
			if (tab.scrollTop() == (tab[0].scrollHeight - tab.outerHeight())) {
				scrollToBottom = true;
			}
			tab.append('<p>' + msg + '</p>');
			if (scrollToBottom) {
				tab.scrollTop(tab[0].scrollHeight - tab.outerHeight());
			}
		}

		$.each(App.debug.cache, function(index, value) {
			self.log(value.msg, value.tab, value.time);
		});


	};
};
