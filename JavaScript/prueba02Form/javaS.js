window.onload = function() {
    var btn = document.getElementById("enviar");
    var panel = document.getElementById("result");
    var nombre = document.getElementById("resultNombre");
    var edad = document.getElementById("resultEdad");
    var repetidor = document.getElementById("resultRepetidor");
    var poblacion = document.getElementById("resultPoblacion");
    var genero = document.getElementById("resultGenero");
    var comentario = document.getElementById("resultComentario");
    
    btn.addEventListener("click", function(event){
        var auxPob = document.getElementById("idPoblacion"); var auxPob2 = auxPob.selectedIndex;
        event.preventDefault();
        nombre.innerHTML += document.getElementById("txtNombre").value;
        edad.innerHTML += document.getElementById("txtEdad").value;
        if (document.getElementById("cbRepetidor").checked)
            repetidor.innerHTML += "si.";
        else 
            repetidor.innerHTML += "no.";
        poblacion.innerHTML += auxPob.options[auxPob2].text;
        if (document.getElementById("generoH").checked)
            genero.innerHTML += "hombre";
        else 
            genero.innerHTML += "mujer";
        comentario.innerHTML += document.getElementById("idComentario").value;
        panel.style.display = "block";
    });
};