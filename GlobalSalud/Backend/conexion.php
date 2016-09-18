<?php

class Conexion extends mysqli {
	
	public function __construct() {
	 // parent::__construct('localhost','l3000498_pruebas','Apolo2016','l3000498_pruebas');
		parent::__construct('localhost','root','root','Pruebas');
		$this->set_charset("utf8");
	}

	public function rows($query) {
		return mysqli_num_rows($query);
	}

	public function liberar($query) {
		return mysqli_free_result($query);
	}

	public function recorrer($query) {
		return mysqli_fetch_array($query);
	}

}


?>