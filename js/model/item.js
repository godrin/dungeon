var Item=Backbone.Model.extend({
  constructor:function(ops) {
    Item.__super__.constructor(ops);
    _.extend(this,ops);
  }
});
