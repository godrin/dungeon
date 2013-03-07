  function MakeConsole(ops) {
    $.extend(this,ops);
    var self=this;
    this.log=function(t) {
      $(self.el).append("<p>"+t+"</p>");
    };
  };

  var Console=new MakeConsole({el:"#console"});

  function Signal() {
    var listeners=[];

    var f= function() {
      var as=arguments;
      $.map(listeners,function(l) {
	l.fct.apply(l.obj,as);
      });
    };


    f.add=function(obj,fct) {
      listeners.push({obj:obj,fct:fct});
    };
    f.remove=function(obj) {
      listeners=$.grep(listeners,function(l) { return l.obj!=obj;});
    };
    return f;
  };