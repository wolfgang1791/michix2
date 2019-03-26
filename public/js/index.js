var socket = io();

$(function () { 
    $('#sub').on('click',function(){

        socket.emit('inicio',$('#usu').val(),(data)=>{
            console.log('hey jude');
            
            if( data.res == 'ok' ){
                // $("#header").html('');
                // $("#header").append(render_(jugadores));
                $('#contenedor').html('');
                $('#contenedor').append(render());
                nombresdeusuario(data.lista);
            }
        });
        $('#m').val('');
        return false;
    
    });
});