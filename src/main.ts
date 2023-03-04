let username = "Will";
console.log(username);

// let a = 12;
// let b = '6';
// let c = 2;


// console.log(a/b); //error here as b is a string and a is not. Even though this works with JS and shows up in the Live server console it is wrong and it could be better.



// to fix this:

let a: number = 12
let b: number = 6
let c: number = 2

//remember to set noEmitOnError to true so that when the compiler doesn't like something it doesn't still put the error out.

console.log(c*b)