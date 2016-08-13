<?php
    require("conexion.php");

    if(isset($_POST['insert']))
    {
        $db = new Conexion();

        $title=$_POST['title'];
        $duration=$_POST['duration'];
        $price=$_POST['price'];

        $sql = "INSERT INTO Solicitudes (CARNETSOLICITANTE,NOMBRESOLICITANTE,MEDICO) VALUES ('$title','$price','$duration')";

        $db->query($sql) or die('es una pija');
        
        echo 'ok';

$db->close();
    }
    else {
        echo 'error';
    }
?>