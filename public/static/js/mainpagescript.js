$(function(){
  var itemcount = 0;
  $('.startGroupChat').on('submit', function(){
    var groupName = $('.groupName').val();
    var topic = $('.topicName').val();
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
      var groupNames = e.data.split('\n');
      if(itemcount!=groupNames.length){
        $('.available_groups').empty();
        itemcount = groupNames.length;
        for(var i=0; i < itemcount; i++){
          var temp = JSON.parse(groupNames[i]);
          $('.available_groups').append($('<li>').attr('class', 'list_groupName').append(
          $('<a>').attr('href', '/ch/'+temp._id)
          .append($('<span>').html('Group Name: '+ temp.groupName))
          .append($('<span>').html('Topic of discussion: '+temp.discussionTopic))
        .append($('<span>').html('Users '+temp.numberOfUsers))));
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
