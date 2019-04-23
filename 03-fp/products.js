var products = [
	{id : 6, name : 'Pen', cost : 50, units : 20, category : 'stationary'},
	{id : 9, name : 'Ten', cost : 70, units : 70, category : 'stationary'},
	{id : 3, name : 'Len', cost : 60, units : 60, category : 'grocery'},
	{id : 5, name : 'Zen', cost : 30, units : 30, category : 'grocery'},
	{id : 1, name : 'Ken', cost : 20, units : 80, category : 'utencil'},
];

function describe(title, fn){
	console.group(title);
	fn();
	console.groupEnd();
}

describe('Default List', function(){
	console.table(products);
});

describe('Sort', function(){
	describe('Default sort [products by id]', function(){
		function sort(){
			for(var i=0; i < products.length-1; i++)
				for(var j=i+1; j < products.length; j++)
					if (products[i].id > products[j].id){
						var temp = products[i];
						products[i] = products[j];
						products[j] = temp;
					}
		};
		sort();
		console.table(products);
	});

	describe('Any list by any attribute', function(){
		function sort(list, attrName){
			for(var i=0; i < list.length-1; i++)
				for(var j=i+1; j < list.length; j++)
					if (list[i][attrName] > list[j][attrName]){
						var temp = list[i];
						list[i] = list[j];
						list[j] = temp;
					}
		};
		describe('products by cost', function(){
			sort(products, 'cost');
			console.table(products);
		});

		describe('products by units', function(){
			sort(products, 'units');
			console.table(products);
		});

	});

	describe('Any list by any comparer', function(){
		function sort(list, comparer){
			for(var i=0; i < list.length-1; i++)
				for(var j=i+1; j < list.length; j++)
					if (comparer(list[i], list[j]) > 0){
						var temp = list[i];
						list[i] = list[j];
						list[j] = temp;
					}
		};

		describe('products by value [ value = cost * units ]', function(){
			var compareProductsByValue = function(p1, p2){
				var p1Value = p1.cost * p1.units,
					p2Value = p2.cost * p2.units;
				if (p1Value < p2Value) return -1;
				if (p1Value > p2Value) return 1;
				return 0;
			}
			sort(products, compareProductsByValue);
			console.table(products);
		})
	})


});

describe('Filter', function(){
	describe('Default filter [stationary products]', function(){
		function filter(){}
		filter();
		console.table(products);
	});

	describe('Any list by any criteria', function(){
		function filter(list, predicate){
			var result = [];
			for(var index = 0, count = list.length; index < count; index++)
				if (predicate(list[index]))
					result.push(list[index]);
			return result;
		}

		function negate(predicate){
			return function(){
				return !predicate.apply(undefined, arguments);
			}
		}

		describe('filter products by cost', function(){
			var costlyProductPredicate = function(product){
				return product.cost > 50;
			}
			describe('costly products [ cost > 50 ]', function(){
				var costlyProducts = filter(products, costlyProductPredicate);
				console.table(costlyProducts);
			});

			describe('affordable products [ !costlyProduct ]', function(){
				/*var affordableProductProdicate = function(product){
					return !costlyProductPredicate(product);
				};*/
				var affordableProductProdicate = negate(costlyProductPredicate);
				var affordableProducts = filter(products, affordableProductProdicate);
				console.table(affordableProducts);
			});

		});

		describe('filter products by units', function(){
			var underStockedProductsPredicate = function(product){
				return product.units < 50;
			};
			describe('filter understocked products [ units < 50 ]', function(){	
				var underStockedProducts = filter(products, underStockedProductsPredicate);
				console.table(underStockedProducts);
			});

			describe('filter well stocked products [ units >= 50 ]', function(){
				/*var wellStockedProductPredicate = function(product){
					return !underStockedProductsPredicate(product);
				};*/
				var wellStockedProductPredicate = negate(underStockedProductsPredicate);
				var wellStockedProducts = filter(products, wellStockedProductPredicate);
				console.table(wellStockedProducts);
			})
		})
	});
});


