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

	this.keymap = {
		38 : {
			y : -1
		},
		40 : {
			y : 1
		},
		39 : {
			x : 1
		},
		37 : {
			x : -1
		},
		72 : {
			x : -1
		},
		76 : {
			x : 1
		},
		74 : {
			y : 1
		},
		75 : {
			y : -1
		},
		89 : {
			x : -1,
			y : -1
		},
		90 : {
			x : -1,
			y : -1
		},
		66 : {
			x : -1,
			y : 1
		},
		78 : {
			x : 1,
			y : 1
		},
		85 : {
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
		$(window).bind("keydown", function(ev) {
			console.log("EV", ev, ev.keyCode);

			var by = self.keymap[ev.keyCode];
			if (by) {
				self.model.player.moveBy(by);
				// self.view.init();
			}
		});
	};

}
