
//var socket = io();
function onSignIn(googleUser) {
  var profile = googleUser.getBasicProfile();
  //console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  //console.log('Name: ' + profile.getName());
  //console.log('Image URL: ' + profile.getImageUrl());
  //console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
  let usuario =[ {
    "id":profile.getId(), // Do not send to your backend! Use an ID token instead.
    "name":profile.getName(),
    "ImageURL":profile.getImageUrl(),
    "email": profile.getEmail() //  
  }];
  localStorage.setItem('datos', JSON.stringify(usuario));
  
  window.location.href = "http://localhost:3000/validacion";
 
};

function signIn() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signIn().then(function () {
    console.log('start session');
    upSession();
  });
  
  window.location.href = "http://localhost:3000";
}
function signOut() {
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}


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