$(document).ready(function () {
    var $fila = $('#trClonar');
    var $tabla = $('tbody');
    var texto;
    
    $('button').click(function () {
        texto = $('input[name="texto"]').val();
        var $clon = $fila.clone();
        var $colum1 = $clon.children().get(0);
        $($colum1).html(texto);
        
        $tabla.append($clon);
        $clon.show(1000);
    });
    $tabla.on('click', 'button', function () {
        $(this).closest('tr').remove();
    });
});