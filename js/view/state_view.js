function StateView(ops) {
	var self=this;
	$.extend(this,ops);
	
	if(!self.template) {
		self.template="#stateViewTemplate";
	}
	
	var template=$(self.template).html();
	
	self.view=function() {
		$(self.el).html(Mustache.render(template,self.model.gameState()));
	};
	
	self.model.changed.add(this,function() {
		self.view();
	});
	
}