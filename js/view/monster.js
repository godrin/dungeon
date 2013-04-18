var MonsterView=Backbone.View.extend({
  tagname:"div",
  initialize:function() {
    this.model.bind("moved",this.move,this);
    this.model.bind("die",this.die,this);
    this.render();
  },
  die:function() {
    alert("DIE");
    this.$(".monster").removeClass(this.model.type).addClass("bones");
  },
  move:function() {
    this.$el.css({left:this.model.x,top:this.model.y});
  },
  render:function() {
    this.$el.html("<div class='monster "+this.model.type+"'></div>");
  }


});
