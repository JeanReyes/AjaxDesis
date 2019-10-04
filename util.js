function validarRut(rute){
    var tmpstr = "";
	var intlargo = rute.value
	if (intlargo.length> 0)
	{
		crut = rute.value
		largo = crut.length;
		if ( largo < 2 )
		{
			alert('Rut invalido')
			rute.focus()
			return false;
		}
		for ( i=0; i <crut.length ; i++ )
		if ( crut.charAt(i) != ' ' && crut.charAt(i) != '.' && crut.charAt(i) != '-' )
		{
			tmpstr = tmpstr + crut.charAt(i);
		}
		rut = tmpstr;
		crut=tmpstr;
		largo = crut.length;
 
		if ( largo> 2 )
			rut = crut.substring(0, largo - 1);
		else
			rut = crut.charAt(0);
 
		dv = crut.charAt(largo-1);
 
		if ( rut == null || dv == null )
		return 0;
 
		var dvr = '0';
		suma = 0;
		mul  = 2;
 
		for (i= rut.length-1 ; i>= 0; i--)
		{
			suma = suma + rut.charAt(i) * mul;
			if (mul == 7)
				mul = 2;
			else
				mul++;
		}
 
		res = suma % 11;
		if (res==1)
			dvr = 'k';
		else if (res==0)
			dvr = '0';
		else
		{
			dvi = 11-res;
			dvr = dvi + "";
		}
 
		if ( dvr != dv.toLowerCase() )
		{
			
			return false;
		}
		
		
	}
	

}

//FUNCION GENERICA PARA AJAX.

function ajax (envio, ruta, formaenvio){
	var xhttp;
	var i = false;
	

	if (window.XMLHttpRequest) {
		// code for modern browsers
		xhttp = new XMLHttpRequest();
	
	  } else {
		// code for old IE browsers
		xhttp = new ActiveXObject("Microsoft.XMLHTTP");
		
	 }
	 xhttp = new XMLHttpRequest();
	 xhttp.onreadystatechange = function() {
	 if (this.readyState == 4 && this.status == 200) {
			// llamo a la funcion respodender enviandoel resultado para evalue si hay algo
			 responder(this.responseText);
		}	
	}

    xhttp.open(envio, ruta, formaenvio);
	xhttp.send();
}

function responder (respuesta){
	if (respuesta != ""){

				//veirifico si existe en string en la respuesta enviada del command
			if (respuesta.indexOf('[mostrarResumen]') != -1){
				var resultado = respuesta.replace('[mostrarResumen]',"");
				var candidato = JSON.parse(resultado);

				//traigo el tcofy de la tabla
				var tablaResultadoFinal = document.getElementById('tablaResumenGeneral');
				
				tablaResultadoFinal.innerHTML = "";
                           
				for (var datos of candidato){
					tablaResultadoFinal.innerHTML += "<tr><td>"+datos.nombre+"</td><td>"+datos.voto+"</td></tr>";

				}
			}
		}
	}