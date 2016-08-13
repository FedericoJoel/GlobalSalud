app.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});

app.filter('range', function() {
	return function(input, min, max) {
		min =parseInt(min);
		max = parseInt(max);
		for (var i=min; i<max; i++){
			input.push(i);

		}
		return input;
	}
});

app.filter('porcentaje',function() {
	return function(input) {
		return (!!input) ? input + '%' : '';
	}
})

app.filter('iniciales', function() {
	return function(input) {
		var palabra = input.split(" ");
		var iniciales = '';
		if(palabra.length > 1){
			for(var i=0; palabra.length > i; i++ ){
				console.log(palabra[i]);
				iniciales = iniciales + palabra[i].charAt(0); 
			}
			return iniciales; 
		}
		else {
			return input.charAt(0).toUpperCase();
		}
	}
})