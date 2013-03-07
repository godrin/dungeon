

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
	cell.opacity=0.1;
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