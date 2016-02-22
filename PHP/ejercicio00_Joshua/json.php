<?php
    header('content-type: application/json; charset-utf.8');
    $miArray = array("manzana"=>"verde", "uva"=>"Morada", "fresa"=>"roja");
    print_r(json_encode($miArray));
?>