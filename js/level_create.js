function createLevel(ops) {
	var w = ops.w;
	var h = ops.h;
	var x, y;

	var res = [];
	var s = [];
	for (x = 0; x < w; x++)
		s = s.concat([ "#" ]);
	for (y = 0; y < h; y++)
		res.push([].concat(s));

	function getdata(cp) {
		if (cp.x >= 0 && cp.x < w && cp.y >= 0 && cp.y < h)
			return res[cp.y][cp.x];
	}
	function setdata(p, pv) {
		if (p.x >= 0 && p.x < w && p.y >= 0 && p.y < h)
			res[p.y][p.x] = pv;
	}

	function randomPos() {

		var sx = Math.round(Math.random() * (w - 3)) + 1;
		var sy = Math.round(Math.random() * (h - 3)) + 1;

		return {
			x : sx,
			y : sy
		};
	}

	function randomDirection() {
		var d = Math.random() < 0.5;
		var sign = Math.random() < 0.5;
		if (d)
			return {
				x : sign,
				y : 0
			};
		else
			return {
				x : 0,
				y : sign
			};
	}
	function randomModify(p) {
		var d = randomDirection();
		return {
			x : p.x + d.x,
			y : p.y + d.y
		};
	}

	var p, u, d;
	setdata(p = randomPos(), "@");
	setdata(d = randomPos(), "<");
	setdata(u = randomPos(), ">");

	var poss = [ p, d, u ];

	console.log("POSS", poss,p,d,u);
	var todo = 20;
	while (todo > 0) {
		var currentPos = poss.shift();
		var data = getdata(currentPos);
		console.log("DATA", data, currentPos);
		if (data == "#") {
			setdata(currentPos, ".");
			todo-=1;
		}
		poss.push(randomModify(currentPos));
		
	}

	return $.map(res, function(r) {
		return r.join("");
	});

}
