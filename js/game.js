$(function() {

	var model = new FieldModel({
		field : [ //
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
		"#<###################" ]
	}); // {w:64,h:32});
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
	controller.init();
	// alert("X");
	setTimeout(function() {
		playerView.update();
	}, 100);
});
