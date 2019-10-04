function validar (){
    var nombre          = document.getElementById('nombre');
    var alias           = document.getElementById('alias');
    var rute            = document.getElementById('rut');
    var email           = document.getElementById('email');
    var web             = document.getElementById('web');
    var redes           = document.getElementById('redes');
    var tv              = document.getElementById('tv');
    var amigos          = document.getElementById('amigos');
    var comuna          = document.getElementById('comuna');
    var comunaSelect    = comuna.options[comuna.selectedIndex];

    var candidato       = document.getElementById('candidato');
    var candidatoSelect = candidato.options[candidato.selectedIndex];


   

    expresion = {
        nombreExpresion : /^[áéíóúAÉÍÓÚÑña-zA-Z]+\s{1,1}[áéíóúAÉÍÓÚÑña-zA-Z]+$/,
        aliasExpresion  :/^(?:[0-9]+[áéíóúAÉÍÓÚÑña-zA-Z]|[áéíóúAÉÍÓÚÑña-zA-Z]+[0-9])[áéíóúAÉÍÓÚÑña-zA-Z0-9]*$/,
        emailExpresion  :/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/
    }

   

    if (nombre.value.trim() === ""){
		alert('El campo nombre y apellido es obligatorio');
		nombre.focus();
        return false;
    }
    if(!expresion.nombreExpresion.test(nombre.value)){
		alert('El nombre NO cumple con las espcificaciones, debe escribir nombre y apellido juntos');
		nombre.focus();
        return false;
    }
	if (alias.value.length <= 4 || !expresion.aliasExpresion.test(alias.value)){
		alert('El campo alias debe poseer al menos 5 caracteres de los cuales al menos1 debe ser numerico');
		alias.focus();
		return false;
	}	
	var validaRUT = validarRut(rute);

	if(validaRUT === false){
		alert('El Rut Ingreso es Invalido');
		rute.focus();
		return false;
	}
   
    if (rute.value.trim() === ""){
        alert('El campo RUT es obligatorio');
        return false;
    }

  
   if(!expresion.emailExpresion.test(email.value)){
	   alert('El correo ingresado no es valido');
	   email.focus();
       return false;
   }

   var enterar = comoSeEntero(web, redes, tv, amigos);

   if(enterar < 2){
       alert('Debe selecionar al menos 2 opciones de como se entero');
       return false;
   }

   //CONFIRMAR VOTO
   var confirmar = confirm("Esta seguro que quiere realizar su Voto"); 
   if (confirmar === true){
       insertarVoto(nombre, alias, rute, email, web, redes, tv, amigos, comunaSelect, candidatoSelect);
   }

}

//FUNCION PARA DAR FORMATO A RUT
function formatoRut (rut){
    rut.value = rut.value.replace(/[.-]/g, '').replace( /^(\d{1,2})(\d{3})(\d{3})(\w{1})$/, '$1.$2.$3-$4');
}

//FUNCION PARA VALIDAR COMO SE ENTERO
function comoSeEntero (web, redes, tv, amigos){
    var contador = 0;

    if (web.checked){
        contador++;
    }
    if(redes.checked){
        contador++;
    }
    if(tv.checked){
        contador++;
    }
    if(amigos.checked){
        contador++;
    }

    return contador;
}

//AUTOFUNCION PARA LLENAR REGIONES.
function traerRegion (){
    var xhttp;
    var regiones="";
    var i = 0;

    //id del select y lo llenamos
    var selectRegion = document.getElementById('region');

    if (window.XMLHttpRequest) {
        
        xhttp = new XMLHttpRequest();
    } else {
        
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");   
    }
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

       var regiones = JSON.parse(this.responseText);
           
           // console.log(regiones);
     
            for (i in regiones){
                selectRegion.innerHTML += '<option value="'+regiones[i].idregion+'">"'+regiones[i].nombre+'"</option>';
            }
        }
    }
    xhttp.open("GET", "command.php?cmd=region", true);
    xhttp.send();
}



//FUNCION PARA CARGAR COMUNAS
function cargarComunas (){
    //id del select y lo llenamos
    var xhttp;
    var comunas = "";
    var selectComunas = document.getElementById('comuna');
    selectComunas.innerHTML = "";
    var selectRegion = document.getElementById('region');
    var valorRegion = selectRegion.options[selectRegion.selectedIndex];

    if (window.XMLHttpRequest) {
       
        xhttp = new XMLHttpRequest();
    } else {
        
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");   
    }
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
               
            var comunas = JSON.parse(this.responseText);
            for (var i in comunas){
                selectComunas.innerHTML += '<option value="'+comunas[i].idcomuna+'">"'+comunas[i].nombre+'"</option>';
            }
        }    
    }
    xhttp.open("GET", "command.php?idregion="+valorRegion.value+"&cmd=comuna", true);
    xhttp.send();
    
}

function traerCandidato (){
    var xhttp;
    var i = 0;

    //id del select y lo llenamos
    var selectCandidato = document.getElementById('candidato');

    if (window.XMLHttpRequest) {
        
        xhttp = new XMLHttpRequest();
    } else {
        
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");   
    }
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

       var candidato = JSON.parse(this.responseText);
     
            for (i in candidato){
                selectCandidato.innerHTML += '<option value="'+candidato[i].idcandidato+'">"'+candidato[i].nombre+'"</option>';
            }
        }
    }
    xhttp.open("GET", "command.php?cmd=candidato", true);
    xhttp.send();
}

function insertarVoto (nombre, alias, rute, email, web, redes, tv, amigos, comunaSelect, candidatoSelect){
    var xhttp;
    var i = 0;
    
    if (window.XMLHttpRequest) {
        
        xhttp = new XMLHttpRequest();
    } else {
        
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");   
    }
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
            //imprimo la tabla mostrar votos
            mostrarVotos();
        }
    }
    xhttp.open("GET", "command.php?cmd=insertar&nombre="+nombre.value+
                                                "&alias="+alias.value+
                                                "&rute="+rute.value+
                                                "&email="+email.value+
                                                "&web="+web.checked+
                                                "&redes="+redes.checked+
                                                "&tv="+tv.checked+
                                                "&amigos="+amigos.checked+
                                                "&comuna="+comunaSelect.value+
                                                "&candidato="+candidatoSelect.value, true);
    xhttp.send();
}

function mostrarVotos (){
    var xhttp;
    var i = 0;
    var votos = document.getElementById('resumenVotos');
    votos.innerHTML = "";
    
    if (window.XMLHttpRequest) {
        
        xhttp = new XMLHttpRequest();
    } else {
        
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");   
    }

    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {

            var votante = JSON.parse(this.responseText);

            console.log(votante);

            for (var votantes of votante){
                votos.innerHTML += "<tr><td>"+votantes.nombreapellido+"</td><td>"
                                    +votantes.nombre+"</td><td>"
                                    +votantes.fechahora+"</td><td><button class='btn btn-danger' onclick='eliminarVoto("+votantes.idvotante+");' >Eliminar</button></td></tr>";
            }
            

       }
    }
    xhttp.open("GET", "command.php?cmd=mostrarVotos", true);
    xhttp.send();
}

//FUNCION ELIMINAR

function eliminarVoto (idvoto){
    var confirmar = confirm("Seguro de eliminar este voto");

    if (confirmar === true){

    

    if (window.XMLHttpRequest) {
        
        xhttp = new XMLHttpRequest();
    } else {
        
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");   
    }
    xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
            mostrarVotos();
       }
    }
    xhttp.open("GET", "command.php?cmd=eliminarVotos&idvoto="+idvoto, true);
    xhttp.send();
    }
}



//LLAMADA AJAX UTIL. PRUEBA

function mostrarResumenGeneral (){
    var envio = "GET"
    var ruta = "command.php?cmd=mostrarResumen";
    var formaenvio = true;
    var llamar = ajax (envio, ruta, formaenvio);
   
}




