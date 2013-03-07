function PlayerView(ops) {
	var self = this;

	$.extend(this, ops);
	self.player.changed.add(self, function() {
		var player = $(".player");

		var playerCell = player.closest(".cell");
		var field_container = $("#field_container");

		var centerx = field_container.width() / 2 - player.width() / 2;
		var centery = field_container.height() / 2 - player.height() / 2;

		var field = $("#field");

		var offset = playerCell.position();

		var tx = -offset.left + centerx;
		var ty = -offset.top + centery;
		field.stop(true, false);
		field.animate({
			left : tx,
			top : ty
		},300);
	});
}