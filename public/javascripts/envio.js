var socket = io();

var cont=[];
$(document).ready(function(){
  
 $("#envioo").click(function(){
    
    
    let msn =$("#mensajes").val();
    alert("msg :"+msn)
    socket.emit('chat', msn);

    socket.on("respuesta", (me)=>{
      $("#histori").html(`<li class="clearfix"><div class="message-data">
      <span class="message-data-time"> dia 10:12 </span>
  </div><div class="message my-message">${me}</div></li>`);
    // let mensage={ id:socket.id, mensaje:me};//mensaje recivido
   // cont.push(mensage);
    console.log(me);

     /* for (item of cont) {
        console.log(item.mensaje);
        $("#histori").html(`<li class="clearfix"><div class="message-data">
        <span class="message-data-time"> dia 10:12 </span>
    </div><div class="message my-message">${item.mensaje}</div></li>`);

                            };*/
      
    }) 
    

  });
 
});
