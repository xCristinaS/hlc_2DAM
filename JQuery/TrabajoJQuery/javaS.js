$(document).ready(function () {
    var $trBase = $('#trBase');
    var $tabla = $('table');
    var modoEditar = false;
    var contadorId;
    var idAux;
    var URL_JSON = "http://localhost:3000/alumnos/";

    $.getJSON(URL_JSON, function (alumnos) { // obtengo los alumnos del JSON
        for (var i = 0; i < alumnos.length; i++) { // recorro la lista de alumnos
            agregarAlumnoATabla(alumnos[i]); // voy agregandolos uno a uno a la tabla, configurándo todo lo necesario

            if (i == alumnos.length - 1) // obtengo el id del último alumno y lo almaceno en una variable para cuando vaya a agregar usar el contador como id del nuevo alumno. 
                contadorId = parseInt(alumnos[i].id) + 1;
        }
    });

    function agregarAlumnoATabla(alumno) {
        var $nuevaFila = $trBase.clone(); // clono la fila base creada en el html
        $nuevaFila = cargarAlumnoEnFila($nuevaFila, alumno); // cargo los datos del alumno en la fila que le paso como argumento a la función, en este caso, la fila clonada. 
        $nuevaFila.children('td').get(7).innerHTML = '<img class="btnEditar" src="imagenes/editar.png" alt="editar" data-alumno="' + alumno.id + '" data-toggle="modal" data-target="#myModal"/>';
        $nuevaFila.children('td').get(8).innerHTML = '<img class="btnBorrar" src="imagenes/borrar.png" alt="borrar" data-alumno="' + alumno.id + '"/>';
        $tabla.append($nuevaFila); // agrego la fila clonada a la tabla.  
        $nuevaFila.show(800); // la muestro. 
    }

    function cargarAlumnoEnFila(fila, alumno) {
        var repetidor = "No";

        if (alumno.repetidor)
            repetidor = "Sí";

        fila.children('td').get(0).innerHTML = '<img alt="foto" src="' + alumno.foto + '"/>'; // obtengo la primera columna de la fila clonada e introduzco la foto del alumno
        fila.children('td').get(1).textContent = alumno.nombre; // obtengo la segunda columna de la fila clonada e introduzco el nombre del alumno
        fila.children('td').get(2).textContent = alumno.telefono; // ... e introduzco el teléfono ... 
        fila.children('td').get(3).textContent = alumno.direccion; // ... e introduzco la dirección ... 
        fila.children('td').get(4).textContent = alumno.edad; // ... e introduzco el edad ... 
        fila.children('td').get(5).textContent = alumno.curso; // ... e introduzco el curso ... 
        fila.children('td').get(6).textContent = repetidor; // ... e introduzco su condición (repetidor o no) ...

        return fila;
    }

    // Configuro el evento "click" de los botones "btnBorrar" para que eliminen el alumno que llevan asociado del fichero JSON y elimine la fila de la tabla. 
    $(document).on('click', '.btnBorrar', function () {
        eliminarAlumnoDeJSON($(this).data("alumno"));
        $(this).closest('tr').remove();
    });

    // Elimina el alumno del fichero JSON. Si la operación se realizó con éxito muestra un Toast. 
    function eliminarAlumnoDeJSON(idAlumno) {
        $.ajax({
            url: URL_JSON + idAlumno,
            type: "DELETE",
            success: function (response) {
                configAndShowToast(0);
            }
        });
    }

    // Cuando se haga click en el botón de editar, establezco a true el la variable modoEditar y cargo los datos del alumno en la ventana modal.
    $(document).on('click', '.btnEditar', function () {
        modoEditar = true;
        cargarAlumnoEnModal($(this).data("alumno")); // paso el id del alumno que tiene asociado el botón como argumento.
    });

    // Obtengo los datos del alumno del fichero JSON. Hago una petición al servidor para que me devuelva los datos del alumno que indica "idAlumno" y relleno los campos del formulario de la ventada modal con sus datos.
    function cargarAlumnoEnModal(idAlumno) {
        resetCamposForm();
        $.getJSON(URL_JSON + idAlumno, function (alumno) {
            idAux = alumno.id; // almaceno el id del alumno que se pretende modificar en una variable global auxiliar, por si se realizan cambios, poder mantener el id del alumno.
            $('#txtFoto').val(alumno.foto);
            $('#txtNombre').val(alumno.nombre);
            $('#txtCur').val(alumno.curso);
            $('#txtTel').val(alumno.telefono);
            $('#txtDir').val(alumno.direccion);
            $('#txtEdad').val(alumno.edad);
            if (alumno.repetidor)
                $('#cbRep').prop("checked", true);
            else
                $('#cbRep').prop("checked", false);
        });
    }

    // Configuro el botón de aceptar que aparece en la ventana modal de tal modo que:
    $('#btnModal').click(function () {
        if (camposRellenosCorrectamente()) {
            if (!modoEditar) // si el modoEditar no está activado, significa que el modal fue lanzado desde el botón "agregarAlumno" y por tanto
                agregarNuevoAlumno(); // agrego un nuevo alumno
            else // en caso contrario, el modal fue lanzado desde el boton "btnEditar" y por tanto
                modificarAlumno(); // modifico los datos de ese alumno

            modoEditar = false; // establezco el valor del atributo modoEditar a false.
        } else {
            configAndShowToast(-1);
        }
    });

    function agregarNuevoAlumno() {
        var alumno = obtenerDatosForm(); // obtengo los datos del alumno del formulario de la ventana modal e introduzco el nuevo alumno en el fichero JSON.
        $.post(
            URL_JSON,
            alumno,
            function (respuesta) {
                configAndShowToast(1);
            }
        );
        contadorId++; // incremento el contador de ID
        agregarAlumnoATabla(alumno); // agrego el alumno a la tabla
    }

    function modificarAlumno() {
        var alumno = obtenerDatosForm(); // obtengo los datos del alumno del formulario y me creo el objeto alumno. Después, sobreescribo el alumno.
        $.ajax({
            url: URL_JSON + idAux,
            type: 'PUT',
            data: alumno,
            success: function (data) {
                configAndShowToast(2); // muestro un Toast.
            }
        });
        cargarAlumnoEnFila($('[data-alumno="' + idAux + '"]').closest('tr'), alumno); // vuelvo a cargar los datos del alumno en su correspondiente fila. 
    }

    function obtenerDatosForm() {
        var aux;
        var alumno;
        if (modoEditar) // Si estoy en modo editar
            aux = idAux; // el id del alumno será el almacenado en el auxiliar
        else // en caso contrario
            aux = contadorId; // el id del alumno será el que indique el contador

        alumno = { // creo un nuevo objeto alumno con los valores del formulario
            id: aux,
            foto: $('#txtFoto').val(),
            nombre: $('#txtNombre').val(),
            curso: $('#txtCur').val(),
            telefono: $('#txtTel').val(),
            direccion: $('#txtDir').val(),
            edad: $('#txtEdad').val(),
            repetidor: $('#cbRep').prop("checked")
        }
        return alumno;
    }

    function configAndShowToast(num) { // Configuro las opciones del Toast.
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": true,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
        }
        if (num == 0)
            toastr.success("El alumno ha sido eliminado.", "Operación realizada con éxito.");
        else if (num == 1)
            toastr.success("El nuevo alumno ha sido agregado.", "Operación realizada con éxito.");
        else if (num == -1)
            toastr.error("Debe rellenar los campos.", "Operación fallida");
        else
            toastr.success("El alumno ha sido modificado.", "Operación realizada con éxito.");
    }

    $('#btnCerrarModal').click(function () { // Si la ventana modal se cierra sin darle al botón aceptar
        modoEditar = false; // establezco a false el valor del modoEditar
    });

    $('#btnAgregar').click(function () {
        resetCamposForm();
    });

    function resetCamposForm() {
        $('#txtFoto').val("");
        $('#txtNombre').val("");
        $('#txtCur').val("");
        $('#txtTel').val("");
        $('#txtDir').val("");
        $('#txtEdad').val("");
        $('#cbRep').prop("checked", false);

        $(':input').removeClass("error");
    }

    function camposRellenosCorrectamente() {
        var resp = true;
        var $camposTexto = $(':text');
        var $edad = $('#txtEdad');

        if ($edad.val() == "" || $edad.val() <= 0)
            resp = false;

        for (var i = 0; resp && i < $camposTexto.length; i++)
            if ($camposTexto[i].value === "")
                resp = false;

        return resp;
    }

    $(':text').on('input', function () {
        var $this = $(this);
        if ($this.val() == "")
            $this.addClass("error");
        else
            $this.removeClass("error");
    });

    $('#txtEdad').on('input', function () {
        var $this = $(this);
        if ($this.val() == "" || $this.val() <= 0)
            $this.addClass("error");
        else
            $this.removeClass("error");
    });

});