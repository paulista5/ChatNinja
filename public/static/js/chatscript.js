$(function(){
  var Message;
  var userData = {};
  var socket = io.connect();
  var display_users = false;
  var message_side = 'right';
  // socket.on('connect', function(){
  //   socket.emit('join room', _id);
  // });
  $('#myModal').modal('show');
  $('#name_submit').on('submit', function(e){
    var str = $('#name_entry').val();
    if(str.trim() === '') return;
    userData['groupId'] =  _id;
    userData['userName'] = str;
    //username = str;
    $('#name_entry').val('');
    socket.emit('add user', userData);
    socket.emit('new message', userData.userName+' joined');
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
   Message =  function(arg){
    this.text = arg.text;
    this.messageSide =  arg.message_side;
    this.userName = arg.userName;
    this.draw = function(_this){
      return function(){
        var $message;
        $message = $($('.message_template').clone().html());
        $message.addClass(_this.message_side).find('.text').html(_this.text);
        $message.find('.user_name').html(_this.userName);
        $('.messsage_list').append($message);
        return setTimeout(function(){
          return $message.addClass('appeared');
        }, 0);
      };
    }(this);
    return this;
  };
  var getMessageText, message_side, sendMessage;
  message_side = 'right';
  getMessageText = function(){
    var $message_input;
    $message_input = $('.message_input');
    return $message_input.val();
  };
  $(".send_message").click(function(e){
    var text = getMessageText();
    if(text.trim() === ''){
      return;
    }
    message_side = 'right';
    $('.message_input').val('');
    var data = {};
    data['message'] = text;
    data['userName'] = userData.userName;
    socket.emit('new message', data) ;
  });
  socket.on('new message', function(data){
    var $messages, message;
    $messages = $('.message_list');
    message = new Message({
      text: data.message,
      message_side: message_side,
      userName: data.userName
    });
    message.draw();
    message_side = 'left';
  });
  socket.on('add new user', function(data){
    $user_list = ('.users');
    $user = $($('.user_template').clone().html());
    $user.addClass(data._id).find('.name').html(data.userName);
    // $user.find('.avatar').html(data.userName.charAt(0));
    $user_list.append($user);
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
