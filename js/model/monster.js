function Monster(ops) {
	$.extend(this, ops);
	var self = this;

	ops.field.field(self.x, self.y).monster = this;

	this.changed = Signal();

	this.moveBy = function(by) {
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
				var oldx = self.x, oldy = self.y;

				self.x = tx;
				self.y = ty;
				ops.field.field(self.x, self.y).monster = self;
				$.map(getRange(self.x, self.y), function(pos) {
					var field = ops.field.field(pos.x, pos.y);
					if (field) {
						field.changed();
					}
				});
				ops.field.fieldChanged(oldx, oldy, self);
				ops.field.fieldChanged(self.x, self.y, self);
				self.changed();

			} else {
				Console.log("Field not passable");
			}
		}
	};
}
