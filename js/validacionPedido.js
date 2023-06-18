//var form = document.getElementById("formPedido");
var form = document.querySelector("#formPedidos"); 
form.addEventListener('submit', validarFormPedidos);

function validarFormPedidos(event) {
    var resultado = true;
    var txtNombres = document.getElementById("nombres");
    var txtZona = document.getElementById("zona");
    var txtDireccion = document.getElementById("direccion");
    var txtReferencia = document.getElementById("referencia");
    var txtHora = document.getElementById("hora");
    var txtTelefono = document.getElementById("telefono");

    
    // expresiones regulares (RegEx)
    var letra = /^[a-z ,.'-]+$/i;
    var telefonoreg = /^[0-9]{10}$/g; 
    var direccionRegEx = /^[a-zA-Z0-9\s]+$/;
    /*preguntar e investigar*/
    var horaRegEx = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/; 

    limpiarMensajes();

    //validacion para nombres
    if (txtNombres.value === '') {
        resultado = false;
        mensaje("Nombre es requerido", txtNombres);

    } else if (!letra.test(txtNombres.value)) { 
        resultado = false;
        mensaje("Nombre solo debe contener letras", txtNombres);
    } else if (txtNombres.value.length > 20) {
        resultado = false;
        mensaje("Nombre maximo 20 caracteres", txtNombres);
    }

    //validacion telefono
    if (txtTelefono.value === "") {
        resultado = false;
        mensaje("Telefono es requerido", txtTelefono);
    } else if (!telefonoreg.test(txtTelefono.value)) {
        resultado = false;
        mensaje("Telefono debe ser de 10 digitos", txtTelefono);
    }

    //validacion Direccion
    if (txtDireccion.value === '') {
        resultado = false;
        mensaje("Dirección es requerida", txtDireccion);
    } else if (!direccionRegEx.test(txtDireccion.value)) {
        resultado = false;
        mensaje("La dirección debe contener solo letras y números", txtDireccion);
    } else if (txtDireccion.value.length > 10) {
        resultado = false;
        mensaje("Dirección máximo 10 caracteres", txtDireccion);
    }


    //validacion Referencia
    if (txtReferencia.value === '') {
        resultado = false;
        mensaje("Direccion es requerida", txtReferencia);

    } else if (!letra.test(txtReferencia.value)) { 
        resultado = false;
        mensaje("La Direccion solo debe contener letras", txtReferencia);
    } else if (txtReferencia.value.length > 10) {
        resultado = false;
        mensaje("Direccion maximo 10 caracteres", txtReferencia);
    }


    //validacion Hora
    if (txtHora.value === '') {
        resultado = false;
        mensaje("Hora es requerida", txtHora);
    } else if (!horaRegEx.test(txtHora.value)) {
        resultado = false;
        mensaje("Formato de hora inválido. Debe seguir el formato HH:MM", txtHora);
    }



    if (txtZona.value === "") {
        resultado = false;
        mensaje("La zona es requerida", txtZona);
    } else {
        var opciones = document.getElementById("listaOpciones").options;
        var zonaValida = false;
        for (var i = 0; i < opciones.length; i++) {
        if (opciones[i].value === txtZona.value) {
            zonaValida = true;
            break;
        }
        }
        if (!zonaValida) {
        resultado = false;
        mensaje("Zona inválida. Seleccione una zona de la lista.",txtZona);
        }
    }


    if (!resultado) {
        event.preventDefault();  // detener el evento  //stop form from submitting
    } 
}


function mensaje(cadenaMensaje, elemento) {
    elemento.focus();
    var nodoPadre = elemento.parentNode;
    var nodoMensaje = document.createElement("span");
    nodoMensaje.textContent = cadenaMensaje;
    nodoMensaje.setAttribute("class", "mensajeError");
    nodoPadre.appendChild(nodoMensaje);
}

function limpiarMensajes() {
    var mensajes = document.querySelectorAll(".mensajeError");
    for (let i = 0; i < mensajes.length; i++) {
        mensajes[i].remove();// remueve o elimina un elemento de mi doc html
    }

}
