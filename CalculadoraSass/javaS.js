window.onload = function () {
    var numeros = document.getElementsByClassName("num");
    var resultado = document.getElementById("resultado");
    var limpiar = document.getElementById("reset");
    var punto = document.getElementById("punto");
    var operador = document.getElementsByClassName("operacion");
    var igual = document.getElementById("igual");
    var operadorPuesto = false;
    var operacionHecha = false;

    for (var i = 0; i < numeros.length; i++)
        numeros[i].addEventListener("click", function () {
            if (operacionHecha) { // para resetear la salida una vez que se ha pulsado el igual.
                resultado.innerHTML = "";
                operacionHecha = false;
            }
            resultado.innerHTML += this.textContent; // escribo el numero sobre el que se ha pulsado
            operadorPuesto = false; // lo pongo a falso para que me deje poner otro signo (+,-,/,*)
        });

    for (var i = 0; i < operador.length; i++)
        operador[i].addEventListener("click", function () {
            if (!operadorPuesto) {
                if (operacionHecha) {
                    resultado.innerHTML = "";
                    operacionHecha = false;
                }
                resultado.innerHTML += this.textContent; // escribo el operador pulsado.
                operadorPuesto = true; // indico que ya se ha puesto un operador.
                punto.addEventListener("click", habilitarPunto); // vuelvo ha habilitar el punto.
            }
        });

    limpiar.addEventListener("click", function () {
        resultado.innerHTML = ""; // limpio la cadena de resultados y habilito el punto cuando se pulsa la "C"
        punto.addEventListener("click", habilitarPunto);
    });

    punto.addEventListener("click", habilitarPunto);

    function habilitarPunto() {
        if (operacionHecha) {
            resultado.innerHTML = "";
            operacionHecha = false;
        }
        resultado.innerHTML += "."; // escribo el "."
        operadorPuesto = true; // para que no me deje escribir un operador justo despues de un "."
        punto.removeEventListener("click", habilitarPunto); // deshabilito el click del "."
    };

    igual.addEventListener("click", function () {
        if (resultado.textContent !== "") { // si la cadena no está vacía, cuando hago click en el "=":
            aux = resultado.textContent.replace(/x/g, "*"); // reemplazo la "x" por el operador "*"
            caracterFinal = aux.charAt(aux.length - 1); // cojo el último carácer 
            if (caracterFinal === "+" || caracterFinal === "*" || caracterFinal === "/" || caracterFinal === "-") // si el último caracter es algún operador
                aux = aux.substring(0, aux.length - 1); // lo saco de la cadena
            resultado.innerHTML = eval(aux); // hago la operación
            operacionHecha = true; 
        }
    });
};