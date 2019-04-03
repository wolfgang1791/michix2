$(function(){

    var socket = io();
    
    $('#sub_final').on('click',function(){

        socket.emit('inicio',$('#usu').val(),$('#sala').val(),(data)=>{
            console.log(data);
            
            if( data.res == 'ok' ){
                temp = data.usuario; 
                $('#contenedor').html('');
                $('#contenedor').append(render());
                nombresdeusuario(data);
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