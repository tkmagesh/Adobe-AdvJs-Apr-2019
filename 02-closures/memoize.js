var isPrime = (function(){ 
	function checkPrime(n){
		console.log('processing ', n);
		if (n <= 3) return true;
		for(var index = 2; index <= (n/2); index++)
			if (n % index === 0) return false;
		return true;
	}

	var cache = {};

	return function(n){
		if (typeof cache[n] === 'undefined')
			cache[n] = checkPrime(n);	
		return cache[n];
	}
})();


var isOddOrEven = (function(){

	function checkOddOrEven(n){
		console.log('processing ', n);
		return n % 2 === 0 ? 'even' : 'odd';
	}
	var cache = {};

	return function(n){
		if (typeof cache[n] === 'undefined')
			cache[n] = checkOddOrEven(n);	
		return cache[n];
	}
})();



function memoize(fn){
	
	var cache = {};

	return function(n){
		if (typeof cache[n] === 'undefined')
			cache[n] = fn(n);	
		return cache[n];
	}
}


var isPrime = memoize(function checkPrime(n){
	console.log('processing ', n);
	if (n <= 3) return true;
	for(var index = 2; index <= (n/2); index++)
		if (n % index === 0) return false;
	return true;
});

var isOddOrEven = memoize(function checkOddOrEven(n){
	console.log('processing ', n);
	return n % 2 === 0 ? 'even' : 'odd';
});