//const { io } = require("socket.io-client");

$(document).ready(function() {
    
    $("input#mensajes").on("keyup", function(){
     var valor =  $(this).val();
       console.log(" resultado " +valor)
    });
   
});
