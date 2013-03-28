function FieldModel(ops) {
  this.w = 16;
  this.h = 16;

  $.extend(this, ops);
  var self = this;

  var fields = [];
  var monsters = {};
  this.posOk = function(x, y) {
    return x >= 0 && x < self.w && y >= 0 && y < self.h;
  };

  this.fieldChanged = function(x, y, byWhom) {
    if (byWhom && byWhom.type == "player") {
      $.map(getRange(x, y, 5, 5), function(pos) {
	var f = self.field(pos.x, pos.y);
	if (f) {
	  var dx = (byWhom.x - pos.x), dy = (byWhom.y - pos.y);
	  var op = 1.6 - Math.sqrt(dx * dx + dy * dy) / 3;
	  if (op > 1)
	    op = 1;
	  if (op < 0)
	    op = 0;
	  if (op > f.opacity)
	    f.opacity = op;
	  f.changed();
	}
      });
    } else
      this.field(x, y).changed();
  };

  this.field = function(x, y) {
    if (x >= 0 && x < self.w && y >= 0 && y < self.h)
      return fields[x + y * self.w];
  };

  this.init = function() {
    if (ops.field && ops.field.length > 0) {
      this.h = ops.field.length;
      this.w = ops.field[0].length;
    }

    //var html="";

    for ( var i = 0; i < self.w * self.h; i++) {
      var cell = new Cell();
      cell.opacity = 0;
      var x = i % self.w;
      var y = Math.floor(i / self.w);
      var v = ops.field[y][x];
      if (self.field) {
	if (v == "@") {
	  // self.player=monsters.player=new
	  // Monster({value:"@",type:"player",x:x,y:y,field:self});
	} else

	  cell.value = v;
      } else if (x == 0 || x == self.w - 1 || y == 0 || y == self.h - 1)
	cell.value = "#";
      fields.push(cell);
      //html+=cell.html();
      if (v == "@")
	self.player = monsters.player = new Player({
	  value : "@",
	  type : "player",
	  x : x,
	  y : y,
	  field : self
	});
	else if (v == "O")
	  self.ghoul = monsters.ghoul = new Monster({
	    value : "O",
	    type : "ogre",
	    x : x,
	    y : y,
	    field : self
	  });
	  else if (v == "D")
	    self.dwarf = monsters.dwarf = new Monster({
	      value : "D",
	      type : "dwarf",
	      x : x,
	      y : y,
	      field : self
	    });

    }
    //$(self.el).html(html);
    if (!self.player)
      self.player = monsters.player = new Monster({
	value : "@",
	type : "player",
	x : 2,
	y : 2,
	field : self
      });

      self.fieldChanged(self.player.x,self.player.y,self.player);
  };

  this.eachCell = function(callback) {
    var x, y;
    for (x = 0; x < self.w; x++) {
      for (y = 0; y < self.h; y++) {
	callback({
	  x : x,
	  y : y,
	  cell : fields[x + y * self.w]
	});
      }
    }
  };
}
