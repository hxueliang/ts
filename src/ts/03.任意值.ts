// let myFavoriteNumber: string = 'seven';
// myFavoriteNumber = 7; // 编译报错

// 1、any
let myFavoriteNumber: any = 'seven';
myFavoriteNumber = 7; // 编译不报错

// 2、允许访问任何属性
let anyThing: any = 'hello';
console.log(anyThing.myName); // 编译，运行时都不报错
// console.log(anyThing.myName.firstName); // 编译不报错，运行时报错

// 3、允许调用任何方法
// anyThing.setName('hxl'); // 编译不报错，运行时报错
// anyThing.setName('hxl').sayHello(); // 编译不报错，运行时报错

// 4、变量声明时，未指定类型，会被识别为任意类型
let something;
something = 'seven';
something = 7;
console.log(something);
