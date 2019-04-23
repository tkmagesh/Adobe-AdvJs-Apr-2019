var products = [
	{id : 6, name : 'Pen', cost : 50, units : 20, category : 'stationary'},
	{id : 9, name : 'Ten', cost : 70, units : 70, category : 'stationary'},
	{id : 3, name : 'Len', cost : 60, units : 60, category : 'grocery'},
	{id : 5, name : 'Zen', cost : 30, units : 30, category : 'grocery'},
	{id : 1, name : 'Ken', cost : 20, units : 80, category : 'utencil'},
];

console.group('Default List');
console.table(products);
console.groupEnd();

console.group('Sort');
console.group('Default sort [products by id]');
function sort(){};
sort();
console.table(products);
console.groupEnd();

console.group('Any list by any attribute');
function sort(){};
console.group('products by cost');
sort();
console.table(products);
console.groupEnd();

console.group('products by units');
sort();
console.table(products);
console.groupEnd();

console.groupEnd();
console.groupEnd();

console.group('Filter');
console.group('Default filter [stationary products]');
function filter(){}
filter();
console.table(products);
console.groupEnd();
console.groupEnd();


