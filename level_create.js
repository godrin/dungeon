function createLevel(ops) {
  var w=ops.w;
  var h=ops.h;
  var x,y;

  var res=[];
  var s=[];
  for(x=0;x<w;x++)
    s=s.concat(["#"]);
  for(y=0;y<h;y++)
    res.push([].concat(s));

  function p(p,pv) {
    res[p.y][p.x]=pv;
  }

  function randomPos() {

    var sx=Math.round(Math.random()*(w-3))+1;
    var sy=Math.round(Math.random()*(h-3))+1;

    return {x:sx,y:sy};
  }

  p(randomPos(),"@");
  p(randomPos(),"<");
  p(randomPos(),">");

  return $.map(res,function(r){return r.join("");});

}
