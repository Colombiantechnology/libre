//variables
let tip = document.getElementById("tip").value;
let button = document.getElementById("send");
JsBarcode(".barcode").init();

function  save(){

    let servicio = document.getElementById("servicio").value;
    let nombre = document.getElementById("nombre").value;
    let email = document.getElementById("email").value;
    let descripcion = document.getElementById("descripcion").value;
    let celular = document.getElementById("celular").value;
    JsBarcode("#barcode2", "Hi!", {
        textAlign: "left",
        textPosition: "top",
        font: "cursive",
        fontOptions: "bold",
        fontSize: 40,
        textMargin: 15,
        text: "Special"
    });

    let usuario ={
        "servicio":servicio, "nombre":nombre,"email":email,
        "descripcion":descripcion,"celular":celular,"code":1107050440
    };
    console.log(usuario);

};
button.addEventListener("click", save);


);

