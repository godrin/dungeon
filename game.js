$(function() {

  function Cell() {
    this.value=".";
    var self=this;

    this.get=function() {
      if(self.monster){
	return self.monster.value;
      }
      return self.value;
    };
  }

  function Monster(ops) {
    $.extend(this,ops);
    var self=this;

    ops.field.field(self.x,self.y).monster=this;

    this.moveBy=function(by) {
      delete ops.field.field(self.x,self.y).monster;

      if(by.x) {
	self.x+=by.x;
      }
      if(by.y) {
	self.y+=by.y;
      }
      ops.field.field(self.x,self.y).monster=self;

    };
  }

  function FieldModel(ops) {
    this.w=16;
    this.h=16;
    $.extend(this,ops);
    var self=this;

    var fields=[];
    var monsters={};

    this.field=function(x,y) {

      return fields[x+y*self.w];
    };



    this.init=function() {
      for(var i=0;i<self.w*self.h;i++) {
	fields.push(new Cell());
      }
      //self.field(2,2).value="@";
      //
      self.player=monsters.player=new Monster({value:"@",type:"player",x:2,y:2,field:self});

    };

    this.eachField=function(callback) {
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
      return "<div class='cell' id='"+cell.x+"_"+cell.y+"'>"+cell.cell.get()+"</div>";
    }
  }

  function FieldView(ops) {
    this.el="#field";
    this.cellWidth=16;
    $.extend(this,ops);
    var self=this;

    this.init=function() {
      $(self.el).empty();

      model.eachField(function(cell) {
	var html=new CellView(cell).html();
	var e=$(html);
	e.css({left:cell.x*self.cellWidth,
	  top:cell.y*self.cellWidth});
	e.appendTo(self.el);
      });

    }

  }
  function Controller(ops) {
    this.keymap={104:{x:-1},
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
