window.onload = function () {
    /* Ejercicio01 */
    /*
    var parrafo = document.getElementById("parrafo");
    
    document.getElementById("insultar").addEventListener("click", function(){
        parrafo.innerHTML = "Eres muuuuuu feo!";
    });
    
    document.getElementById("saludar").addEventListener("click", function(){
        parrafo.innerHTML = "Holaaa holitaaa!";
    });
    */

    /* Ejercicio02 */
    /* 
    var parrafo = document.getElementById("parrafo");
    var btnActivar = document.getElementById("activar");
    var btnInsultar = document.getElementById("insultar");
    
    btnActivar.addEventListener("click", activar);
    
    function activar(){
        btnActivar.innerHTML = "Desactivar";   
        btnInsultar.addEventListener("click", insultar);
        btnActivar.removeEventListener("click", activar);
        btnActivar.addEventListener("click", desactivar);
    }
    function desactivar(){
        parrafo.innerHTML = "Soy un parrafito";
        btnActivar.innerHTML = "Activar";
        btnInsultar.removeEventListener("click", insultar);
        btnActivar.removeEventListener("click", desactivar);
        btnActivar.addEventListener("click", activar);
    }
    function insultar(){
        parrafo.innerHTML = "Eres muuuuuu feo!";
    };
    */

    /* Ejercicio03 */
    /*
    var parrafo = document.getElementById("parrafo");
    var btnNegrita = document.getElementById("negrita");
    var btnNegritaCursiva = document.getElementById("negritaCursiva");
    var cont = 3;
    
    btnNegrita.addEventListener("click", ponerNegrita);
    btnNegritaCursiva.addEventListener("click", ponerNegCur);
    
    function ponerNegrita(){
        parrafo.style.fontWeight = "bold";
        parrafo.style.fontSize = cont + "em";
        cont++;
    }
    
    function ponerNegCur(){
        //parrafo.classList.toggle("neCurs");
        parrafo.classList.toggle("neCurs");
    }
    */

    /* Ejercicio04 */
    /*
    var btnF = document.getElementById("btnFondo");
    
    btnF.addEventListener("click", function(){
        btnF.parentNode.style.backgroundColor = "red";
    });
    */

    /* Ejercicio05 */
    /*
    var filas = document.querySelectorAll("tr");
    for (var i = 0; i < filas.length; i++ )
        filas[i].addEventListener("click", cambiarColor);

    function cambiarColor(){
        this.parentNode.lastElementChild.style.backgroundColor = "red";
    }
    */

    /* Ejercicio 06 */
    /*
    var btn = document.getElementById("aniadir");
    btn.addEventListener("click", function(){
        var parrafo = document.createElement("p");
        var texto = document.createTextNode("Lorem ipsum dolor sit amet, consectetur adipisicing elit. Enim doloremque, voluptatem qui eos dicta aliquam quos ipsam cupiditate, culpa iure deleniti alias, tempore animi, autem illum beatae voluptatum nesciunt unde.");
        parrafo.appendChild(texto);
        document.body.appendChild(parrafo);
    });
    */

    /* Ejercicio 07 */
    /*
    var btn = document.getElementById("aniadir");
    var tabla = document.getElementById("tabla");
    
    btn.addEventListener("click", function () {
        var clon = tabla.cloneNode(true);
        clon.style.display = "block";
        document.body.appendChild(clon);
    });
    */
};