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

  var model = new FieldModel({
    field : field
  });

  model.init();
  var view = new FieldView({
    model : model
  });

  view.init();
  var camera = new Camera({
    player:model.player,
    cellWidth:128,
    field:model
  });

  var welcomeView = new WelcomeView({
    el : "#welcomeView"
  });
  var controller = new Controller({
    model : model,
    view : view,
    containerEl:"#field_container",
    welcomeView:welcomeView
  });
  var stateView = new StateView({
    el : "#stateView",
    model : model.player //#state
  });

  welcomeView.show();

  controller.init();
  setTimeout(function() {
    camera.update();
  }, 100);
});
