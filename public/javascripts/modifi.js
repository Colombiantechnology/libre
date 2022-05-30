 //variables 
 var titulo = document.getElementById("titulo");
 var description = document.getElementById("description");
 var categoria = document.getElementById("categoria");
 var prew = document.getElementById("previmg");
var carga= document.getElementById("carga");
var cont =0;
var global=[];
 var progreso=[];//array imagenes
 var socket = io();
 
 function img(element){
    
    prew.innerHTML='';
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
     // console.log('RESULT', reader.result)
       progreso.push({"img1":reader.result});// concateno valor por imagen
              cont++;
              prew.innerHTML+=`<img src="${reader.result} " class="img-thumbnail" alt="...">`;
             // console.log('RESULT', progreso)
    }
    reader.readAsDataURL(file);
 }

 

carga.addEventListener("click", function(e){
    e.preventDefault();
    if (window.confirm("Deseas Guardar Publicacion")) {
        save();
        // window.open("exit.html", "Thanks for Visiting!");
      }else{
          console.log("cerrado")
      }
   
});

  function setimg1(element){
    prew.innerHTML='';
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
     // console.log('RESULT', reader.result)
       progreso.push({"img2":reader.result});// concateno valor por imagen
              cont++;
              prew.innerHTML+=`<img src="${reader.result} " class="img-thumbnail" alt="...">`;
             // console.log('RESULT', progreso)
    }
    reader.readAsDataURL(file);
  }
  function setimg2(element){
    prew.innerHTML='';
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
     // console.log('RESULT', reader.result)
       progreso.push({"img3":reader.result});// concateno valor por imagen
              cont++;
              prew.innerHTML+=`<img src="${reader.result} " class="img-thumbnail" alt="...">`;
             // console.log('RESULT', progreso)
    }
    reader.readAsDataURL(file);
}
function setimg3(element){
    prew.innerHTML='';
    var file = element.files[0];
    var reader = new FileReader();
    reader.onloadend = function() {
     // console.log('RESULT', reader.result)
       progreso.push({"img4":reader.result});// concateno valor por imagen
              cont++;
              prew.innerHTML+=`<img src="${reader.result} " class="img-thumbnail" alt="...">`;
             // console.log('RESULT', progreso)
    }
    reader.readAsDataURL(file);
}

async function save(){
  // global.push(progreso);
  let id =Math.random();
  var datos={
    "id": id,
    "titulo":titulo.value,
    "descripcion":description.value,
    "categoria":categoria.value,
    
   };
   let imagenes ={
     "id":id,
    "img0":progreso[0].img1,
    "img1":progreso[1].img2,
    "img2":progreso[2].img3,
    "img3":progreso[3].img4,
   }
   global.push(datos);
  let completo = global.concat(imagenes);
  //localStorage.setItem('publicacion', JSON.stringify(completo));
  //socket
  socket.emit("publico", completo)
  console.log( completo)
  //window.location.href ="/requets"
}
