var canal = '';
var flag = false;
$(function () {
    c = console.log;

    var socket = io();

   
    jugadores = [];

    
    contador = 1;
   
    final = [];


    socket.on('turno', function(data){
        c('usuario '+data.usuario);
        c('turno '+data.turno);
        c(data.lista);
        socket.jugador = data.turno;
        c('socket '+ socket.jugador);
        $('#turno b').text(data.turno);
      
    })


    
    $('#contenedor').on('click','#michi',function(){
       
       if(socket)
            socket.emit('marcarTablero', 'por turno',$('#m').val(),(data)=>{
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
        console.log('hola');
        console.log(data);
        
        
        $(data.clase).html(data.figura);

        c(socket.jugador + " movida")
       
        if (data.resultado != undefined && data.resultado != '') {
            alert(data.resultado);
        }
        

    });



//     c(flag);
      
//    if(flag){
//     c(canal);
//         socket.on(canal, function(msg,jugadores,user){
//             c(canal);
//             c('usuario: '+user);

//                 principal(msg);
            
//         });
//    }
});

var nombresdeusuario = (data) =>{
    $("#header").html('');
    $("#header").append(render_(data));
}


// var turno_ = (user) => {
// var temp = '';
// var index = -1;
// for (let i = 0; i < jugadores.length; i++) {
        
//         if(user == jugadores[i].user){c('loca '+ (user == jugadores[i].user))
//             index = i;
//         }
//     c("i "+i);
//     }  
    
//     if( index == 0){
//         temp = jugadores[1].user;
//     }
//     else if( index == 1){
//         temp = jugadores[0].user;
//     }
            
//     return temp;
// }


var render = () => {
    var jade = `<div id="turno">Turno: <span><b></b></span></div>
                <div id="mensaje"><span><b></b></span></div>
                <div class="fila">
                    <div class="c1"></div>
                    <div class="c2"></div>
                    <div class="c3"></div>
                </div><br/>
                <div class="fila">
                    <div class="c4"></div>
                    <div class="c5"></div>
                    <div class="c6"></div>
                </div><br/>
                <div class="fila">
                    <div class="c7"></div>
                    <div class="c8"></div>
                    <div class="c9"></div>
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


