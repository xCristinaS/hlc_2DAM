$(document).ready(function () {
    var firebase = new Firebase('https://myfirebase01.firebaseio.com/web');
    var $btn = $("#btn");
    var $txtAgregar = $("#txtAgregar");
    var $lista = $("#lista");
    var keyObject;

    $btn.click(function (event) {
        var texto = $txtAgregar.val();
        var myObject = firebase.push();
        var myObjectJson = {
            web: texto
        }
        keyObject = myObject.key();
        myObject.set(myObjectJson);
    });

    firebase.on("child_added", function (snapshot, prevChildKey) {
        var newWeb = snapshot.val();
        $lista.append('<li data-web="'+snapshot.key()+'"><p>'+newWeb.web+'</p></li>');
    });

    firebase.on("child_changed", function (snapshot) {
        var webModificada = snapshot.val();
       // console.log(webModificada)
        //console.log(snapshot.key())
        var $parrafo = $("[data-web='"+snapshot.key()+"']").closest('li').children('p');
        $parrafo.html(webModificada.web);
        
    }, function (errorObject) {
        console.log("error al actualizar");
    });
    
});