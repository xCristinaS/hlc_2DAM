$(document).ready(function () {
    var $lista = $('ul');

    $.getJSON("http://localhost:3000/alumnos", function (data) {
        for (var i = 0; i < data.length; i++) {
            var $boton = $('<button>Eliminar</button>');
            $boton.data("alumno", data[i].id);

            $boton.on("click", function () {
                var $this = $(this);
                var idAlumno = $this.data("alumno");

                $.ajax({
                    url: "http://localhost:3000/alumnos/" + idAlumno,

                    type: "DELETE",
                    // Cuando la respueta se ha obtenido correctamente.
                    success: function (response) {
                        $this.parent().remove();

                    }
                });
            });
            $miLi = $('<li>' + data[i].nombre + '</li>');
            $miLi.append($boton);
            $lista.append($miLi);
        }
    })
});