//var form = document.getElementById("formPedido");
var form = document.querySelector("#formTarjeta"); // selecciona el primero que cumple con el selector
form.addEventListener('submit', validarFormTarjeta);

function validarFormTarjeta(event) {
    var resultado = true;
    
    var txtNumeroTarjeta = document.getElementById("tarjeta");
    var txtCvv = document.getElementById("cvv");
    var txtemail = document.getElementById("correo");

    var txtFechaVenc = document.getElementById("vencimiento");    
    var checkboxsTarjetas = document.querySelectorAll(".sus");
    var selectTipoTarjeta= document.getElementById("tipoTarjeta");

    // expresiones regulares (RegEx)
    var tarjetareg = /^[0-15]{16}$/g; 
    var cvvreg = /^[0-2]{3}$/g;
    var correo = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

    limpiarMensajes();

    //validacion numero de tarjeta
    if (txtNumeroTarjeta.value === "") {
        resultado = false;
        mensaje("Numero de tarjeta es requerida", txtNumeroTarjeta);
    } else if (!tarjetareg.test(txtNumeroTarjeta.value)) {
        resultado = false;
        mensaje("Telefono debe ser de 10 digitos", txtNumeroTarjeta);
    }

    //validacion tipo de tarjeta
    if (selectTipoTarjeta.value === null || selectTipoTarjeta.value === '0') {
        resultado = false;
        mensaje("Debe seleccionar un tipo de tarjeta", selectTipoTarjeta);
    }

    // Obtener el año actual
    var fechaVencimiento = new Date(txtFechaVenc.value);
    var anioVencimiento = fechaVencimiento.getFullYear();
    var anioActual = new Date().getFullYear();

    if (txtFechaVenc.value === "") {
        resultado = false;
        mensaje("Fecha es requerida", txtFechaVenc);
    }else if (anioVencimiento < anioActual) {
        resultado = false;
        mensaje("La tarjeta está vencida", txtFechaVenc);
    }


    //validacion numero de cvv
    if (txtCvv.value === "") {
        resultado = false;
        mensaje("Numero de tarjeta es requerida", txtCvv);
    } else if (!cvvreg.test(txtCvv.value)) {
        resultado = false;
        mensaje("Telefono debe ser de 10 digitos", txtCvv);
    }

    //validacion Nombre tarjeta
    sel = false;
    let cont = 0;
    for (let i = 0; i < checkboxsTarjetas.length; i++) {
        if (checkboxsTarjetas[i].checked) {
            cont++;
            sel = true;
        }
    }
    if (!sel) {
        resultado = false;
        mensaje("Debe seleccionar una", checkboxsTarjetas[0]);
    }
    if (cont > 1) {
        resultado = false;
        mensaje("Debe seleccionar solo una ", checkboxsTarjetas[0]);
    }


     //validacion email
     if (txtemail.value === "") {
        resultado = false;
        mensaje("Email es requerido", txtemail);
    } else if (!correo.test(txtemail.value)) {
        resultado = false;
        mensaje("Email no es correcto", txtemail);
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
