let username = "Will";
console.log(username);

// let a = 12;
// let b = '6';
// let c = 2;


// console.log(a/b); //error here as b is a string and a is not. Even though this works with JS and shows up in the Live server console it is wrong and it could be better.



// to fix this:

//let a: number = 12
//let b: number = 6
//let c: number = 2

//remember to set noEmitOnError to true so that when the compiler doesn't like something it doesn't still put the error out.

// console.log(c*b)

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

// Rest Parameters:
// however, many numbers you want to add you can, can also have required by writing (a: number, ...nums: number[])
const total = (...nums: number[]): number => {
    return nums.reduce((prev, curr) => prev + curr)
}

logMsg(total(1, 2, 3, 4))

// The Never Type:
// this is where you use it to throw an error and thats the only time you want to save, if data type is never like in infinite then you can use it as a debugging tool.
const createError = (errMsg: string): never => {
    throw new Error(errMsg)
}

// const infinite = () => {
//     let i: number = 1
//     while(true){
//         i++
//     }
// }


//custom type guard
const isNumber = (value: any): boolean => {
    return typeof value === 'number'
        ? true: false
}

//cannot have empty returns in typescript.
// use of the never type
const numberOrString = (value: number | string): string => {
    if(typeof value === 'string') return 'string'
    if(isNumber(value)) return 'string'
    return createError('this should never happen!')
}


// Chapter 5: Assertions (same as casting)
// telling the typescript compiler that you know more about the types comes in handy when using DOM

type One = string
type Two = string | number
type Three = 'hello'

//convert to more or less specific type than you started with:

let a: One = 'hello'
let b = a as Two //assignment to less specific type
let c = a as Three //more specific here

let d = <One> 'world'
let e = <string | number>'world'

const addOrConcat = (a: number, b: number, c: 'add' | 'concat'): number | string

//use alt z to wrap stuff onto the next line.

//let myVal: string = addOrConcat(2, 2, 'concat') as string

// the as is what you use to do assertions.

//10 as string //this doesn't work as it checks you but it doesn't always work and it can do it by converting it to unknown first: (forced casting or double casting)
// 10 as unknown as string

// the DOM
// const img = document.querySelector('img')! // the ! is a non null assertion.
// const myImg = document.getElementById('#img') as HTMLImageElement 
// img.src //this doesn't work as object is possibly null so now we need to add the assertion to the img
// img.src
// myImg.src

//Chapter 6 Classes
class Coder {
    secondLang!: string //assertion (!) means that you know what you are doing but you are not going to deal with it in the future.
    music: String
    age: number
    lang: String
    constructor(public readonly name: string, music: string, age: number, lang: string = 'Typescript') { //public makes it a more global variable within the class. so you do not need to write name twice. Readonly means it cannot be changed. private makes it only changeable within the class. protected means something else. DEfault values also available meaning you do not need to write it in when declaring.
        this.name = name
        this.music = music
        this.age = age
        this.lang = lang

    }
    public getAge() {
        return `Hello, I'm ${this.age}!`
    }
}

const Dave = new Coder('Dave', 'Rock', 42)
console.log(Dave.getAge)
// console.log(Dave.age)

class webDev extends Coder {
    constructor(
        public computer: string,
        name: string,
        music: string,
        age: number,
    ) {
        super(name, music, age) {
            this.computer = computer
        }
    }

    public getLang() {
        return `I write ${this.lang}`
    }
}

const Sara = new webDev('Mac', 'Sara', 'Lofi', 25)

// console.log(Sara.getLang())
// console.log(Sara.age) //age is still private here only accessible within the class


interface Musician {
    name: string,
    instrument: string,
    play(action: string): string
}


class Bassist implements Musician {
    name: string
    instrument: string
    constructor(name: string, instrument: String) {
        this.name = name
        this.instrument = instrument
    }
    play(action: string) {
        return `${this.name} ${action} the ${this.instrument}`
    }
}


const Page = new Bassist('Jimmy', 'Guitar')
console.log(Page.play('strums'))


class Peeps {
    static count: number = 0
    static getCount(): number {
        return Peeps.count
    }

    public id: number
    constructor(public name: string) {
        this.name = name
        this.id = ++Peeps.count
    }
}

const John = new Peeps('John')
const Steve = new Peeps('Steve')
const Amy = new Peeps ('Amy')

console.log(Amy.id)


//the static keyword applies directly to the class not with the object that it applied to the class

//Getters and Setters:

class Bands {
    private dataState: string[]
    constructor() {
        this.dataState = []
    }

    public get data(): string[] { //Getter
        return this.dataState
    }

    public set data(value: string[]) { //setter
        if (Array.isArray(value) && value.every(el => typeof el === 'string')) {//every checks every element in an array.
            this.dataState = value
            return
        } else throw new Error('Param is not an array of strings') 
    }
}

const MyBands = new Bands()
MyBands.data = ['Neil Young', 'Led Zep']
console.log(MyBands.data)
MyBands.data = [...MyBands.data, 'ZZ Top']
console.log(MyBands.data)
//MyBands.data = ['Van Halen', 5150] //this does not work



// Chapter 7: Index Signatures and keyof assertions:


//Index signatures:


interface TransactionObj {
    Pizza: number,
    Books: number,
    Job: number
}

const todaysTransactions: TransactionObj = {
    Pizza: -10,
    Books: -5,
    Job: 50
}

console.log(todaysTransactions.Pizza)
console.log(todaysTransactions['Pizza'])

let porp: string = 'Pizza'
console.log(todaysTransactions[prop])// this is how we would access it dynamically but typescript does not like this.


//declares all the keys will be strings and values will be numbers.
interface TransactionObj {
    [index: string]: number
}



///////////////////////////


interface Student {
    [key: String]: string | number | number[] | undefined,
    name: string,
    GPA: number,
    classes?: number[]
}

const student: Student = {
    name: "Doug",
    GPA: 3.5,
    classes: [100, 200]
}

// console.log(student.test)

for (const key in student) {
    console.log(`${key}: ${student[key as keyof Student]}`)
}

Object.keys(student).map(key => {
    console.log(student[key as keyof typeof student])
})

const logStudentKey = (student: Student, key: keyof Student): void => {
    console.log(`student ${key}: ${student[key]}`)
}

logStudentKey(student, 'name')

//chapter 8: Generics

const echo = <T>(arg: T): T => arg //what does <.....> do??
// the above statement works with any type. Useful with utility functions

const isObj = <T>(arg: T): boolean => {
    return (typeof arg === 'object' && !Array.isArray(arg) && arg !== null)
}

const isTrue = <T>(arg: T): {arg: T, is: boolean } => {
    if (Array.isArray(arg) && !arg.length) {
        return { arg, is: false}
    }
    if(isObj(arg) && !Object.keys(arg as keyof T).length) {
        return { arg, is: false}
    }
    return { arg, is: !!arg} //!! -> double bang operator makes it true or false not 0 or 1.
}

interface HasID {
    id: number
}

const processUser = <T extends HasID>(user: T): T => {
    //process the user with logic here
    return user
}

console.log(processUser({ id: 1, name: 'Dave'})) //but if you were to remove the idea type then there would be an error as T extends HasID exists.

const getUsersProperty = <T extends HasID, K extends keyof T>(users: T[], key: K): T[K][] => {
    return users.map(user => user[key])
}

//Chapter 9: Utility Types:


// Partial 

interface Assignment {
    studentId: string,
    title: string,
    grade: number,
    verified?: boolean,
}

const updateAssignment = (assign: Assignment, propsToUpdate: Partial<Assignment>): Assignment => {
    return { ...assign, ...propsToUpdate }
}

const assign1: Assignment = {
    studentId: "compsci123",
    title: "Final Project",
    grade: 0,
}

console.log(updateAssignment(assign1, { grade: 95 }))
const assignGraded: Assignment = updateAssignment(assign1, { grade: 95 })


// Required and Read only

const recordAssignment = (assign: Required<Assignment>): Assignment => {
    // send to database, etc. 
    return assign
}

const assignVerified: Readonly<Assignment> = { ...assignGraded, verified: true }

// NOTE: assignVerified won't work with recordAssignment!
// Why? Try it and see what TS tells you :)

recordAssignment({ ...assignGraded, verified: true })

// Record 
const hexColorMap: Record<string, string> = {
    red: "FF0000",
    green: "00FF00",
    blue: "0000FF",
}

type Students = "Sara" | "Kelly"
type LetterGrades = "A" | "B" | "C" | "D" | "U"

const finalGrades: Record<Students, LetterGrades> = {
    Sara: "B",
    Kelly: "U"
}

interface Grades {
    assign1: number,
    assign2: number,
}

const gradeData: Record<Students, Grades> = {
    Sara: { assign1: 85, assign2: 93 },
    Kelly: { assign1: 76, assign2: 15 },
}

// Pick and Omit 

type AssignResult = Pick<Assignment, "studentId" | "grade">

const score: AssignResult = {
    studentId: "k123",
    grade: 85,
}

type AssignPreview = Omit<Assignment, "grade" | "verified">

const preview: AssignPreview = {
    studentId: "k123",
    title: "Final Project",
}

// Exclude and Extract 

type adjustedGrade = Exclude<LetterGrades, "U">

type highGrades = Extract<LetterGrades, "A" | "B">

// Nonnullable 

type AllPossibleGrades = 'Dave' | 'John' | null | undefined
type NamesOnly = NonNullable<AllPossibleGrades>

// ReturnType 

//type newAssign = { title: string, points: number }

const createNewAssign = (title: string, points: number) => {
    return { title, points }
}

type NewAssign = ReturnType<typeof createNewAssign>

const tsAssign: NewAssign = createNewAssign("Utility Types", 100)
console.log(tsAssign)

// Parameters 

type AssignParams = Parameters<typeof createNewAssign>

const assignArgs: AssignParams = ["Generics", 100]

const tsAssign2: NewAssign = createNewAssign(...assignArgs)
console.log(tsAssign2)

// Awaited - helps us with the ReturnType of a Promise 

interface User {
    id: number,
    name: string,
    username: string,
    email: string,
}

const fetchUsers = async (): Promise<User[]> => {

    const data = await fetch(
        'https://jsonplaceholder.typicode.com/users'
    ).then(res => {
        return res.json()
    }).catch(err => {
        if (err instanceof Error) console.log(err.message)
    })
    return data
}

type FetchUsersReturnType = Awaited<ReturnType<typeof fetchUsers>>

fetchUsers().then(users => console.log(users))