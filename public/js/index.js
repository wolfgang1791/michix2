var socket = io();

$(function () { 
    $('#sub').on('click',function(){

        socket.emit('inicio',$('#usu').val(),$('#sal').val());
        $('#m').val('');
        return false;
    
    });
});