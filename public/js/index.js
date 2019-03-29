var socket = io();
var temp = '';
$(function () { 
    $('#sub').on('click',function(){

        socket.emit('inicio',$('#usu').val(),(data)=>{
            console.log('hey jude');
            
            if( data.res == 'ok' ){
                temp = data.usuario; 
                $('#contenedor').html('');
                $('#contenedor').append(render());
                nombresdeusuario(data.lista);
            }
            else if(data.res == 'ok2'){
                temp = data.usuario; 
                $('#contenedor').html('');
                $('#contenedor').append(render());
            }
        });
        $('#m').val('');
        return false;
    
    });
});