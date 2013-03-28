var StateView=Backbone.View.extend({
  template:"#stateViewTemplate",
  initialize:function() {
    this.model.bind("change",this.render,this);
    this.render();
  },

  render:function() {
    console.log("THISSSS",this,this.template);
    var html=$(this.template).html();
    console.log("HTML",html);
    var m=this.model.toJSON();
    console.log("MMMM",m,this.model);
    var rendered=Mustache.render(html,m);
    console.log("RE",rendered,this.el);
    $("#stateView").html("kjshdf");
    $(this.el).html(rendered);
  }
});
