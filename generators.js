function* generatorExample() {
    console.log('Hello from Generator...!');

    yield 8;
    yield 9;
    yield 10; 

    return 11; // done goes true
    yield 12; // value goes undefined
};

const generator = generatorExample();
console.log(generator); // Generator Object

const ourFirstGenValue = generator.next(); // 'Hello from Generator...!'
console.log(ourFirstGenValue); // { value: 8, done: false }

for (n of generator) {
    console.log(n); // logs 9 and 10, as 8 is already exhausted by the previous next() 
}



function* createSquaredNumbersGenerator(max) { // Without arg and while(true), we will have infinite generator
    let n = 0;

    while(n < max) {
        n++;
        yield n*n;
    }
}

squaredNumbersGenerator = createSquaredNumbersGenerator(5);

console.log(squaredNumbersGenerator.next()); // { value: 1, done: false }

for (n of squaredNumbersGenerator) {
    console.log(n); // 4, 9, 16, 25
} 



function* createUniqueNamesGenerator(names) {
    const available = [...names];

    while (available.length !== 0) {
        let index = Math.floor(Math.random() * available.length);
        const value = available[index];
        available.splice(index, 1);

        yield value;
    }
}

const names = ['Tommy', 'Marry', 'Georgy', 'Tanya', 'Yavor'];

// const uniqueNamesGenerator = createUniqueNamesGenerator(names);

for (let i = 0; i < 5; i++) {
    const uniqueNamesGenerator = createUniqueNamesGenerator(names);
    for (person of uniqueNamesGenerator) {
        console.log(person);
    }
    console.log('\n');
}



function* genF(msg) {
    console.log(msg);               
    let back = yield 10;            
    console.log(back);              
    yield 20;                       
  } 
  
  let genInstance = genF('test');
  let genInstance2 = genF('lest');
  
  let res = genInstance.next(5);    // logs 'test' as it is created with 'test'
  console.log( res );               // { value: 10, done: false } 
  
  res = genInstance.next(6);        // logs 6
  console.log( res );               // { value: 20, done: false }
  
  res = genInstance.next('!!!');

  console.log( res );
  genInstance2.next()  // logs 'lest' as it is created with 'lest'