$(function() {
	var field = [ //
	"#####################", //
	"#......##...........#", //
	"#.####....########..#", //
	"###..########.......#", //
	"#..............######", //
	"#....######..########", //
	"####......####......#", //
	"#.#######.......###.#", //
	"#.#####...#######...#", //
	"#.###...#######...###", //
	"#.....#####.........#", // 
	"########....#########", //
	"#@..........#########", //
	"#<###################" ];

	field = createLevel({
		w : 64,
		h : 64
	});

	var state = new GameStateModel();

	var model = new FieldModel({

		field : field,
		state : state
	});

	model.init();
	var view = new FieldView({
		model : model
	});

	view.init();

	var playerView = new PlayerView({
		player : model.player
	});

	var controller = new Controller({
		model : model,
		view : view
	});
	var stateView = new StateView({
		el : "#stateView",
		model : state
	});
	
	stateView.view();

	controller.init();
	// alert("X");
	setTimeout(function() {
		playerView.update();
	}, 100);
});
