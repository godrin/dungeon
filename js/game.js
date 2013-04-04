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
    w : 32,
    h : 32
  });

  var state = new GameStateModel({health:100,exp:0,gold:0});

  var model = new FieldModel({

    field : field,
    state : state
  });

  model.init();
  var view = new FieldView({
    model : model,
    state : state
  });

  view.init();
/*
  var playerView = new PlayerView({
    player : model.player,
    cellWidth:128
  });
*/
  var camera = new Camera({
    player:model.player,
    cellWidth:128
  });

  var controller = new Controller({
    model : model,
    view : view,
    containerEl:"#field_container"
  });
  var stateView = new StateView({
    el : "#stateView",
    model : state
  });
  var welcomeView = new WelcomeView({
    el : "#welcomeView"
  });

  welcomeView.show();

  //  stateView.view();

  controller.init();
  // alert("X");
  setTimeout(function() {
    camera.update();
  }, 100);
});
