function GameStateModel(ops) {
	var self = this;
	$.extend(this, ops);
	var state = {
		health : 100,
		exp : 0,
		gold : 0
	};
	
	self.gameState = function() {
		return state;
	};
	
	self.changed=Signal();
}