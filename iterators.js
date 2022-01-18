const animals = ['cat', 'dog', 'froggy'];

const animalArrayIterator = animals[Symbol.iterator]();

console.log(animalArrayIterator);

console.log(animalArrayIterator.next());
console.log(animalArrayIterator.next());
console.log(animalArrayIterator.next());
console.log(animalArrayIterator.next());

for (animal of animals) {
    console.log(animal);
}

function squared() {
    let n = 0;

    return {
        next() {
            if (n <= 5){
                n++;
                return {
                    value: n*n,
                    done: false
                }
            } else {
                return {
                    value: undefined,
                    done: true
                }
            }
        }
    }
};

const sqIterator = squared();

console.log(sqIterator.next());
console.log(sqIterator.next());
console.log(sqIterator.next());
console.log(sqIterator.next());
console.log(sqIterator.next());
console.log(sqIterator.next());
console.log(sqIterator.next());

function upgradedSquared(max) {
   return {
    [Symbol.iterator]() {
        let n = 0;

        return {
            next() {
                if (n <= max){
                    n++;
                    return {
                        value: n*n,
                        done: false
                    }
                } else {
                    return {
                        value: undefined,
                        done: true
                    }
                }
            }
        }
    }
   };
};

console.log(upgradedSquared(7));

for (n of upgradedSquared(7)) {
    console.log(n);
}

// Array desctructuring

const [a1, b1, c1] = [4, 5, 6];
const [a2, b2, c2] = upgradedSquared(7);

console.log(a2, b2, c2);

class NumberList {
    constructor() {
        this.numbers = [1, 2, 3, 4];
    }

    [Symbol.iterator]() {
        let numbers = this.numbers;
        let index = -1;

        return {
            next() {
                return {
                    value: numbers[++index],
                    done: index >= numbers.length
                }
            }
        }
    }
}

const numListIterator = new NumberList()[Symbol.iterator]();

console.log(numListIterator.next());
console.log(numListIterator.next());
console.log(numListIterator.next());
console.log(numListIterator.next());
console.log(numListIterator.next());

const numList = new NumberList();

for(const number of numList) {
    console.log(number);
}