var WorldModel=Backbone.Model.extend({
  getLevel:function(pos) {
    var l=0;
    if(pos) {
      l=pos.z;     
    }


  }


});
