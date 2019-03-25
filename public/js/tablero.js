var canal = '';
$(function () {
    c = console.log;

    var socket = io();

   
    jugadores = [];

    
    contador = 1;
    casillas = [1,1,1,1,1,1,1,1,1];
    final = [];

    //- let hash = $('#indice').val().split('-');
    //- let indice = -1;

   
    //-     if(contador == 1)
    //-     {   

    //-         indice = id();

    //-         if(indice == parseInt(hash[0]))
    //-         {  
    //-             c(indice);
    //-             turno = hash[1];
    //-             $('#turno').text(turno);
    //-             contador++;
    //-         }
        
    //-     }
    //-     else{

    //-         if(indice == 0)
    //-         {

    //-         }
    //-         else if(turno == jugadores[1]){
    //-             turno = jugadores[0];
    //-         }
    //-         $('#turno').text(turno);    
    //-         //- turno = turno_();
    //-     }
    

    

   
    
    
    //- c(usuario);
    socket.on('inicio', function(usuario,jugadores){
        c(usuario);
        c(jugadores);
        $('#x').attr('value',jugadores[0].sala);
        $("#header").html('');
        $("#header").append(render_(jugadores));
        $('#contenedor').html('');
        $('#contenedor').append(render());
        // $('#sala').attr('value',jugadores[0].sala)
        // canal = jugadores[0].sala;
    })

    // canal = $('#sala').val();
    
    $('#contenedor').on('click','#michi',function(e){
        canal = $('#x').val();c(canal + " " +$('#m').val());
        socket.emit(canal, 'por turno',$('#m').val());
        $('#m').val('');
        return false;
    });


    c(canal);
    // canal = $("#x").val();
    c(canal);
    socket.on('sala', function(msg,jugadores,user){
        c(canal);
        c('usuario: '+user);

   
            principal(msg);
        //- }
        //- else{
            //- alert('No es el turno');
        //- }
        //- if(contador == 1){
        //-     principal(msg);

        //-     turno = turno_(jugadores,user);

        //-     c('turno: '+turno);
        //-     c('jugadores: '+jugadores[0]+" "+jugadores[1])
        //-     contador++;
        //-     c('contador '+contador);
        //- }
        //- else{
            
        //-     c('usuario: '+usuario+" turno: "+turno);
        //-     if( usuario == turno){
                
        //-         principal(msg);
        //-         turno = turno_(jugadores,user);
                
        //-         c('turno: '+turno);

        //-     }
        //-     else{
        //-         alert('No es el turno');
        //-     }
        //- }
        
    });
});

var principal = (msg) =>{
        
        var tokens = msg.match(/[xo]-([1-9]{1}$)/g);
        
        
        c(tokens);

        if(tokens != null)
         {   
            tokens = tokens[0].split('-');
            imagen = `/img/`;
                
                if(tokens[0] == 'x'){
                        imagen = imagen+'equis.png';
                }
                else if(tokens[0] == 'o'){
                    imagen = imagen+'circulo.png';
                }
                
                if(casillas[tokens[1]-1] != 0){
                    var clase = `.c${tokens[1]}`;
                    var figura = `<img src=${imagen} class="figura">`;
                    casillas[tokens[1]-1] = 0;
                }
                else{
                    alert('Casilla Ocupada')
                }
                $(clase).html(figura);
                $(clase).attr('val',tokens[0]);
                

                fin = false;
                for(let i=0; i<casillas.length; i++){
                    
                    if(casillas[i] == 0){
                        final[i]=$(`.c${i+1}`).attr('val');
                    }

                }

                fin =  comprobacion(casillas);    

                console.log(final);

                let jugador_ganador = ganador(final);

                console.log(jugador_ganador);

                if( jugador_ganador != 'T' ){
                    alert(`Fin del juego:\n${jugador_ganador}ganan`);
                }
                else{
                    if( fin )
                        alert(`Empate`);
                }
                }
                else{
                    alert('Comando no valido .l.')
                }
        
}
var turno_ = (user) => {
var temp = '';
var index = -1;
for (let i = 0; i < jugadores.length; i++) {
        
        if(user == jugadores[i].user){c('loca '+ (user == jugadores[i].user))
            index = i;
        }
    c("i "+i);
    }  
    
    if( index == 0){
        temp = jugadores[1].user;
    }
    else if( index == 1){
        temp = jugadores[0].user;
    }
            
    return temp;
}

var ganador = (final)=>{
   
   let juego1 = definido(final,0,1,2);//(final[0] == final[1] && final[1] == final[2] && final[0] == final[2]);
   let juego2 = definido(final,3,4,5);//(final[3] == final[4] && final[4] == final[5] && final[3] == final[5]);
   let juego3 = definido(final,6,7,8);//(final[6] == final[7] && final[7] == final[8] && final[6] == final[8]);
   let juego4 = definido(final,0,3,6);//(final[0] == final[3] && final[3] == final[6] && final[0] == final[6]);
   let juego5 = definido(final,1,4,7);//(final[1] == final[4] && final[4] == final[7] && final[1] == final[7]);
   let juego6 = definido(final,2,5,8);//(final[2] == final[5] && final[5] == final[8] && final[2] == final[8]);
   let juego7 = definido(final,0,4,8);//(final[0] == final[4] && final[4] == final[8] && final[0] == final[8]);
   let juego8 = definido(final,2,4,6);//(final[2] == final[4] && final[4] == final[6] && final[2] == final[6]);

   var jugador_ganador = '';
   console.log(juego1);
   console.log(juego2);

   console.log(juego3);

   console.log(juego4);

   console.log(juego5);

   console.log(juego6);

   console.log(juego7);

   console.log(juego8);

   

   
   if(juego1.estado && juego1.juego){
       jugador_ganador = juego1.jugador;
   }
   else if(juego2.estado && juego2.juego){
       jugador_ganador = juego2.jugador;
   }
   else if(juego3.estado && juego3.juego){
       jugador_ganador = juego3.jugador;
   }
   else if(juego4.estado && juego4.juego){
       jugador_ganador = juego4.jugador;;
   }
   else if(juego5.estado && juego5.juego){
       jugador_ganador = juego5.jugador;
   }
   else if(juego6.estado && juego6.juego){
       jugador_ganador = juego6.jugador;
   }
   else if(juego7.estado && juego7.juego){
       jugador_ganador = juego7.jugador;
   }
   else if(juego8.estado && juego8.juego){
       jugador_ganador = juego8.jugador;;
   }
   else{
       jugador_ganador = 'T';
   }

   return jugador_ganador;
}

var definido = (final,x,y,z)=>{
  return { 
            'estado':
                (final[x] !== undefined) && (final[y] !== undefined) && (final[z]!== undefined),
            'juego':    
                (final[x] == final[y] && final[y] == final[z] && final[x] == final[z]),
            'jugador': final[x],
         };
}

var comprobacion = (casillas) =>{
       
       var comprobacion = true;

       for(i=0;i<casillas.length;i++){
           if(casillas[i] !== 0){
               comprobacion = false;
           }
       }

       return comprobacion;
}

var render = () => {
    var jade = `<div class="fila">
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


// `link(rel='stylesheet', href='/css/tablero.css')
//                 .fila
//                     .c1
//                     .c2
//                     .c3
//                 br
//                 .fila
//                     .c4
//                     .c5
//                     .c6
//                 br
//                 .fila
//                     .c7
//                     .c8
//                     .c9
//                 form(id="michi" action='')
//                 input#m(autocomplete='off')
//                 button Enviar`