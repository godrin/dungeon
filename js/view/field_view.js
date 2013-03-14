function FieldView(ops) {
	this.el = "#field";
	this.cellWidth = 60;
	$.extend(this, ops);
	var self = this;
	var cellViews=[];

	this.init = function() {
		$(self.el).empty();
		var html="";

		self.model.eachCell(function(pcell) {
			var cell = new CellView({
				cell : pcell,
				pel : self.el,
				x:pcell.x*self.cellWidth,
				y:pcell.y*self.cellWidth
			});
			
			var x = cell.cell.x * self.cellWidth, y = cell.cell.y
					* self.cellWidth;
			/*cell.el.css({
				left : x,
				top : y
			});*/
			html+=cell.html();
			cellViews.push(cell);
		});
		$(self.el).html(html);
		$.map(cellViews,function(cellView) {cellView.update();});

	};
}