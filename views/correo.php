<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");
$method = $_SERVER['REQUEST_METHOD'];

     if(isset($POST['Eviar'])){

        //Validacion
        if(!empty($POST['email'])){
            $email= $_POST["email"];
            $asunto ="RECUPERACION CONTRASEÑA";
            $mensaje="Recupera tu contraseña hiciste solicitud";
             //envio maill
             $header="From:noreply@example.com"."\r\n";
             $header.="Reply-To:noreply@example.com"."\r\n";
             $header.="X-Mailer:PHP".phpversion();
             $mail = @mail($email , $asunto, $mensaje,$header);
             if($mail){
                echo"<h1> enviado</h1>";
             }
            }
     }



?>