function FieldView(ops) {
	this.el = "#field";
	this.cellWidth = 60;
	$.extend(this, ops);
	var self = this;

	this.init = function() {
		$(self.el).empty();

		self.model.eachCell(function(pcell) {
			var cell = new CellView({
				cell : pcell,
				pel : self.el
			});
			var x = cell.cell.x * self.cellWidth, y = cell.cell.y
					* self.cellWidth;
			cell.el.css({
				left : x,
				top : y
			});
		});

	};
}