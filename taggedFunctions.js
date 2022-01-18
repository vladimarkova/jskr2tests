const taggedF = function(strings, ...expressions) { // the spread operator gives us the varibales values as an array
    console.log(strings);
    console.log(typeof expressions);
    console.log(expressions);
}

const someFood = 'spaghetti';
const someDrink = 'red wine';

taggedF`I really like ${someFood} and ofthen combine it with ${someDrink} for supper.`;


// Spread operator example

function myFunction(someThings) {
    console.log(someThings);
}

myFunction(['some', true, 'other', 5, { name: 'George', age: 27 }]);

// So the upper case is equivalent to this, es6

function myFunction(...someThings) {
    console.log(someThings);
}

myFunction('some', true, 'other', 5, { name: 'George', age: 27 });