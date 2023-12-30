function guardarProd(){
    let nombre = $("#prod_name").val();
    let precio = $("#prod_price").val();

    if(nombre == "" || nombre == 0){
        alert("Ingrese un nombre");
        return false;
    }
    if(precio == "" || precio == 0){
        alert("Ingrese un precio");
        return false;
    }

    $.ajax({
        "url": URL_BASE + "productos",
        "type": "POST",
        "dataType": "json",
        "data":{
            "id": localStorage.getItem("idProducto"),
            "precio": precio,
            "nombre": nombre,
        },success:function(r){
            location.href = "/adminProducts";
        }
    });
}

function guardarIdProd(id){
    localStorage.setItem("idProducto", id);
}

function eliminarProducto(id){
    $.ajax({
        "url": URL_BASE + "productos",
        "type": "DELETE",
        "datatype": "json",
        "data": {
            "id": id,
        }, success:function(r){
            location.reload();
        }
    });
}

function getProducto(){
    var idProducto = localStorage.getItem("idProducto");

    if(idProducto === 0 ) return false;

    $.ajax({
        "url": URL_BASE + "productos",
        "type": "GET",
        "datatype": "json",
        "data": {
            "id": localStorage.getItem("idProducto"),
        }, success:function(r){
            $("#prod_price").val(r.precio);
            $("#prod_name").val(r.nombre);
        }
    });
}