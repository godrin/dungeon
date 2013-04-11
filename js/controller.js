function Controller(ops) {

  this.keymap = {
    38 : {
      y : -1
    },
    40 : {
      y : 1
    },
    39 : {
      x : 1
    },
    37 : {
      x : -1
    },
    72 : {
      x : -1
    },
    76 : {
      x : 1
    },
    74 : {
      y : 1
    },
    75 : {
      y : -1
    },
    89 : {
      x : -1,
      y : -1
    },
    90 : {
      x : -1,
      y : -1
    },
    66 : {
      x : -1,
      y : 1
    },
    78 : {
      x : 1,
      y : 1
    },
    85 : {
      x : 1,
      y : -1
    },
    60 : {
      z : 1
    },
    62 : {
      z : -1
    }
  };

  $.extend(this, ops);
  var self = this;

  this.move=function(by) {
    if(self.welcomeView.visible()) {
      self.welcomeView.hide();
    }
    else
      self.model.player.moveBy(by);
  }

  this.init = function() {
    $(window).bind("keydown", function(ev) {
      console.log("EV", ev, ev.keyCode);

      var by = self.keymap[ev.keyCode];
      if (by) {
	self.move(by);
	// self.view.init();
      }
    });

    $(self.containerEl).unbind("click");
    $(self.containerEl).bind(
      "click",
      function(e) {
	var dx = e.pageX - $(self.containerEl).offset().left
	- $(self.containerEl).width()/2;
	var dy = e.pageY - $(self.containerEl).offset().top
	- $(self.containerEl).height()/2;
	var dx2 = dx * dx;
	var dy2 = dy * dy;
	if (dx2 + dy2 > 2000) {
	  if (dx2 > dy2 + 400) {
	    self.move({
	      y : 0,
	      x : (dx < 0 ? -1 : 1)
	    });
	  }
	  if(dy2 > dx2 + 400) {
	    self.move({
	      x : 0,
	      y : (dy < 0 ? -1 : 1)
	    });
	  }
	  console.log(dx, dy, dx / dy);
	}
      });

  };

}
