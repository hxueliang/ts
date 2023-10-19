// 1、联合类型，表示取值可以为多种类型中的一种
let myFavoriteNumber3: string | number;
myFavoriteNumber3 = 'seven';
myFavoriteNumber3 = 7;
// myFavoriteNumber3 = true; // 编译报错

// 2、访问属性或方法
// 当 TypeScript 不确定一个联合类型的变量到底是哪个类型的时候，我们只能访问此联合类型的所有类型里共有的属性或方法
function getLength(something: string | number) {
  // return something.length; // 编译报错
  return something.valueOf();
}

// 3、联合类型的变量在被赋值的时候，会根据类型推论的规则推断出一个类型
let myFavoriteNumber4: string | number;
myFavoriteNumber4 = 'seven';
console.log(myFavoriteNumber4.length);
myFavoriteNumber4 = 7;
// console.log(myFavoriteNumber4.length); // 编译报错
