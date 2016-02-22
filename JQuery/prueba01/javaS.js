$(document).ready(function(){
    var $texto; var $lista = $('ul');
    
    $('button').click(function(){
        $texto = $('input[name="texto"]').val();
        $lista.append('<li>'+$texto+'</li>');
    });
    
    $lista.on('click', 'li', function(){
        $(this).remove();
    });
});