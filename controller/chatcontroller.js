var databaseConnection = require(path.join(__dirname,'..','database/databaseConnectionHelper.js'));
var updateUser = require(path.join(__dirname,'..','database/updateUser.js'));
var deleteUser = require(path.join(__dirname, '..', '/database/deleteUser.js'));
var getGroups = require(path.join(__dirname, '..', '/database/getGroups.js'))
module.exports = function(io, id){
  var userNames = {};
  var numUsers = 0;
  var addedUser = false;
  io.on('connection', function(socket){
    socket.on('add user', function(username){
      if(addedUser){
        return;
      }
      var position;
      updateUser(id, username, function(result){
        if(result != -1) position = result;
        else return;
      });
      socket.username = username;
      socket.room = id;
      socket.position = position;
      socket.join(id);
      addedUser = true;
      numUsers++;
      getGroups(function(response){
          io.sockets.in(socket.room).emit('update users', response);
      });
    });
    socket.on('new message', function(data){
      io.sockets.in(socket.room).emit('new message', data);
    });
    socket.on('disconnect', function(){
        if(addedUser){
          deleteUser(id, socket.position, function(response){
            if(response){
              numUsers--;
              getGroups(function(response){
                  io.sockets.in(socket.room).emit('update users', response);
              });
            }
          });
        }
    });
  });
}
