var turno = '';
var jugadores = [];
$(function () {
    c = console.log;

    var socket = io();


    socket.on('turno', function(data){
       
     
        jugadores = data.lista;
        turno = data.turno;
      

        $('#turno b').text(data.turno);
        $('#header').html('');
        $('#header').html(render_(data.lista));
    })

    // $('#contenedor').on('click','.cl div',function(){
    //     // c(usuario1+" "+usuario2);
    //                 // c(turno);
    //                 // c('Beethoven');
    //                 // c(jugadores);
    //                 c($(this).attr('class'));
    //                 c(socket.jugadores);
                    
    //             //     socket.emit('marcarTablero', 'por turno',$('#m').val(),(data)=>{
    //             //     console.log(data);
                    
    //             //         if (data.resultado != undefined || data.resultado != '') {
    //             //            $('#mensaje b').text(data.resultado);
    //             //         }
    //             //         else{
    //             //            $('#mensaje b').text('');
    //             //         }
    //             //     });
                
    //             // $('#m').val('');
    //             // return false;
          
    // });
   
    
    $('#contenedor').on('click','#michi',function(){
      
                    socket.emit('marcarTablero', temp,$('#m').val(),(data)=>{
                    console.log(data);
                    
                        if (data.resultado != undefined || data.resultado != '') {
                           $('#mensaje b').text(data.resultado);
                        }
                        else{
                           $('#mensaje b').text('');
                        }
                    });
                
                $('#m').val('');
                return false;
          
    });

   
    socket.on('movida',(data)=>{
           
        $(data.clase).html(data.figura);
       
        if (data.resultado != undefined && data.resultado != '') {
            alert(data.resultado);
        }
        

    });

});

var nombresdeusuario = (data) =>{
    $("#header").html('');
    $("#header").append(render_(data));
}


var render = () => {
    var jade = `<div id="turno">Turno: <span><b></b></span></div>
                <div id="mensaje"><span><b></b></span></div>
                <div class="fila">
                    <div class="c1 "></div>
                    <div class="c2 "></div>
                    <div class="c3 "></div>
                </div><br/>
                <div class="fila">
                    <div class="c4 "></div>
                    <div class="c5 "></div>
                    <div class="c6 "></div>
                </div><br/>
                <div class="fila">
                    <div class="c7 "></div>
                    <div class="c8 "></div>
                    <div class="c9 "></div>
                </div>
                <input hidden type="text" id="sala">
                <div id="fs">
                    <input id="m" autocomplete="off"/><button id="michi">Enviar</button>
                </div>`

    return jade;
}

var render_ = (data) => {
    let elotro = ``;
    if(data.length < 2){
        elotro = `<div>
                     <h2>No conectado</h2>
                     <h2>No definido</h2>
                  </div>`
    }
    else{
        elotro = `<div>
                     <h2>${data[1].user}</h2>
                     <h2>${data[1].arma}</h2>
                  </div>`
    }

    let header = `<link rel="stylesheet" href="/css/tablero.css"/>
                    <h1>${data[0].sala}</h1>
                    <div>
                    <h2>${data[0].user}</h2>
                    <h2>${data[0].arma}</h2>
                    ${elotro}
                    </div>`
    return header;
}
var id = () =>{
return Math.round(Math.random()*1);
}

var turno=(arr, turno) => {

    for (let index = 0; index < arr.length; index++) {
            
        if(arr[index].user == turno){

        }
        else{

        }
    }

}

