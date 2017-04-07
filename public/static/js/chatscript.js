$(function(){
  var Message;
  var userDataEntered = false;
  var userData = {};
  var socket = io.connect();
  var display_users = false;
  var message_side = 'float-left';
  if(users.length != 0){
    for(var i = 0; i<users.length; i++){
      var temp = users[i];
      $('.users').append($('<li>').attr('class', 'list_username '+temp._id).html(temp.userName));
    }
  }
  // socket.on('connect', function(){
  //   socket.emit('join room', _id);
  // });
  $('.submitname').click(function(e){
    var str = $('.username_input').val();
    if(str.trim() === '') return;
    userDataEntered = true;
    userData['groupId'] = groupId ;
    userData['userName'] = str;
    $('.username_input').val('');
    socket.emit('add user', userData);
    //socket.emit('new message', userData.userName+' joined');
    $('.modal').css("display", "none");
  });
  $('.more_menu').click(function(){
    if(!display_users){
      $('.users').css('display', 'block');
    }
    else {
      $('.users').css('display', 'none');
    }
    display_users = !display_users;
    $('.users').toggleClass('.users_expanded').css('display', '');
  });

  var getMessageText;
    getMessageText = function(){
    var $message_input;
    $message_input = $('.message_input');
    return $message_input.val();
  };
  $(".send_message").click(function(e){
    var text = getMessageText();
    if(text.trim() === '' && userDataEntered){
      return;
    }
    $('.message_input').val('');
    var data = {};
    data['message'] = text;
    data['userName'] = userData.userName;
    message_side = 'float-right';
    socket.emit('new message', data) ;
  });
  socket.on('new message', function(data){
    console.log(message_side);
    $('.message_list').append($('<li>').attr('class', 'message '+message_side).append(
      $('<div>').attr('class', 'message_username').html(data.userName)
    ).append(
      $('<div>').attr('class', 'text_wrapper').html(data.message)));
      message_side = 'float-left';
  });
  socket.on('add new user', function(data){
    $('.users').append($('<li>').attr('class', 'list_username '+data._id).html(data.userName));
  });
  socket.on('remove user', function(data){
    $('.'+ data).remove();
  });
  socket.on('reconnect', function(){
    if(userData.userName){
      socket.emit('add user', userName);
    }
  });
  socket.on('disconnect', function(){
    var left_message = userData.userame + ' left the group';
    socket.emit('new message', left_message);
  });
});
