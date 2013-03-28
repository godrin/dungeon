function PlayerView(ops) {
  var self = this;

  $.extend(this, ops);
  this.update = function() {
    var player = $(".player");

    var playerOffset=player.offset();
    var dx=playerOffset.left-$(window).width()/2;
    var dy=playerOffset.top-$(window).height()/2;
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

    var offset = playerCell.position();

    var tx = -offset.left + centerx;
    var ty = -offset.top + centery;
    field.stop(true, false);
    console.log("TXXXXXX",tx,ty);
    console.log("offleft: ",offset.left," ", tx);
    field.animate({
      left : tx,
      top : ty
    }, 300);
  };
  self.player.changed.add(self, self.update);
}
