function Controller(ops) {
	this.keymap = {
		104 : {
			x : -1
		},
		108 : {
			x : 1
		},
		106 : {
			y : 1
		},
		107 : {
			y : -1
		},
		121 : {
			x : -1,
			y : -1
		},
		122 : {
			x : -1,
			y : -1
		},
		98 : {
			x : -1,
			y : 1
		},
		110 : {
			x : 1,
			y : 1
		},
		117 : {
			x : 1,
			y : -1
		},
		60 : {
			z : 1
		},
		62 : {
			z : -1
		}
	};

	$.extend(this, ops);
	var self = this;

	this.init = function() {
		$(window).bind("keypress", function(ev) {
			console.log("EV", ev);

			var by = self.keymap[ev.keyCode];
			if (by) {
				self.model.player.moveBy(by);
				// self.view.init();
			}
		});
	};

}
