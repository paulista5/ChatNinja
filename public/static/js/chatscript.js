var display_users = false;
var message_side = 'right';
$(function(){
  var Message;
  var userName='';
  var socket = io();
  $('#myModal').modal('show');
  $('#name_submit').on('submit', function(e){
    var str = $('#name_entry').val();
    username = str;
    $('#name_entry').val('');
    socket.emit('adduser', str);
  });
  $('.more_menu').click(function(){
    if(!display_users){
      $('.users').css('display', 'block');
    }
    else {
      $('.users').css('display', 'none');
    }
    display_users = !display_users;
    $('.users').toggleClass(.'users_expanded').css('display', '');
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
  socket.on('new message', function(text){
    var $messages, message;
    $messages = $('.message_list');
    message = new Message({
      text: data.message,
      message_side: message_side
      userName = data.userName;
    });
    if(message_side === 'left'){
      message_side = 'right';
    }
    message.draw();
  });
  $(".send_message").click(function(e){
    var text = getMessageText();
    if(text.trim() === ''){
      return;
    }
    message_side = 'left';
    $('.message_input').val('');
    var data = {
      messsage = text;
      userName = userName;
    }
    socket.emit('new message', data) ;
  });

  socket.on('reconnect', function(){
    if(userName){
      socket.emit('add user', userName);
    }
  });
  socket.on('disconnect', function(){

  })
});
