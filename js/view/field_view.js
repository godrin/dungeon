function FieldView(ops) {
  this.el = "#field";
  this.cellWidth = 128;
  $.extend(this, ops);
  var self = this;
  var cellViews = [];

  this.init = function() {
    $(self.el).empty();
    var html = "";

    self.model.eachCell(function(pcell) {
      var cell = new CellView({
        cell : pcell,
        pel : self.el,
        x : pcell.x * self.cellWidth,
        y : pcell.y * self.cellWidth
      });

      var x = cell.cell.x * self.cellWidth;
      var y = cell.cell.y * self.cellWidth;
      html += cell.html();
      cellViews.push(cell);
    });
    $(self.el).html(html);
    $.map(cellViews, function(cellView) {
      cellView.update();
    });

    $.map(this.model.monsters, function(monster) {
      var view = new ElementView({
        model : monster,
        cellWidth : self.cellWidth,
        parentEl : self.el
      });

      view.render();
    });
  };
}
