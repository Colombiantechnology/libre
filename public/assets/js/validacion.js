var p1 = document.getElementById("password");
var p2 = document.getElementById("password2");
let buton=document.getElementById("buttonr").disabled = true;
let alert1 = document.getElementById("alert");

p2.addEventListener("keyup" , function(){
alert1.innerHTML="";
    if( p1.value == p2.value){
        alert("Deseas guardar Usuario");
        alert1.innerHTML+='<div class="alert alert-success" role="alert">'+
        'CORRECTO PASSWORD'+
      '</div>'
     let buton=document.getElementById("button").disabled = false;
    }else{
        alert1.innerHTML+='<div class="alert alert-danger" role="alert">'+
        'Contraseña incorrecta'+
      '</div>'
    }

 });


function key(){
    console.log(p1.value)
}