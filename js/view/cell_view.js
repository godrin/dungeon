

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
      self.innerel.css({opacity:self.cell.cell.opacity});
    }

    this.el=$(this.outer());
    //this.update();
    this.el.appendTo(this.pel);
    this.el=$("#"+self.cellId,this.pel);

    this.innerel=$(".cellinner",this.el);
    this.update();
    self.cell.cell.changed.add(this,function() {self.update();});
  }
