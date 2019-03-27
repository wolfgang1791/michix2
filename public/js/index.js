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
            else if(data.res == 'ok2'){
                $('#contenedor').html('');
                $('#contenedor').append(render());
            }
        });
        $('#m').val('');
        return false;
    
    });
});