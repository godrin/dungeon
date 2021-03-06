function Cell() {
  this.value = ".";
  var self = this;
  this.opacity=0;
  this.items=[];

  this.get = function() {
    if (self.monster) {
      return self.monster.value;
    }
    return self.value;
  };
  this.passable = function() {
    var r = (self.value == "." || self.value == "<" || self.value == ">"
    || self.value == "+" || self.value == "$")
    && !this.monster;
    return r;
  };
  this.changed = Signal();
  this.changedOpacity = Signal();
}
