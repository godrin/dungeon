function Camera(ops) {
  var self = this;

  $.extend(this, ops);
  this.update = function() {
    var player = $(".player");

    var pos=self.player.pos();

    console.log("POS",pos);

    var dx=pos.x*self.cellWidth;
    var dy=pos.y*self.cellWidth;
    var dw=$(window).width()/4;
    var dh=$(window).height()/4;
    console.log("DDD",dx,dy,dw,dh);
    if(dx*dx<dw*dw && dy*dy<dh*dh)
      return;

    var playerCell = player.closest(".cell");
    var field_container = $("#field_container");

    var centerx = field_container.width() / 2 - player.width() / 2;
    var centery = field_container.height() / 2 - player.height() / 2;

    var field = $("#field");

    var tx = -dx + centerx;
    var ty = -dy + centery;
    field.stop(true, false);
    console.log("TXXXXXX",tx,ty);
    field.animate({
      left : tx,
      top : ty
    }, 300);

    $.map(getRange(pos.x, pos.y, 5, 5), function(cpos) {
      var f = self.field.field(cpos.x, cpos.y);
      if (f) {
	var cdx = (pos.x - cpos.x), cdy = (pos.y - cpos.y);
	var op = 1.6 - Math.sqrt(cdx * cdx + cdy * cdy) / 3;
	if (op > 1)
	  op = 1;
	if (op < 0)
	  op = 0;
	if (op > f.opacity)
	  f.opacity = op;
	f.changedOpacity();
      }
    });

  };
  self.player.changed.add(self, self.update);
}

function ElementView(ops) {
  var self=this;
  $.extend(this,ops);

  var klass=this.monster.type;

  var el=$("<div class='cell'><div class='monster "+klass+"'></div></div>");
  el.appendTo(this.parentEl);
  var monsterEl=$(".monster",el);

  self.update=function(){
    var pos=self.monster.pos();
    var px=pos.x*self.cellWidth;
    var py=pos.y*self.cellWidth;

    el.animate({left:""+px+"px",top:""+py+"px"},"fast");

    monsterEl.removeClass("left");
    monsterEl.removeClass("right");
    if(self.monster.direction) {
      monsterEl.addClass(self.monster.direction);
    }
  };

  self.update();

  self.monster.changed.add(self,self.update);
}




