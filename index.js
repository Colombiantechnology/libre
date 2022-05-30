//nuevo ya
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const url = require('url');
const http = require('http');
const path = require('path');
const multer = require('multer');
const fs = require("fs");
//variables python execute
let {PythonShell} = require('python-shell');
//require("./public/python/send.py")


// CommonJS
const Swal = require('sweetalert2');
app.set('port', process.env.PORT ||3000);


const session= false;
var uuid4 = require( "uuid4");


app.set('public', path.join(__dirname, 'public'));
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({extended: false}));

//const ValorSession = validacionPermiso(email,password);
const UsuariosG = fs.readFileSync('public/jsondata/users.json','utf-8');//leemos los usuarios json
const coment = fs.readFileSync('public/jsondata/comentarios.json','utf-8');//leemos los usuarios json

const UsuariosGlobal = JSON.parse(UsuariosG);//se combierte a array
let UsuariosGlobal2 = JSON.parse(UsuariosG);//se combierte a array
const comentglobal = JSON.parse(coment);

const chatUsu=[];
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const nodemailer = require("nodemailer");//nodemailer

 const chat =[{
   id:12345,
   mens:"Bienvenidos al Chat"
 }];
//socket
//correo


//https://www.youtube.com/watch?v=h7wH7aEb8Ok nodemailer ok
const usuarioReset=[];
const resetpassword =[];

function  send( ResetEmail,UsuarioF){
    let transporter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"1107050440f@gmail.com",
            pass:"Redimidos"
        },
        tls:{
            rejectUnauthorized:false
        }
    });

    const num = Math.floor((Math.random() * (300 - 1000))+ 10000);
    //objeto para buscar usuario  de reset
    resetpassword.push({"codigo": num,
                         "id":UsuarioF})

    let mailOptions ={
        from:"f5extuniversal@gmail.com",
        to: ResetEmail,
        subject:"Confirmations F5Ext",
        text:"----Bienvenidos A F5EXT----- Codigo Confirmacion es: "+num
    };
//ejecucion de correo
    transporter.sendMail(mailOptions, function (err,success){
        if(err){
            console.log(err)
        }else{
            console.log("Email send enviado Codigo::"+resetpassword[0].codigo)
            console.log("Email send enviado Codigo::"+resetpassword[0].id)

        }
    })
//fin correo

}

//rutas
app.get('/', (req, res,next) => {

  res.render('home');
  Swal.fire({
    title: 'Custom animation with Animate.css',
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  })
  

})

////////////Modulo Login/////////
app.get('/login', (req, res,next) => {
    res.render('login');
  })

////////////Modulo Login/////////
app.post('/reserva', (req, res,next) => {
   
   let{ correo,celular,comentario} = req.body;
   let envio ={
      "correo":correo, "celular":celular, "comentario":comentario
   };

   
 let rt =comentglobal.concat(envio);
 const UEnvio= JSON.stringify(rt)
 //juntamos el nuevo usuario con el de la base de datos
 
 
 fs.writeFileSync("public/jsondata/comentarios.json",UEnvio , "utf-8");
    console.log(UEnvio);
    
    res.redirect("/admin");
})

app.get("/peticiones", (req, res)=>{
 res.render("perfil/perfil",{comentglobal});
})
const Completa=[];
let us =[]; 
const publi=[];
var cont = false;


//inicio session
app.post('/login',(req, res ) => {
  //validacion de datos ingresados por login ruta Post
  let x=0; let usuari= UsuariosGlobal.length;
   
  try {
    while(x <= UsuariosGlobal.length){
      //console.log(UsuariosGlobal[x])
      if(req.body.email == UsuariosGlobal[x].email && req.body.password == UsuariosGlobal[x].password){
        console.log(UsuariosGlobal[x]);  
        cont = true;
        res.redirect("/admin");
        break;
      }   
     x++;
          }  
  } catch (error) {
    console.log("usuario no encontrado");
    // expected output: ReferenceError: nonExistentFunction is not defined
    // Note - error messages will vary depending on browser
    res.render('error');
  }
     
  });
  app.get('/admin', (req, res) => {
    //validamos lo que viene delogin post debe traer 1 para poder seguir al admin
    if (cont) {
      res.render('admin',{us});
    }else {
      res.render('error');
    }
    
  });

//salida de session
  app.get('/singout', (req, res,next) => {
   cont = false;
   res.redirect("/");
    
  });
//guarda publicacion
  app.get('/requets', (req, res,next) => {
   let getPublicacion= localStorage.getItem('publicacion');
 //juntamos el nuevo usuario con el de la base de datos
 fs.writeFileSync("public/jsondata/publicaciones.json",getPublicacion , "utf-8");
    console.log(getPublicacion);
   });
  ////////registro modulo/////////
  app.post('/sign', (req, res,next) => {
    const {nombre ,email,celular,password} = req.body;
    let sin ={ "id":uuid4(),"nombre": nombre ,"email":email,"celular":celular,"password":password};
  
 let concatDatda = UsuariosGlobal2.concat(sin);
 
 const User = JSON.stringify(concatDatda)
 //juntamos el nuevo usuario con el de la base de datos
 
 
 fs.writeFileSync("public/jsondata/users.json",User , "utf-8");
    console.log(sin);
    res.redirect("/login");
    
});

  app.get('/registrar', (req, res,next) => {
    res.render('registrar')
})
///////////////fin registro/////////////
//publicaciones
app.get('/publicaciones', (req, res,next) => {
  res.render('publicaciones/public')
})
app.get('/hp', (req, res,next) => {
  res.render('publicaciones/homepubli')
})

app.get('/createpubli', (req, res,next) => {
  res.render('publicaciones/createpublic')
})
////////recordar contraseña///////////////

app.get('/Chat',(req,res)=>{

  if(chatUsu !=''){
    res.render('chat/chat')
  }else{
      
  res.render('error')
  }
})

app.get('/adminchat', (req, res,next) => {
  res.render('chat/chatlogin')
})
var validacion=0;
//reset password//###########################################################
app.get('/resetpassword', (req, res,next) => {
  res.render('recordarcontra',{valida:validacion})
})

app.post('/resetP',function (req, res){
//guardamos variable random
    let {email} = req.body;
    validacion=0;

    //Completa.push(UsuariosGlobal);
    let tus= UsuariosGlobal.filter(use=> use.email == email );
    //fin filter
    console.log(us)
    //Comparacion
    if (tus !="") {

        res.redirect("/codigo");

       send(email,tus[0].id)
    } else {
   validacion++;//se aumenta 1
        res.redirect("/resetpassword");
    }

    // send(email)
    //console.log(email);

})

app.get('/codigo', function(req,res){
    res.render('codigo')
})
app.get('/cambio', function(req,res){
    res.render('cambiopassword')
})
//parte pediente03/05/2022
app.post('/resetFinal', function (req,res){
    let {password0}=req.body;
     let usi = UsuariosGlobal.filter(use=> use.id == resetpassword[0].id);
    //the new object save()
    let objeto =[{
        "id":usi[0].id,
        "nombre":usi[0].nombre,
        "email":usi[0].email,
        "celular":usi[0].celular,
        "password":password0
    }];
    console.log("actualizado " + JSON.stringify(objeto));

    //Comparacion
    if (usi!="") {

        let diferente = UsuariosGlobal.filter(use=> use.id != resetpassword[0].id);

        let diferen1=diferente.concat(objeto);//agregamos el dato nuevo
        const nuevo = JSON.stringify(diferen1)//se convierte a string

        fs.writeFileSync("public/jsondata/users.json",nuevo , "utf-8");
        console.log(nuevo);

        res.redirect("/login");
    }


})
//##################### HEROKU https://www.youtube.com/watch?v=yNxZYN1ja4Y&t=327s######################################

app.post('/confirmaCodigo', function(req,res){
    //Completa.push(UsuariosGlobal);
    let {numero} = req.body;

    //Comparacion resetpassword[0].codigo
    if (numero == resetpassword[0].codigo) {

        res.redirect("/cambio");
    } else {

        res.send('CODIGO CONFIRMACION NO VALIDO');
    }
})
app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
/////////fin recordar contraseña///////////
 server.listen(app.get('port'), () => {
  console.log(`Example app listening on port`+ app.get('port'))
})

io.on('connection', (socket) => {
  console.log('socket '+socket.id);

   socket.on('chat',(data)=>{//chat
    io.sockets.emit("cha", data);// enviamos a todos los sockets la informacion
  console.log(data)
   })
   socket.on('typi',(es)=>{//chat
    socket.broadcast.emit("ty", es);// enviamos a todos los sockets la informacion
  console.log(es)
   });

   socket.on("uschar",(userC)=>{
     chatUsu.push({id:userC});
    
   });
   socket.on("publico",(pub)=>{
    console.log("estas"+publi);
   
  })
 
    //se envia respuesta del chat
    


});
