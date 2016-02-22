<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <!-- IE debe usar el último motor de renderizado -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- La página debe ocupar todo el ancho disponible en el navegador del dispositivo -->
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Plantilla</title>
    <!-- Se vincula el archivo CSS de Bootstrap -->
    <link rel="stylesheet" href="css/bootstrap.css">
    <!-- Tema opcional -->
    <link rel="stylesheet" href="css/bootstrap-theme.css">
    <!-- Se cargan los scripts necesarios para que Bootstrap funcione 
        con HTML 5 y CSS 3 en IE8+ -->
    <!--[if lt IE 9]>
            <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
            <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
        <![endif]-->
    <!-- CSS propio que machaca al css de bootstrap -->
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <?php require('php.php'); ?>
        <h1>Ejercicio01</h1>
        <table>
            <tr>
                <th>CodProf</th>
                <th>Nombre</th>
            </tr>
            <?php cargarProfesTabla(); ?>
        </table>
        <p>
            <?php echo obtenerJSON(); ?>
        </p>
        <br>
        <form method="post" action="php.php?option=agregar">
            <label for="cod">Codigo</label>
            <input type="text" name="cod">
            <label for="nombre">Nombre</label>
            <input type="text" name="nombre">
            <label for="contra">Contra</label>
            <input type="text" name="contra">
            <label for="tipo">Tipo</label>
            <input type="text" name="tipo">
            <input type="submit">
        </form>

        <!-- Se cargan los archivos JavaScript de jQuery y Bootstrap -->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
        <script src="js/bootstrap.min.js"></script>
        <script src=""></script>
        <!-- ruta jQuery -->
        <script src="javaS.js"></script>
</body>

</html>