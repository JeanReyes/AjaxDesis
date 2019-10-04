<?php
    include 'conect.php';

    
   
    $cmd = $_GET['cmd'];
    $resultado = "";

    switch ($cmd){
        case 'region': //MUESTRA LAS REGIONES

            $consulta   = "SELECT * FROM region";
            $param      = array();
            $resultado  = pg_query_params($con, $consulta, $param);

            $i=0;
            $datos = array();
            while ($regiones = pg_fetch_array($resultado)){
                $datos[$i] = $regiones;
                $i++;   
            }
            $json = json_encode($datos);
            echo $json;
        break;
        
        case 'comuna': //MUESTRA LAS COMUNAS

            $select ="";
            $idregion   = $_GET['idregion'];
            $consulta   = "SELECT * FROM comuna WHERE idregion = $1";
            $param      = array($idregion);
            $resultado  = pg_query_params($con, $consulta, $param);
            /*
            while ($comunas = pg_fetch_array($resultado)){
                $select.= '<option value="'.$comunas['idcomuna'].'">"'.$comunas['nombre'].'"</option>';
            }
                       
            echo $select;
            */
            
            $i=0;
            $datos = array();
            while ($comunas = pg_fetch_array($resultado)){
                $datos[$i] = $comunas;
                $i++;   
            }
            $json = json_encode($datos);
            echo $json;
            
            break;
        case 'candidato': //MUESTRA LOS CANDIDATOS

            $consulta   = "SELECT * FROM candidato";
            $param      = array();
            $resultado  = pg_query_params($con, $consulta, $param);

            $i=0;
            $datos = array();
            while ($candidato = pg_fetch_array($resultado)){
                $datos[$i] = $candidato;
                $i++;   
            }
            $json = json_encode($datos);
            echo $json;

        break;

        case 'insertar':
            $nombre     = $_GET['nombre'];
            $alias      = $_GET['alias'];
            $rut        = $_GET['rute'];
            $email      = $_GET['email'];
            $web        = $_GET['web'];
            $redes      = $_GET['redes'];
            $tv         = $_GET['tv'];
            $amigos     = $_GET['amigos'];
            $comuna     = $_GET['comuna'];
            $candidato  = $_GET['candidato'];

            var_dump($nombre, $alias, $rut, $email, $web, $tv, $redes, $amigos, $amigos, $comuna, $candidato);
            
            $consulta   = "INSERT INTO votante (nombreapellido, alias, rut, email, web, tv, redes, amigos, idcomuna, idcandidato) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)";
            $param      = array($nombre, $alias, $rut, $email, $web, $tv, $redes, $amigos, $comuna, $candidato);
            $resultado  = pg_query_params($con, $consulta, $param);

        break;

        case 'mostrarResumen':

            $consulta   = "SELECT candidato.nombre, COUNT(votante.idvotante) AS voto FROM votante INNER JOIN candidato ON votante.idcandidato = candidato.idcandidato GROUP BY votante.idcandidato, candidato.nombre";
            $param      = array();
            $resultado  = pg_query_params($con, $consulta, $param);

            $i=0;
            $datos = array();
            while ($candidato = pg_fetch_array($resultado)){
                $datos[$i] = $candidato;
                $i++;   
            }
            $json = json_encode($datos);

            $resultado = '[mostrarResumen]'.$json;
            echo $resultado;

        break;
        
        case 'mostrarVotos':

            $consulta   = "SELECT * FROM votante INNER JOIN comuna ON votante.idcomuna = comuna.idcomuna";
            $param      = array();
            $resultado  = pg_query_params($con, $consulta, $param);

            $i=0;
            $datos = array();
            while ($votante = pg_fetch_array($resultado)){
                $datos[$i] = $votante;
                $i++;   
            }
            $json = json_encode($datos);

           //$resultado = '[mostrarResumen]'.$json;
            echo $json;

        break;

        case 'eliminarVotos':

            $idvoto = $_GET['idvoto'];
            $consulta   = "DELETE FROM votante WHERE idvotante = $1";
            $param      = array($idvoto);
            $resultado  = pg_query_params($con, $consulta, $param);

        break;

        default :

            echo "comando no valido";


    }
?>