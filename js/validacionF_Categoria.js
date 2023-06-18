//var form = document.getElementById("formPedido");
var form = document.querySelector("#formCategoria"); // selecciona el primero que cumple con el selector
form.addEventListener('submit', validar);

function validar(event) {
    var radiosTipoComida = document.getElementsByName("tipoComida");
    var txtNombrePlato = document.getElementById("plato");

    var checkboxsPrecioPr = document.querySelectorAll(".sus");
    var txtOcasion = document.getElementById("ocasiones");
    var txtCategoria = document.getElementById("nuevacategoria");
    var selectTipoRestriccion= document.getElementById("tipoRestriccion");

    // expresiones regulares (RegEx)
    var letra = /^[a-z ,.'-]+$/i;// letrasyespacio   ///^[A-Z]+$/i;// solo letras


    limpiarMensajes();

    //validacion para nombres
    if (txtNombrePlato.value === '') {
        resultado = false;
        mensaje("Nombre del plato es requerido", txtNombrePlato);

    } else if (!letra.test(txtNombrePlato.value)) { 
        resultado = false;
        mensaje("Solo debe contener letras", txtNombrePlato);
    } else if (txtNombrePlato.value.length > 50) {
        resultado = false;
        mensaje("maximo 50 caracteres",txtNombrePlato);
    }

    

    //validacion Tipo de comida
    let sel = false;
    for (let i = 0; i < radiosTipoComida.length; i++) {
        if (radiosTipoComida[i].checked) {
            sel = true;
            let res =radiosTipoComida[i].value;
            break;
        }
    }
    if (!sel) {
        resultado = false;
        mensaje("Debe seleccionar tipo de comida", radiosTipoComida[0]);
    }

    //validacion precio promedio
    sel = false;
    let cont = 0;
    for (let i = 0; i < checkboxsPrecioPr.length; i++) {
        if (checkboxsPrecioPr[i].checked) {
            cont++;
            sel = true;
        }
    }
    if (!sel) {
        resultado = false;
        mensaje("Debe seleccionar una", checkboxsPrecioPr[0]);
    }
    if (cont > 1) {
        resultado = false;
        mensaje("Debe seleccionar solo una ", checkboxsPrecioPr[0]);
    }

    //validacion de Ocasion
    if (txtOcasion.value === "") {
        resultado = false;
        mensaje("La ocasion es requerida", txtOcasion);
      } else {
        var opciones = document.getElementById("listaOpciones").options;
        var ocasionValida = false;
      
        for (var i = 0; i < opciones.length; i++) {
          if (opciones[i].value === txtOcasion.value) {
            ocasionValida = true;
            break;
          }
        }
        if (!ocasionValida) {
          resultado = false;
          mensaje("Ocasion inválida. Seleccione una zona de la lista.",txtOcasion);
        }
      }

      //validacion de Sugerencias
    if (txtCategoria.value === '') {
        resultado = false;
        mensaje("Sugerencia es requerida", txtCategoria);

    } else if (!letra.test(txtCategoria.value)) { 
        resultado = false;
        mensaje("La sugerencia solo debe contener letras", txtCategoria);
    } else if (txtCategoria.value.length > 50) {
        resultado = false;
        mensaje("Direccion maximo 50 caracteres", txtCategoria);
    }

    //validacion de restriccion
    if (selectTipoRestriccion.value === null || selectTipoRestriccion.value === '0') {
        resultado = false;
        mensaje("Debe seleccionar una restriccion", selectTipoRestriccion);
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