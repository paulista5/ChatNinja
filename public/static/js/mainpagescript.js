$(function(){
  var itemcount = 0;
  $('.startGroupChat').on('submit', function(){
    var groupName = $('.groupName').val();
    var topic = $('.topicName').val();
    $('.groupName').val('');
    $('.topicName').val('');
    if(groupName.trim() === '' || topic.trim() === ''){
      return;
    }
    var groupItem = {};
    groupItem['groupName'] = groupName;
    groupItem['discussionTopic'] = topic;
    $.ajax({
      type: "POST",
      url:'/',
      data: groupItem,
      success: function(data){
        location.reload();
      }
    });
    return false;
  });

  if(!!window.EventSource){
    var source = new EventSource('/stream');
    source.addEventListener('message', function(e){
      console.log(e.data);

      if(e.data != 'undefined'){
        var groupNames = e.data.split('\n');
        $('.available_groups').empty();
        //console.log(itemcount);
        $('.available_groups').empty();
        for(var i=0; i < groupNames.length; i++){
          //console.log(groupNames[i]);
          var temp = JSON.parse(groupNames[i]);
          $('.available_groups').append($('<li>').attr('class', 'list_groupName').append(
          $('<a>').attr('href', '/ch/'+temp._id)
          .append($('<div>').attr('class','spanleft').html('Group Name : '+ temp.groupName))
          .append($('<div>').attr('class','spanmiddle').html('Topic of discussion : '+temp.discussionTopic))
        .append($('<div>').attr('class','spanright').html('Users : '+temp.numberOfUsers))));
        }
      }
    });
    source.addEventListener('error', function(e){
      if(e.target.readyState == EventSource.CLOSED){
        console.log('Disconnected');
      }
      else if(e.target.readyState == EventSource.CONNECTING){
        console.log('Connecting');
      }
    }, false);
  }
  else {
    console.log('Browser does not support SSE');
  }
});
