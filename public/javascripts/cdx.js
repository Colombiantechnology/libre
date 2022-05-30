var socket = io();
var spy = document.getElementById("spy");
var data = document.getElementById("datos");
var buton = document.getElementById("buton")
var escribe = document.getElementById("estado");
var cont =[];
var conversation =[];
buton.addEventListener("click", myFunction);
data.addEventListener("keyup", tipy)

function tipy(){
    let user =JSON.parse(localStorage.getItem("key"));

    socket.emit("typi",user.usuario) //broadcast emitir a todos menos a mi
};

function myFunction() {
  
  let user =JSON.parse(localStorage.getItem("key"));

  spy.innerHTML="";
  
console.log(user.imagen)
  var arra={
      "title":user.usuario,
      "imagen":user.imagen,
      "send":data.value
  };
  socket.emit("chat", {
    "title":user.usuario,
    "imagen":user.imagen,
    "celular":user.celular,
    "send":data.value
})
document.getElementById("datos").value='';
//cont.push(arra);

}


//se muestra el dato del servidor https://icon-library.com/images/50x50-icon/50x50-icon-0.jpg
  socket.on('cha', function(dat){
    data.innerHTML+='';
    console.log(dat);
    conversation.push(dat);//concatenar arrays
show();
  })
  socket.on('ty', function(es){
    
    escribe.innerHTML="Escribe :"+es;
    
  })

function show(){

    spy.innerHTML="";

    for(let i=0; i <= conversation.length; i++){

        spy.innerHTML +=`
    <li class="collection-item avatar" style="background:#424242; color:white;">
                              <img src="${conversation[i].imagen}" class="material-icons circle" alt="">
                              <span class="title" id="user">${conversation[i].title}  </span>
                              <p id=" respuesta">${conversation[i].send} </p>
                              <a href="#!" class="secondary-content"> ${conversation[i].celular} <i class="material-icons">grade</i></a>
                            </li>
                             `;
    }


}

show();