<?php
    	$con = pg_connect(
            "host = localhost
            dbname = votante
            user = postgres
            password = 1234"
    
        )or die("error de conexion".pg_last_error());
?>