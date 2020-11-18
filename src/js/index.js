

const arr = [ 15, 12 ,45];

let myFunc = (a , b) => {
    console.log(a, b)
    console.log(`too : ${a}`);
}

const arr2 = [...arr, 44, 1223];

myFunc(...arr2);