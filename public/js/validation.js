const URL_BASE = "http://localhost:3000/";

function validacion(){
    var token_usuario = localStorage.getItem("token_usuario");

    $.ajax({
        "url": URL_BASE + "validateUser",
        "type": "POST",
        "dataType": "json",
        "data":{
            "token": token_usuario,
        },"success": function(r){
            if(r.error == 0){
                
            } else{
                alert ("Usuario incorrecto");
                location.href="/login";
            }
            let elemento = `
            <li><button onclick="cerrarSesion()" id="sing-out">Cerrar Sesion</button></li>
            `
            $(".NAV ul").append(elemento);
            },
        });
}

validacion();

function cerrarSesion() {
    localStorage.removeItem("token_usuario");
    location.href="/index";
}
