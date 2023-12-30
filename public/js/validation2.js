const URL_BASE = "http://localhost:3000/";
    
function validacion2(){
    var token_usuario = localStorage.getItem("token_usuario");

    $.ajax({
        "url": URL_BASE + "validateUser",
        "type": "POST",
        "dataType": "json",
        "data":{
            "token": token_usuario,
        },"success": function(r){
            if(r.error == 0){
                let elemento = `
                <li><button onclick="cerrarSesion()">Cerrar Sesion</button></li>
                `
                $(".NAV ul").append(elemento);
            }else{
                $(".NAV ul").removeItem(elemento);
            }
            },
        });
}
validacion2();

function cerrarSesion() {
    localStorage.removeItem("token_usuario");
    location.href="/index";
    location.reload();
}
