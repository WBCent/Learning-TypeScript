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

/*
Typescript is a strongly typed language. TS is a statically typed language which means types are checked at compile time. JavaScript conversely is a dynamically typed language. This means types are checked at run time.
Benefits of statically typing include: self-documenting, catch errors in development
*/

let myName: string = 'Dave' //looks just like JavaScript but intellisense reads it differently. Typescript you can either choose to let the thing infer the type or you can write it using : string.
// myName = 42 //compiler does not like this 

// let myName: string; //you can declare variables like this.

let meaningOfLife: number;
let isLoading: boolean;
let album: any; //any allows any type of value and deletes typescript which defeats the point of typescript and allows any type with that.

myName = "John";
meaningOfLife = 42;
isLoading = true;

//creating a function

// const sum = (a, b) => {
//     return a + b
// } here the problem is that a and b are declared as any which TS doesn't like in functions

const sum = (a: number, b: number) => {
    return a + b
}

//can have union types where it can be more than one type. FOr example:
// let album: string | number;

let postId: string | number;
let re: RegExp = /\w+/g;  //this is a regex, so we assign it regex type

let stringArr = ['one', 'hey', 'Dave']
let guitars = ["Strat", "Les Paul", 5150]
let mixedData = ['EVH', 1984, true]

//lets see what typescript infers as these arrays

stringArr[0] = 'John' //ANy other data type would cause a problem here.
//stringArr.push(42) //This doesn't work as TS doesn't put a limit of length of array, but it does put a limit on the types you can have.
stringArr.push('hey')

guitars = stringArr //can have this but not the other way around as stringArr does not allow for number data types.

let test = []
let bands: string[] = [] //what does the [] do??
bands.push('Van Halen') //this works

//length of array or order does not matter to TS. but if you want to be more script that is more locked in to a type at a specific position and length thne you need to utilise a tuple
//Tuples
let myTuple: [string, number, boolean] = ['Dave', 42, true]

let mixed = ['John', 1, false]
//The above two things ARE NOT THE SAME

mixed = myTuple //this is not a problem here because they are the same thing
// myTuple = mixed //but this doesn't work because mixed is not required to have 3 elements in the array, but myTUple is so if it changes it will break and so to ensure this doesn't happen then it works


//Objects
let myObj: object
myObj = []
console.log(typeof myObj)
myObj = bands
myObj = {}

const exampleObj = {
    prop1: 'Dave',
    prop2: true,

}

exampleObj.prop2 = false //this has to be a boolean as prop2 is locked in to that boolean data and prop1 is locked into string data.

type Guitarist = {
    name: string,
    active?: boolean,
    albums: (string | number)[]
}

let evh: Guitarist = {
    name: 'eddie',
    active: false,
    albums: [1984, 5150, 'OU812']
}

// type defines as datatype so you can create your own datatypes I assume.

let JP: Guitarist = {
    name: 'Jimmy',
    active: true,
    albums: ['I', 'II', 'IV']
}

evh = JP //there is no issue with that but if you remove the type guitarist so it wouldn't work. and also if you removed an attribute it also would not work.

//TO make a property optional you go back to the type and add a ? before the colon see Guitarist type

//below is a function.
const greetGuitarist = (guitarist: Guitarist) => {
    return `Hello ${guitarist.name}!`
}

console.log(greetGuitarist(JP))

//Interfaces essentially does the same thing as Type versus interface:

interface hello {
    name: string,
    active?: boolean,
    albums: (string | number)[]
}

//use interfaces with classes.

// looking back at greet Guitarist if name was optional then if you add a method it would have to be optional too or you could add an if statement which checks to see if it is not there and go about its business or stops (This is called narrowing.)
// Enums
// "Unlike most TS features, enums ar enot type level addition to JS but something added to the language and runtime"

enum Grade {
    U,
    D,
    C,
    B,
    A
}

console.log(Grade.U) //this will show 0 throught 4. you can change U =1 to change A to 5 (increments by 1)


//TYpe aliases is what we are discussing now:

type stringOrNumber = string | number;

type stringOrNumberArray = (string | number)[];

//so we can create the following
type userId = stringOrNumber;

//representing our typescript types with a different name.

// Literal types
let Name: 'Dave'

let userName: 'Dave' | 'JOhn' | 'Amy'
userName = "Amy" //won't take in any other name other than declared in the line above.

//functions
const add = (a: number, b: number): number => {
    return a + b
}

const logMsg = (message: any): void => {
    console.log(message)
}

//Any no return function should have a void return the : datatype after the brackets specifies the type of data being returned.

let subtract = function (c: number, d: number):
number { //number is the return type here.
    return c - d
}

//this is a math function type and an example of using it
type Mathfunction = (a: number, b: number) => number

let multiply: Mathfunction = function (c, d) {
    return c * d
}

logMsg(multiply(2, 3))

//Optional Parameters
const addAll = (a: number, b: number, c?: number):
number => {
    if (typeof c !== 'undefined') {
        return a + b + c //need to put in a typeguard to protect c from being undefined=
    }
    return a + b
}

//Optional parameters need to come last in the list note that required parameters come first.
//Can have default values as well they work the same.

logMsg(addAll(2, 3, 2)) //should return 7
logMsg(addAll(2, 3)) //should return 2
