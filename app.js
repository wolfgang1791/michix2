
var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var path=require('path');

app.set('views', path.join(process.cwd() + '/views'));
app.use(express.static(path.join(process.cwd() + '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.set('view engine', 'jade');

var salas = [];

var armas = ['x','o'];
casillas = [1,1,1,1,1,1,1,1,1];
final = [];
turno = '';

app.get('/', function(req, res){
  res.render( __dirname + '/views/index'); // base_url fake para heroku
});

app.get('/salas', function(req, res){
  console.log(salas);
  
  res.jsonp(salas); // base_url fake para heroku
});

app.get('/crear', function(req, res){
  
  res.render( __dirname + '/views/sala');
  
});

app.get('/unirse', function(req, res){
 // console.log(req);
  var sala = req.params.nombre_sala;
  console.log(sala+" wea");
  res.render( __dirname + '/views/usuario',{sala:sala});
});

app.get('/salanueva', function(req, res){
  // console.log(req);
  
  var sala = req.query.sala;
  
  var jugadores = new Array();
  salas.push({key:sala,jugadores:jugadores})
  
  console.log(salas);
  
   res.render( __dirname + '/views/usuario',{sala:salas[salas.length-1].key})
 });
 




app.get('/tablero',(req,res)=>{
  console.log('fuck');
  
  res.render(__dirname + '/tablero');
});

io.on('connection', function(socket){
    var indice = 0;
    socket.on('inicio', function(usuario,sala,callback){
      
      for (let index = 0; index < salas.length; index++) {
             
        if(salas[index].key == sala){
            indice = index;
            break;
        }
      }
      console.log(indice);
      
      var userid = id(100);

      if(usuario != null && salas[indice].jugadores.length < 2){
        salas[indice].jugadores.push({ 'id': userid,'user':usuario,arma:null});
        console.log('usuario ');
        console.log(salas[indice].jugadores);
        
      }
    
      if(salas[indice].jugadores[0].arma == null){
    
        salas[indice].jugadores[0].arma = armas[id(1)];
          console.log(salas[indice].jugadores);
          
      }
      else{
          console.log('baby '+salas[indice].jugadores[0].arma);
          
        if(salas[indice].jugadores[0].arma == 'x'){
          salas[indice].jugadores[1].arma = 'o';
        }
    
        else if(salas[indice].jugadores[0].arma == 'o'){
          salas[indice].jugadores[1].arma = 'x';
        }

        turno = salas[indice].jugadores[id(1)].user;

    
      }

      // socket.jugadores = 'fuck';
      
      console.log(salas[indice].jugadores);
     
      if(salas[indice].jugadores.length < 2)
        callback({res:'ok',lista:salas[indice].jugadores,usuario:usuario,sala:salas[indice].key});
      else
      {
        callback({res:'ok2',usuario:usuario});
        io.emit('turno',{usuario:usuario,turno:turno,lista:salas[indice].jugadores,sala:salas[indice].key}); 
      }
  });


    
    socket.on('marcarTablero', function(usuario,msg,callback){

      var result = principal(msg).split('-');
      var resultado = '';
      console.log(result);
     
     
      if(result.length < 4)  
      {
        callback({resultado:result[2]});
      }
      else{
        resultado = result[2];
      }

      console.log('socket id '+socket.id+" "+usuario+" "+msg);
        io.emit('movida',{clase:result[0],figura:result[1],resultado:resultado});
    
    });
});

http.listen(port, function(){
  console.log('listening on *: '+port);
});

var id = (par) =>{
  return Math.round(Math.random()*par);
}

var turno = () => {

    
  var list = io.sockets.sockets;
     
  for (const key in list) {
    console.log('jugadores '+list[key].jugadores);
    if(list[key].jugadores == 'fuck'){
      console.log('\n\n\n\n');
      console.log(key);
    }
    console.log('\n\n\n\n');
  }


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

var principal = (msg) =>{
        
  var tokens = msg.match(/[xo]-([1-9]{1}$)/g);
  var clase = '';
  var figura = '';
  var resultado = '';

  console.log(tokens);

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
              clase = `.c${tokens[1]}`;
              figura = `<img src=${imagen} class="figura">`;
              
              casillas[tokens[1]-1] = 0;
              final[tokens[1]-1] = tokens[0];
          }
          else{
 
              resultado = 'casilla ocupada';
              
          }
      

          fin = false;
        

          fin =  comprobacion(casillas);    

          console.log(final);

          let jugador_ganador = ganador(final);

          console.log(jugador_ganador);

          if( jugador_ganador != 'T' ){
              //alert(`Fin del juego:\n${jugador_ganador}ganan`);
              for (let index = 0; index < jugadores.length; index++) {
                  if( jugador_ganador == jugadores[index].arma){
                      jugador_ganador = jugadores[index].user;
                      break;
                  }
              }
              resultado = `Fin del juego: ${jugador_ganador} gana-al`;
          }
          else{
              if( fin )
                  resultado = 'empate-al';
          }
          }
          else{
              resultado = 'Comando no valido .l.';
          }
    
    return `${clase}-${figura}-${resultado}`;

}