
function Monster(ops) {
	$.extend(this, ops);
	var self = this;

	ops.field.field(self.x, self.y).monster = this;

	function getRange(x, y) {
		var positions = [];
		var i, j;
		for (i = x - 3; i <= x + 3; i++) {
			for (j = y - 3; j <= y + 3; j++) {
				positions.push({
					x : i,
					y : j
				});
			}
		}
		return positions;
	}

	this.moveBy = function(by) {
		function MakeConsole(ops) {
			$.extend(this, ops);
			var self = this;
			this.log = function(t) {
				$(self.el).append("<p>" + t + "</p>");
			};
		}
		;

		var Console = new MakeConsole({
			el : "#console"
		});

		function Signal() {
			var listeners = [];

			var f = function() {
				var as = arguments;
				$.map(listeners, function(l) {
					l.fct.apply(l.obj, as);
				});
			};

			f.add = function(obj, fct) {
				listeners.push({
					obj : obj,
					fct : fct
				});
			};
			f.remove = function(obj) {
				listeners = $.grep(listeners, function(l) {
					return l.obj != obj;
				});
			};
			return f;
		}
		;

		var tx = self.x;
		var ty = self.y;
		if (by.x)
			tx += by.x;
		if (by.y)
			ty += by.y;
		console.log("TXY", tx, ty);
		if (ops.field.posOk(tx, ty)) {
			console.log("PoS OK");
			if (ops.field.field(tx, ty).passable()) {
				console.log("PASSABlE");
				delete ops.field.field(self.x, self.y).monster;
				ops.field.field(self.x, self.y).changed();

				self.x = tx;
				self.y = ty;
				ops.field.field(self.x, self.y).monster = self;
				$.map(getRange(self.x, self.y), function(pos) {
					var field = ops.field.field(pos.x, pos.y);
					if (field) {
						field.changed();
					}
				});
				ops.field.field(self.x, self.y).changed();

			} else {
				Console.log("Field not passable");
			}
		}
	};
}
