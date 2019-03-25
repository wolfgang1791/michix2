
var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var bodyParser = require('body-parser');
var io = require('socket.io')(http);
var port = process.env.PORT || 3001;
var path=require('path');
var fs = require('fs')

app.set('views', path.join(process.cwd() + '/views'));
app.use(express.static(path.join(process.cwd() + '/public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

app.set('view engine', 'jade');

var canal = '';

var jugadores = [];
var armas = ['x','o'];

app.get('/', function(req, res){
  res.render( __dirname + '/index'); // base_url fake para heroku
});

var ren = app.get('/tablero',(req,res)=>{
  console.log('fuck');
  
  // canal = req.body.sala;
  // usuario = req.body.usuario;
  // // arma = req.query.arma;
  // console.log(req.body);
  
  // var userid = id(100);

  // if(usuario != null && jugadores.length < 2){
  //   jugadores.push({ 'id': userid,'user':usuario,arma:null});
  //   console.log('usuario ');
  //   console.log(jugadores);
  // }

  

  // if(jugadores[0].arma == null){

  //     jugadores[0].arma = armas[id(1)];
  //     console.log(jugadores);
      
  // }
  // else{
  //     console.log('baby '+jugadores[0].arma);
      
  //   if(jugadores[0].arma == 'x'){
  //     jugadores[1].arma = 'o';
  //   }

  //   else if(jugadores[0].arma == 'o'){
  //     jugadores[1].arma = 'x';
  //   }

  // }
  // console.log(jugadores);
  
  // let user=null;
  // let jug = -1;

  // for (let index = 0; index < jugadores.length; index++) {
  //     if(jugadores[index].user == usuario){  
  //         user = jugadores[index];
  //         jug = index+1;
  //     }
  //     console.log(index);
      
  // }
  
  res.render(__dirname + '/tablero');
});

io.on('connection', function(socket){
    
    // console.log(socket);

    //let canal_random = canalR();

    socket.on('inicio', function(usuario,sala){
      console.log(socket.id);
      
      canal = sala;

      var userid = id(100);

      if(usuario != null && jugadores.length < 2){
        jugadores.push({ 'id': userid,'user':usuario,arma:null,sala:sala});
        console.log('usuario ');
        console.log(jugadores);
      }
    
      if(jugadores[0].arma == null){
    
          jugadores[0].arma = armas[id(1)];
          console.log(jugadores);
          
      }
      else{
          console.log('baby '+jugadores[0].arma);
          
        if(jugadores[0].arma == 'x'){
          jugadores[1].arma = 'o';
        }
    
        else if(jugadores[0].arma == 'o'){
          jugadores[1].arma = 'x';
        }
    
      }
      console.log(jugadores);

      io.emit('inicio',usuario,jugadores); 
    });

    console.log('canal '+canal);
    

    socket.on(canal, function(usuario,msg){

      console.log(socket.id+" "+usuario+" "+msg+" "+canal);
        io.emit(canal,msg,jugadores,usuario);
    
    });
});

http.listen(port, function(){
  console.log('listening on *:3001 ');
});

var id = (par) =>{
  return Math.round(Math.random()*par);
}

var cadenaR = (par) =>{
  return Math.round(Math.random()*(25)+65);
}

var canalR = () =>{
  canal_0 = '';
  for (let index = 0; index < 7; index++) {
      canal_0 += String.fromCharCode(cadenaR());
  }

  console.log(canal_0);

  return canal_0;
}