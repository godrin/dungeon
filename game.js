$(function() {

  function MakeConsole(ops) {
    $.extend(this,ops);
    var self=this;
    this.log=function(t) {
      $(self.el).append("<p>"+t+"</p>");
    };
  };

  var Console=new MakeConsole({el:"#console"});

  function Signal() {
    var listeners=[];

    var f= function() {
      var as=arguments;
      $.map(listeners,function(l) {
	l.fct.apply(l.obj,as);
      });
    };


    f.add=function(obj,fct) {
      listeners.push({obj:obj,fct:fct});
    };
    f.remove=function(obj) {
      listeners=$.grep(listeners,function(l) { return l.obj!=obj;});
    };
    return f;
  };

  function Cell() {
    this.value=".";
    var self=this;

    this.get=function() {
      if(self.monster){
	return self.monster.value;
      }
      return self.value;
    };
    this.passable=function() {
      var r= (self.value=="." || self.value=="<" || self.value==">") && !this.monster;
      return r;
    };
    this.changed=Signal();
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
      console.log("TXY",tx,ty);
      if(ops.field.posOk(tx,ty)) {
	console.log("PoS OK");
	if(ops.field.field(tx,ty).passable()) {
	  console.log("PASSABlE");
	  delete ops.field.field(self.x,self.y).monster;
	  ops.field.field(self.x,self.y).changed();

	  self.x=tx;
	  self.y=ty;
	  ops.field.field(self.x,self.y).monster=self;
	  ops.field.field(self.x,self.y).changed();

	} else {
	  Console.log("Field not passable");
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
      if(ops.field && ops.field.length>0) {
	this.h=ops.field.length;
	this.w=ops.field[0].length;
      }



      for(var i=0;i<self.w*self.h;i++) {
	var cell=new Cell();
	var x=i%self.w;
	var y=Math.floor(i/self.w);
	var v=ops.field[y][x];
	if(self.field) {
	  if(v=="@") {
	    // self.player=monsters.player=new Monster({value:"@",type:"player",x:x,y:y,field:self});
	  }else

	    cell.value=v;
	} else if(x==0 || x==self.w-1 || y==0 || y==self.h-1)
	  cell.value="#";
	fields.push(cell);
	if(v=="@")
	 self.player=monsters.player=new Monster({value:"@",type:"player",x:x,y:y,field:self});

      }
      if(!self.player)
	self.player=monsters.player=new Monster({value:"@",type:"player",x:2,y:2,field:self});

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

  function CellView(ops) {
    $.extend(this,ops);
    var self=this;
    var _classes={".":"pass","#":"wall","@":"player"};
    this.cellId=""+self.cell.x+"_"+self.cell.y;
    this.outer=function() {
      var h="<div class='cell' id='"+self.cellId+"'><div class='cellinner'></div></div>";
      return h;
    };
    this.classFor=function(chr) {
      return _classes[chr];
    };

    this.inner=function() {
      var h="<div class='bg'><div class='"+self.classFor(self.cell.cell.value)+"'></div></div>";
      if(self.cell.cell.monster)
	h+="<div class='monster' id='monster_"+self.cell.x+"_"+self.cell.y+"'><div class='"+self.classFor(self.cell.cell.monster.value)+"'></div></div>";
      return h;
    };

    this.update=function() {
      self.innerel.html(self.inner());
    }

    this.el=$(this.outer());
    //this.update();
    this.el.appendTo(this.pel);
    this.el=$("#"+self.cellId,this.pel);

    this.innerel=$(".cellinner",this.el);
    this.update();
    self.cell.cell.changed.add(this,function() {self.update();});
  }

  function FieldView(ops) {
    this.el="#field";
    this.cellWidth=60;
    $.extend(this,ops);
    var self=this;

    this.init=function() {
      $(self.el).empty();

      model.eachCell(function(cell) {
	var cell=new CellView({cell:cell,pel:self.el});
	var x=cell.cell.x*self.cellWidth,
	y=cell.cell.y*self.cellWidth;
      cell.el.css({left:x,
	top:y});
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
	  //	  self.view.init();
	}
      });
    };

  }


  var model=new FieldModel({
    field:[
    "#####################",
      "#......##...........#",
      "#@####....########..#",
      "###..########.......#",
      "#..............######",
      "#....######..########",
      "####......####......#",
      "#.#######.......###.#",
      "#.#####...#######...#",
      "#.###...#######...###",
      "#.....#####.........#",
      "########....#########",
      "#...........#########",
      "#<###################"
    ]
  }); //{w:64,h:32});
  model.init();
  var view=new FieldView({model:model});

  view.init();

  var controller=new Controller({model:model,view:view});
  controller.init();
});
