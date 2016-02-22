<?php
    $opcion = "nada";
    if (isset($_GET["option"]))
        $opcion = $_GET["option"];
        
    if ($opcion == "agregar")
        insertarProfe();

    function dameConexion(){
        $db_host="localhost";
        $db_nombre="horario";
        $db_usuario="root";
        $db_contra="root";

        return mysqli_connect($db_host, $db_usuario, $db_contra, $db_nombre);
    }
    
    function cargarProfesTabla() {
        $conexion = dameConexion();
        $consulta = "select codprof, nombre from profesor";
        $resultados = mysqli_query($conexion, $consulta);
        while ($fila = mysqli_fetch_row($resultados))
            echo "<tr><td>$fila[0]</td><td>$fila[1]</td></tr>";

        mysqli_close($conexion);
    }

    function obtenerJSON() {
        $conexion = dameConexion();
        $consulta = "select codprof, nombre from profesor";
        $resultados = mysqli_query($conexion, $consulta);

        $myArray = array();

        while ($fila = mysqli_fetch_assoc($resultados))
            $myArray[] = $fila;

        mysqli_close($conexion);
        return json_encode($myArray, JSON_UNESCAPED_UNICODE);
    }
    
    function insertarProfe(){
        $conexion = dameConexion();
        $insert = "insert into profesor (codProf, nombre, tipo, contra) values ('".$_POST["cod"]."', '".$_POST["nombre"]."', '".$_POST["tipo"]."', '".$_POST["contra"]."')";
        mysqli_query($conexion, $insert);
        echo "hecho";
        mysqli_close($conexion);
    }
?>