function CellView(ops) {
	$.extend(this, ops);
	var self = this;
	var _classes = {
		"." : "pass",
		"#" : "wall",
		"@" : "player",
		"<" : "stairs_down",
		"O" : "ogre",
		"$" : "gold"

	};
	this.cellId = "" + self.cell.x + "_" + self.cell.y;
	this.outer = function() {
		var h = "<div class='cell' style='left:" + self.x + "px;top:" + self.y
				+ "px;' id='" + self.cellId + "'><div class='cellinner'>"
				+ this.inner() + "</div></div>";
		return h;
	};
	this.classFor = function(chr) {
		return _classes[chr];
	};

	this.inner = function() {
		var h = "<div class='bg'><div class='"
				+ self.classFor(self.cell.cell.value) + "'></div></div>";
		if (self.cell.cell.monster)
			h += "<div class='monster' id='monster_" + self.cell.x + "_"
					+ self.cell.y + "'><div class='"
					+ self.classFor(self.cell.cell.monster.value)
					+ "'></div></div>";
		return h;
	};

	this.innerel = function() {
		if (!self.innerelcache) {
			self.innerelcache = $(self.innerelid);
			if (self.innerelcache.length == 0)
				self.innerelcache = null;
		}
		return self.innerelcache;
	};

	this.update = function() {
		if (self.innerel()) {
			self.innerel().html(self.inner());

			self.innerel().css({
				opacity : self.cell.cell.opacity
			}, "slow");
		}
	};

	this.html = function() {
		return self.outer();
	};

	/*
	 * this.el = $(this.outer()); // this.update(); this.el.appendTo(this.pel);
	 * this.el = $("#" + self.cellId, this.pel);
	 * 
	 * this.innerel = $(".cellinner", this.el); this.update();
	 */
	this.innerelid = "#"+this.cellId + " .cellinner";
	self.cell.cell.changed.add(this, function() {
		self.update();
	});
}
