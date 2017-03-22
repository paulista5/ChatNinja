var path = require('path');
var databaseConnection = require(path.join(__dirname,'..','database/databaseConnectionHelper.js'));
var updateUser = require(path.join(__dirname,'..','database/updateUser.js'));
var deleteUser = require(path.join(__dirname, '..', '/database/deleteUser.js'));
var getUsersInGroup = require(path.join(__dirname, '..', '/database/getUsersInGroup.js'))
module.exports = function(io){
  var userNames = {};
  var numUsers = 0;
  var addedUser = false;
  var roomId;
  io.on('connection', function(socket){
    // socket.on('join room', function(_id){
    //   socket.join(_id);
    //   roomId = _id;
    // });
    socket.on('add user', function(userData){
      updateUser(userData.groupId, userData.userName, function(result){
        socket.username = userData.userName;
        socket.room = userData.groupId;
        socket.join(userData.groupId);
        socket.userId = result._id;
        io.sockets.in(socket.room).emit('add new user', result);
      });

      // getUsersInGroup(roomId, function(response){
      //     io.sockets.in(socket.room).emit('update users', response);
      // });
    });
    socket.on('new message', function(data){
      io.sockets.in(socket.room).emit('new message', data);
    });
    socket.on('disconnect', function(){
      console.log('disconnect called');
      deleteUser(socket.userId, function(response){
            if(response){
              io.sockets.in(socket.id).emit('remove user', socket.userId);
            }
          });
    });
  });
}
