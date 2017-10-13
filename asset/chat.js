$(function () {
    $(".panel-chat .panel-heading").click(function(){
        var $this = $(this);
        if (!$this.hasClass('panel-collapsed')) {
            $(".panel-chat").animate({height:"50px"});
            $this.parents('.panel').find('.panel-body,.panel-footer').slideUp();
            $this.addClass('panel-collapsed');
        } else {
            $(".panel-chat").animate({height:"100%"});
            $this.parents('.panel').find('.panel-body,.panel-footer').slideDown();
            $this.removeClass('panel-collapsed');
            $(".panel-chat .panel-body").animate({ scrollTop: $(".panel-chat .panel-body").prop("scrollHeight")},0);
        }
    });
    
    $(".panel-chat .panel-body").scroll(function() {
        if($(this).scrollTop()+$(this).outerHeight() == $(this).prop("scrollHeight")){
            $(".panel-chat .notify-num").data("num",0);
            $(".panel-chat .notify-num").text(0);
            $(".panel-chat .notify-num").fadeOut(300);
            $('.panel-chat .chat-message.new .chat-new').fadeOut(500);
            setTimeout(function(){$('.panel-chat .chat-message.new').toggleClass('new');},500);
        }
    });
    
    var socket = io("http://gina.vn/tbk");
    $('.frmchat').submit(function(){
        var m = $(this).find(".m");
        var room_id = $(this).find(".room_id");
        if(m.val().trim()=="")
            return false;
        var data = {
            user_name_jp:$('#user_name_jp').val(),
            room_id:room_id.val(),
            mess_txt:m.val()
        };
        socket.emit('chat', data);
        createChatMessage(data.mess_txt,data.user_name_jp,"",moment(),room_id.val());
        scrollToBottom();
        m.val('').focus();
        return false;
    });
    
    /*$('#frmlogin').submit(function(){
        $.ajax({
            url: "http://localhost:3000/login/tanthanh@gmail.com/123456",
            data: {},
            success: function(){
                
            },
            //credentials: 'same-origin',
            credentials: 'include'
          });
        return false;
    });*/
    
    //handle typing user
    $('.frmchat .m').focus(function(){
        var frm = $(this).parents(".frmchat");
        var m = frm.find(".m");
        var room_id = frm.find(".room_id");
        if(m.val().trim()=="")
            return false;
        var data = {
            user_name_jp:$('#user_name_jp').val(),
            room_id:room_id.val(),
            mess_txt:m.val()
        };
        socket.emit('typing',data);
    });
    
    $('.frmchat .m').keypress(function(e){
        var frm = $(this).parents(".frmchat");
        var m = frm.find(".m");
        var room_id = frm.find(".room_id");
        
        var data = {
            user_name_jp:$('#user_name_jp').val(),
            room_id:room_id.val(),
            mess_txt:m.val()
        };
        
        if(m.val().trim()!="")
            return;
        else{
            socket.emit('untyping',data);
        }
        
        if(String.fromCharCode(event.which).trim()!=""){
            socket.emit('typing',data);
        }
    });
    
    $('.frmchat .m').focusout(function(){
        var frm = $(this).parents(".frmchat");
        var m = frm.find(".m");
        var room_id = frm.find(".room_id");
        var data = {
            user_name_jp:$('#user_name_jp').val(),
            room_id:room_id.val(),
            mess_txt:m.val()
        };
        socket.emit('untyping',data);
    });
    
    //shift + enter -> new line
    $(".frmchat .m").keydown(function(e){
        if(e.keyCode==13){
            if(e.shiftKey){
            }else{
                e.preventDefault();
                $(this.form).submit();
            }
        }
    });
    
    
    socket.on('connect', function(){
        var data = {
            user_token:$("#user_token").val()
        };
        socket.emit('load', data);
    });
    
    socket.on('chat', function(data){
        createChatMessage(data.mess_txt,data.user_name_jp,"",moment(),data.room_id);
        scrollToBottom();
    });

    socket.on('load', function(data){
        $('.panel-chat .panel-body').html("");
        $.each(data,function(index,value){
            createChatMessage(value.mess_txt,value.user_name_jp,"",moment(value.modified),value.room_id);
        });
        scrollToBottom();
    });
    
    socket.on('typing', function(data){
        if($(".panel-chat .panel-body").scrollTop()+$(".panel-chat .panel-body").outerHeight() == $(".panel-chat .panel-body").prop("scrollHeight"))
            isScroll = true;
        
        if(data.user_name_jp!=$('#user_name_jp').val()){
            $('.panel-chat .panel-body').last().append('<p class="chat-typing">'+ data.user_name_jp +' is typeing...</p>');
            scrollToBottom();
        }
    });
    
    socket.on('untyping', function(data){
        $('.panel-chat .panel-body .chat-typing').remove();
        scrollToBottom();
    });
    
});

var isScroll = true;

function scrollToBottom(){
    if(isScroll)
        $(".panel-chat .panel-body").animate({ scrollTop: $(".panel-chat .panel-body").prop("scrollHeight")},0);
    isScroll = false;
}
/*var messageTimeSent = $(".timesent");

// Update the relative time stamps on the chat messages every minute
setInterval(function(){
    messageTimeSent.each(function(){
        var each = moment($(this).data('time'));
        $(this).text(each.fromNow());
    });
},60000);*/

function createChatMessage(msg,user,imgg,now,room_id){
    //msg = msg.replace("\n","<br/>");
    msg = msg.replace(/(?:\r\n|\r|\n)/g, '<br />');
    $('.panel-chat .panel-body .chat-typing').remove();
    var who = 'ot';

    if(user==$('#user_name_jp').val()) {
            who = 'me';
    }
    
    if($(".panel-chat .panel-body").scrollTop()+$(".panel-chat .panel-body").outerHeight() == $(".panel-chat .panel-body").prop("scrollHeight"))
        isScroll = true;
    
    if(who!="me" && !isScroll){
        //notify
        var num = parseInt($(".panel-chat .notify-num").data("num"));
        num++;
        $(".panel-chat .notify-num").data("num",num);
        $(".panel-chat .notify-num").text(num);
        $(".panel-chat .notify-num").fadeIn(300);
        who = "new";
    }
    
    var li = $(".chat-message").last();
    var last_time = li.find(".msg time").data("time");
    var now_time = now.format('YYYY/MM/DD H:mm');
    
    if(li.length==0){
        var li = $(
                '<div class="chat-message ' + who + '">\n\
                    <div class="col-xs-2 pd0 chat-user">\n\
                        <img style="width: 100%" src="//www.gravatar.com/avatar/e56fc008cae66dae40dfcba64e153d3e?s=140&r=x&d=mm" alt="image" class="img-circle">\n\
                    </div>\n\
                    <div class="col-xs-10 pd5 chat-content">\n\
                        <p><b></b>&nbsp;</p>\n\
                        <p class="msg">'+msg+'<time data-time="' + now_time + '">' + now.format("H:mm") + '</time></p>\n\
                    </div>\n\
                    <span class="chat-new"></span>\n\
                </div>');

        // use the 'text' method to escape malicious user input
        li.find('b').text(user);
        $('.panel-chat .panel-body').append(li);
        return;
    }
    
    if(li.hasClass("me") && user==$('#user_name_jp').val()&&last_time == now_time){
        li.find('.chat-content').append('<p class="msg">'+msg+'<time data-time="' + now_time + '">' + now.format("H:mm") + '</time></p>');
    }else{
        var _user = li.find('b').text();
        if(_user==user&&last_time == now_time){
            li.find('.chat-content').append('<p class="msg">'+msg+'<time data-time="' + now_time + '">' + now.format("H:mm") + '</time></p>');
            if(who=="new"){
                li.addClass('new');
                li.find('.chat-new').fadeIn(500);
            }
        }else{
            var li = $(
                    '<div class="chat-message ' + who + '">\n\
                        <div class="col-xs-2 pd0 chat-user">\n\
                            <img style="width: 100%" src="//www.gravatar.com/avatar/e56fc008cae66dae40dfcba64e153d3e?s=140&r=x&d=mm" alt="image" class="img-circle">\n\
                        </div>\n\
                        <div class="col-xs-10 pd5 chat-content">\n\
                            <p><b></b>&nbsp;</p>\n\
                            <p class="msg">'+msg+'<time data-time="' + now_time + '">' + now.format("H:mm") + '</time></p>\n\
                        </div>\n\
                        <span class="chat-new"></span>\n\
                    </div>');

            // use the 'text' method to escape malicious user input
            li.find('b').text(user);
            $('.panel-chat .panel-body').append(li);
        }
    }
}