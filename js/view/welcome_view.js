function WelcomeView(ops) {
	var self = this;
	$.extend(this, ops);

	this.show = function() {
		$(self.el).css({opacity:0}).show("slow").animate({opacity:1},"slow");
		$("div", self.el).unbind("click");
		$("div", self.el).bind("click", function() {
			self.hide();
		});
	};
	this.hide = function() {
		$(self.el).animate({
			opacity : 0
		}, "slow", function() {
			$(self.el).hide();
		});
	};
}