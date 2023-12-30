function guardarUsr(){
    let email = $("#usr_mail").val();
    let direccion = $("#usr_direccion").val();
    let tel = $("#usr_tel").val();
    let pass = $("#usr_pass").val();

    if(email == "" || email == 0){
        alert("Ingrese un email");
        return false;
    }
    if(direccion == "" || direccion == 0){
        alert("Ingrese una direccion");
        return false;
    }
    if(tel == "" || tel == 0){
        alert("Ingrese un telefono");
        return false;
    }
    if(pass == "" || pass == 0){
        alert("Ingrese una contraseña");
        return false;
    }

    $.ajax({
        "url": URL_BASE + "cuentas",
        "type": "POST",
        "dataType": "json",
        "data":{
            "id": localStorage.getItem("idUsuario"),
            "email": email,
            "direccion": direccion,
            "tel": tel,
            "password": pass,
        },success:function(r){
            location.href = "/adminUser";
        }
    });
}

function guardarId(id){
    localStorage.setItem("idUsuario", id);
}

function eliminarCliente(id){
    $.ajax({
        "url": URL_BASE + "cuentas",
        "type": "DELETE",
        "datatype": "json",
        "data": {
            "id": id,
        }, success:function(r){
            location.reload();
        }
    });
}

function getUsuario(){
    var idUsuario = localStorage.getItem("idUsuario");

    if(idUsuario === 0 ) return false;

    $.ajax({
        "url": URL_BASE + "cuentas",
        "type": "GET",
        "datatype": "json",
        "data": {
            "id": localStorage.getItem("idUsuario"),
        }, success:function(r){
            $("#usr_mail").val(r.email);
            $("#usr_direccion").val(r.direccion);
            $("#usr_tel").val(r.tel);
            $("#usr_pass").val(r.password);
        }
    });
}