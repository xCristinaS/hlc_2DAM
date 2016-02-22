$(document).ready(function(){
    var $texto; var $tabla = $('tbody');
    
    $('button').click(function(){
        $texto = $('input[name="texto"]').val();
        $tabla.append('<tr><td>'+$texto+'</td><td><button>borrar</button></td></tr>');
    });
    
    $tabla.on('click', 'button', function(){
        $(this).closest('tr').remove();
    });
});