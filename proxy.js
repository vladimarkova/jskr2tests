const car = {
    year: 1995,
    cubics: 2000,
    horsePowers: 136
};

console.log(car);

const proxifiedCar = new Proxy(car, {
    get: (obj, prop) => {
        console.log(`Getting ${prop} from object...`);
        return obj[prop] ? (obj[prop] + 'new') : '<missing property>'; 
    },
    set: (obj, prop, newValue) => {
        obj[prop] = 'Changed---> '+ newValue;
    }
});

console.log(proxifiedCar);
console.log(proxifiedCar.year);

proxifiedCar.cubics = 3000;
console.log(proxifiedCar.cubics);

console.log(proxifiedCar.engineType);