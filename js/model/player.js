var BasicMonster=Backbone.Model.extend({

  constructor:function(ops) {
    BasicMonster.__super__.constructor.apply(this,arguments);
    _.extend(this,ops);
    this.field.field(this.x, this.y).monster = this;
    this.set({xp:0,hp:10,gold:0});
    this.changed=Signal();
  },
  myCell:function() {
    return this.getCell(this);
  },
  getCell:function(pos) {
    return this.field.field(pos.x,pos.y);
  },
  pos:function() {
    return {x:this.x,y:this.y};
  },
  die:function() {
    console.log("DIE");
    this.field.removeMonster(this);
    this.myCell().monster=null;
    this.trigger("die");
  },
  changeBy:function(vals) {
    for(var name in vals) {
      console.log("CHANGE",name);
      console.log("beforeHP",this,this.get(name),vals[name]);
      var nvals={};
      nvals[name]=this.get(name)+vals[name];
      this.set(nvals);
      if(name=="hp") {
	console.log("afterHP",this,this.get(name),vals[name]);
	if(this.get("hp")<1) {
	  this.die();
	}
      }
    }
  },

  attackMonster:function(monster) {
    monster.changeBy({hp:-1});
  },

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
      var oldCell=this.myCell();
      var newCell=this.field.field(tx,ty);
      console.log("PoS OK");
      if (newCell.passable()) {
	console.log("PASSABlE",oldCell,self.x,self.y,tx,ty);
	oldCell.monster=null;
	var oldx = self.x, oldy = self.y;
	self.x = tx;
	self.y = ty;
	this.myCell().monster = self;
	//console.log(css);
	$.map(getRange(self.x, self.y), function(pos) {
	  var field = self.getCell(pos); //field.field(pos.x, pos.y);
	  if (field) {
	    field.changed();
	  }
	});
	self.changed();
      } else {
	var monster=this.field.field(tx,ty).monster;
	console.log("MONSTER",monster);
	if(monster) {
	  self.attackMonster(monster);
	} else {

	  console.log("Field not passable");
	}
      }
    }
    this.trigger("move");
  }
});

var Player=BasicMonster.extend({
  constructor:function(ops) {
    console.log("PLAYER init",this,ops,Player.__super__.constructor);
    Player.__super__.constructor.apply(this,arguments); 
    this.bind("move",this.moved,this);
  },
  moved:function() {
    var cell=this.myCell();
    var self=this;
    console.log("Moved to cell",cell);
    _.each(cell.items,function(item) {
      if(item.gold)
	self.set({gold:self.get("gold")+item.gold});
    });
    cell.items=[];
    cell.changed(); // trigger("change"); //  FIXME
    console.log("TRIGGER");
    this.trigger("change");
  }
});

var Monster=BasicMonster.extend({
  moveCounter:0,
  monsterMove:function() {
    this.moveCounter+=1;
    if(this.moveCounter>2) {
      var x=0,y=0,v=0;
      if(Math.random()<0.5) {
	v=-1;
      } else {
	v=1;
      }
      if(Math.random()<0.5) {
	x=v;
      } else {
	y=v;
      }
      this.moveBy({x:x,y:y});
      this.moveCounter=0;
    }
  }
});


