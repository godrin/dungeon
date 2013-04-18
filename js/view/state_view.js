var StateView=Backbone.View.extend({
  template:"#stateViewTemplate",
  initialize:function() {
    this.model.bind("change",this.render,this);
    this.render();
  },

  render:function() {
    var html=$(this.template).html();
    var m=this.model.toJSON();
    var rendered=Mustache.render(html,m);
    $("#stateView").html("kjshdf");
    $(this.el).html(rendered);
  }
});
