function FieldModel(ops) {
  this.w = 16;
  this.h = 16;

  $.extend(this, ops);
  var self = this;

  var fields = [];
  self.monsters = [];
  this.posOk = function(x, y) {
    return x >= 0 && x < self.w && y >= 0 && y < self.h;
  };

  this.fieldChanged = function(x, y, byWhom) {
    if (byWhom && byWhom.type == "player") {
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
	} else {
	  if(v=="$") {
	    cell.items.push(new Item({gold:1}));
	    v="$";
	  }
	  cell.value = v;
	}
      } else if (x == 0 || x == self.w - 1 || y == 0 || y == self.h - 1)
	cell.value = "#";
      fields.push(cell);
      //html+=cell.html();
      var monster=null;
      if (v == "@") {
	monster = self.player = new Player({
	  value : "@",
	  type : "player",
	  x : x,
	  y : y,
	  field : self
	});
      } else if (v == "O") {
	monster = new Monster({
	  value : "O",
	  type : "ogre",
	  x : x,
	  y : y,
	  field : self
	});
      } else if (v == "D") {
	monster = new Monster({
	  value : "D",
	  type : "dwarf",
	  x : x,
	  y : y,
	  field : self
	});
	  } else if (v == "T") {
	monster = new Monster({
	  value : "T",
	  type : "stone_troll",
	  x : x,
	  y : y,
	  field : self
	});
      }
      if(monster) {
	self.monsters.push(monster);
	cell.value=".";
      }
    }
    //$(self.el).html(html);
    if (!self.player) {
      self.player = new Monster({
	value : "@",
	type : "player",
	x : 2,
	y : 2,
	field : self
      });
    }

    self.player.bind("move",function() {
      this.moveMonsters();
    },self);

    self.fieldChanged(self.player.x,self.player.y,self.player);
  };
  this.removeMonster=function(monster) {
    self.monsters=_.without(self.monsters,monster);
  },
  this.moveMonsters=function() {
    _.each(self.monsters,function(monster) {
      if(monster==self.player)
	return;
      monster.monsterMove();
    });
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
