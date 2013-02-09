$(function() {

  function Cell() {
    this.value="<div id='pass'></div>";
    var self=this;

    this.get=function() {
      if(self.monster){
	return self.monster.value;
      }
      return self.value;
    };
    this.passable=function() {
      var r= self.value=="." && !this.monster;
      return r;
    };
  }

  function Monster(ops) {
    $.extend(this,ops);
    var self=this;

    ops.field.field(self.x,self.y).monster=this;

    this.moveBy=function(by) {

      var tx=self.x;
      var ty=self.y;
      if(by.x)
	tx+=by.x;
      if(by.y)
	ty+=by.y;
      if(ops.field.posOk(tx,ty)) {
	if(ops.field.field(tx,ty).passable()) {
	  delete ops.field.field(self.x,self.y).monster;

	  self.x=tx;
	  self.y=ty;
	  ops.field.field(self.x,self.y).monster=self;
	}
      }
    };
  }

  function FieldModel(ops) {
    this.w=16;
    this.h=16;
    $.extend(this,ops);
    var self=this;

    var fields=[];
    var monsters={};
    this.posOk=function(x,y) {
      return x>=0 && x<self.w && y>=0 && y<self.h;
    };

    this.field=function(x,y) {
      return fields[x+y*self.w];
    };

    this.init=function() {
      for(var i=0;i<self.w*self.h;i++) {
	var cell=new Cell();
	var x=i%self.w;
	var y=Math.floor(i/self.w);
	if(x==0 || x==self.w-1 || y==0 || y==self.h-1)
	  cell.value="<div id='wall'></div>";
	fields.push(cell);
      }
      self.player=monsters.player=new Monster({value:"<div id='player'></div>",type:"player",x:2,y:2,field:self});

    };

    this.eachCell=function(callback) {
      var x,y;
      for(x=0;x<self.w;x++) {
	for(y=0;y<self.h;y++) {
	  callback({x:x,y:y,cell:fields[x+y*self.w]});
	}
      }
    };
  }

  function CellView(cell) {
    this.html=function() {
      var h="<div class='cell' id='"+cell.x+"_"+cell.y+"'>"+cell.cell.value+"</div>";
      if(cell.cell.monster)
	h+="<div class='cell monster' id='monster_"+cell.x+"_"+cell.y+"'>"+cell.cell.monster.value+"</div>";
      return h;
    }
  }

  function FieldView(ops) {
    this.el="#field";
    this.cellWidth=16;
    $.extend(this,ops);
    var self=this;

    this.init=function() {
      $(self.el).empty();

      model.eachCell(function(cell) {
	var html=new CellView(cell).html();
	var e=$(html);
	e.css({left:cell.x*self.cellWidth,
	  top:cell.y*self.cellWidth});
	e.appendTo(self.el);
      });

    }

  }
  function Controller(ops) {
    this.keymap={
      104:{x:-1},
      108:{x:1},
      106:{y:1},
      107:{y:-1},
      121:{x:-1,y:-1},
      122:{x:-1,y:-1},
      98:{x:-1,y:1},
      110:{x:1,y:1},
      117:{x:1,y:-1},
      60:{z:1},
      62:{z:-1}
    };

    $.extend(this,ops);
    var self=this;


    this.init=function() {
      $(window).bind("keypress",function(ev) {
	console.log("EV",ev);

	var by=self.keymap[ev.keyCode];
	if(by) {
	  self.model.player.moveBy(by);
	  self.view.init();
	}
      });
    };

  }


  var model=new FieldModel();
  model.init();
  var view=new FieldView({model:model});

  view.init();

  var controller=new Controller({model:model,view:view});
  controller.init();
});
