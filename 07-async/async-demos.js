(function(){

	function addSync(x,y){
		console.log(`	[@Service] processing ${x} and ${y}`);
		var result = x + y;
		console.log(`	[@Service] returning the result`);
		return result;
	}

	function addSyncClient(x,y){
		console.log(`[@Client] triggering addSync`);
		var result = addSync(x,y);
		console.log(`[@Client] result = ${result}`);
	}

	window['addSyncClient'] = addSyncClient;

	function addAsync(x,y, callback){
		console.log(`	[@Service] processing ${x} and ${y}`);
		setTimeout(function(){
			var result = x + y;
			console.log(`	[@Service] returning the result`);
			callback(result);
		}, 5000);
	}

	function addAsyncClient(x,y){
		console.log(`[@Client] triggering addAsync`);
		addAsync(x,y, function(result){
			console.log(`[@Client] result = ${result}`);
		});;
	}

	window['addAsyncClient'] = addAsyncClient;


	function addAsyncPromise(x,y){
		var p = new Promise(function(resolveFn, rejectFn){
			console.log(`	[@Service] processing ${x} and ${y}`);
			setTimeout(function(){
				var result = x + y;
				console.log(`	[@Service] returning the result`);
				resolveFn(result);
			}, 5000);
		});
		return p;
	}

	//window['addAsyncPromise'] = addAsyncPromise;

	

	/*function addAsyncPromiseClient(x,y){
		console.log(`[@Client] triggering addSync`);
		addAsyncPromise(x,y)
			.then(function(result){
				console.log(`[@Client] result = ${result}`);		
			})
	}*/

	async function addAsyncPromiseClient(x,y){
		console.log(`[@Client] triggering addSync`);
		var result = await addAsyncPromise(x,y);
		console.log(`[@Client] result = ${result}`);
	}

	window['addAsyncPromiseClient'] = addAsyncPromiseClient;

})();


/*
var p2 = p.then(function(result){
	console.log(`[@Client] result = ${result}`);
	var p2 = new Promise(function(resolveFn, rejectFn){
		setTimeout(function(){
			var doubleResult = result * 2;
			resolveFn(doubleResult);
        }, 5000);
	});
	return p2;
});

var p2 = p.then(function(result){
	console.log(`[@Client] result = ${result}`);
	var p2 = new Promise(function(resolveFn, rejectFn){		
        var doubleResult = result * 2;
        resolveFn(doubleResult);
	});
	return p2;
});

var p2 = p.then(function(result){
	console.log(`[@Client] result = ${result}`);
	var p2 = Promise.resolve(result * 2);
	return p2;
});

var p2 = p.then(function(result){
	console.log(`[@Client] result = ${result}`);
	return result * 2;
});

*/
