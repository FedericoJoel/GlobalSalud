function verificarLogin(){
    var data=0;
    var datosDNI = $("#DNI").val();
    var datosnAfiliado = $("#nAfiliado").val();
    
    var dataString="DNI="+datosDNI+"&nAfiliado="+datosnAfiliado+"&login=";

    URLValidacion = "http://www.gestionarturnos.com/Fede/verificacionmysql.php";

    if(($.trim(datosDNI).length>0) && ($.trim(datosnAfiliado).length>0))
    {
        $.ajax({
            type: "POST",
            url:URLValidacion,
            data: dataString,
            crossDomain: true,
            cache: false,
            beforeSend: function(){ document.getElementById("login").innerHTML = "Conectando..";},
            error: function(){
                alert("Error de conexion");
                document.getElementById("login").innerHTML = "Ingresar";
            },
            success: function(data){
                if(data=="ok")
                {
                    myNavigator.resetToPage('slideIndex.html');
                    //$mobile.changePage("/www/home.html");
                    //$("#Login").val("Ingresar");
                }
                    else if(data=="error")
                {
                    alert("Usuario y contraseña incorrectos");
                    document.getElementById("login").innerHTML = "Ingresar";
                }
            }

        });
    }
    return false;
}
