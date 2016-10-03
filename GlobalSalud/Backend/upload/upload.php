<?php

$target_dir = "upload/";
$target_file = $target_dir . basename($_FILES["imagen"]["name"]);
move_uploaded_file($_FILES["imagen"]["tmp_name"], "./" . $_FILES["imagen"]["name"]);
echo "http://" . $_SERVER['SERVER_NAME'] . "/" . $target_file;

?>