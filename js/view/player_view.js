function Camera(ops) {
  var self = this;

  $.extend(this, ops);
  this.update = function() {
    var player = $(".player");

    var pos=self.player.pos();

    var dx=pos.x*self.cellWidth;
    var dy=pos.y*self.cellWidth;
    var dw=$(window).width()/4;
    var dh=$(window).height()/4;
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

var ElementView=Backbone.View.extend({

  initialize:function() {
    this.model.bind("move",this.update,this);
    this.model.bind("die",this.die,this);
  },
  render:function() {
    var klass=this.model.type;
    this.el=$("<div class='cell'><div class='monster "+klass+"'></div></div>");
    this.el.appendTo(this.options.parentEl);
    this.monsterEl=$(".monster",this.el);
    this.update();
  },
  update:function(){
    var pos=this.model.pos();
    var px=pos.x*this.options.cellWidth;
    var py=pos.y*this.options.cellWidth;

    this.el.animate({left:""+px+"px",top:""+py+"px"},"fast");

    this.monsterEl.removeClass("left");
    this.monsterEl.removeClass("right");
    if(this.model.direction) {
      this.monsterEl.addClass(this.model.direction);
    }
  },
  die:function() {
    this.monsterEl.removeClass(this.model.type).addClass("bones");
  }
});




