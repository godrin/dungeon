var Monster=Toolbox.Base.extend({

  constructor:function(ops) {
  //alert("X");
    //$.extend(this,ops);
    console.log("OPS",ops);
    _.extend(this,ops);
    this.field.field(this.x, this.y).monster = this;
  },
  changed : Signal(),

  moveBy : function(by) {
  var self=this;
    var tx = self.x;
    var ty = self.y;
    if (by.x) {
      console.log('moved by', by.x);
      this.direction = (by.x == '-1')?"left":"right";
      tx += by.x;
    }
    if (by.y)
      ty += by.y;
    console.log("TXY", tx, ty);
    if (this.field.posOk(tx, ty)) {
      console.log("PoS OK");
      if (this.field.field(tx, ty).passable()) {
	console.log("PASSABlE");
	delete this.field.field(self.x, self.y).monster;
	var oldx = self.x, oldy = self.y;
	self.x = tx;
	self.y = ty;
	this.field.field(self.x, self.y).monster = self;
	//console.log(css);
	$.map(getRange(self.x, self.y), function(pos) {
	  var field = self.field.field(pos.x, pos.y);
	  if (field) {
	    field.changed();
	  }
	});
	this.field.fieldChanged(oldx, oldy, self);
	this.field.fieldChanged(self.x, self.y, self);
	self.changed();
      } else {
	console.log("Field not passable");
      }
    }
  }
});

var Player=Monster.extend({
   
});


