function CellView(ops) {
	$.extend(this, ops);
	var self = this;
	var _classes = {
		// "." : "pass",
		// "#" : "wall",
		"@" : "player",
		"<" : "stairs_down",
		"O" : "ogre",
		"$" : "gold"

	};
	this.cellId = "" + self.cell.x + "_" + self.cell.y;
	this.outer = function() {
		var h = "<div class='cell' style='left:" + self.x + "px;top:" + self.y
				+ "px;' id='" + self.cellId + "'>" + this.inner() + "</div>";
		return h;
	};
	this.classFor = function(chr) {
		return _classes[chr];
	};
	this.classForBg = function(chr) {
		if (chr == "#")
			return "wall";
		return "pass";
	};

	this.inner = function() {
		var h = "<div class='bg cellinner "
				+ self.classForBg(self.cell.cell.value) + "'>";
		var itemClass = self.classFor(self.cell.cell.value);
		if (itemClass) {
			h += "<div class='item " + itemClass + "'></div>";
		}
		if (self.cell.cell.monster)
			h += "<div class='monster "
					+ self.classFor(self.cell.cell.monster.value)
					+ "' id='monster_" + self.cell.x + "_" + self.cell.y
					+ "'></div>";
		h += "</div>";
		return h;
	};

	this.innerel = function() {
		if (!self.innerelcache) {
			self.innerelcache = $("#" + self.cellId);
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
	this.innerelid = "#" + this.cellId + " .cellinner";
	self.cell.cell.changed.add(this, function() {
		self.update();
	});
}
