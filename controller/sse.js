
module.exports = function(req, res, next){
  res.sseSetup = function(){
    res.writeHead(200, {
      'Content-Type':'text/event-stream',
      'Cache-Control':'no-cache',
      'Connection':'keep-alive',
    })
  }
  res.sseSend = function(data){

    for( var i = 0; i < data.length - 1; i++){
        res.write("data: "+JSON.stringify(data[i]) + "\n");
    }
    res.write("data: "+JSON.stringify(data[i]) + "\n\n");
    res.end();
  }
  next();
}
