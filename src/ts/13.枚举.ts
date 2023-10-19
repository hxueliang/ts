// 1.1、枚举成员会被赋值为从 0 开始递增的数字，同时也会对枚举值到枚举名进行反向映射
enum Days {Sun, Mon, Tue, Wed, Thu, Fri, Sat};
// console.log(Days["Sun"] === 0); // true
// console.log(Days["Mon"] === 1); // true
// console.log(Days["Tue"] === 2); // true
// console.log(Days["Sat"] === 6); // true

// console.log(Days[0] === "Sun"); // true
// console.log(Days[1] === "Mon"); // true
// console.log(Days[2] === "Tue"); // true
// console.log(Days[6] === "Sat"); // true

// 1.2、事实上，上面的例子会被编译为
/*
var Days;
(function (Days) {
    Days[Days["Sun"] = 0] = "Sun";
    Days[Days["Mon"] = 1] = "Mon";
    Days[Days["Tue"] = 2] = "Tue";
    Days[Days["Wed"] = 3] = "Wed";
    Days[Days["Thu"] = 4] = "Thu";
    Days[Days["Fri"] = 5] = "Fri";
    Days[Days["Sat"] = 6] = "Sat";
})(Days || (Days = {}));
*/

// 2、手动赋值
enum Days2 {Sun = 7, Mon = 1, Tue, Wed, Thu, Fri, Sat};
// console.log(Days2["Sun"] === 7); // true
// console.log(Days2["Mon"] === 1); // true
// console.log(Days2["Tue"] === 2); // true
// console.log(Days2["Sat"] === 6); // true
// 上面的例子中，未手动赋值的枚举项会接着上一个枚举项递增

// 2.1、如果未手动赋值的枚举项与手动赋值的重复了，TypeScript 是不会察觉到这一点的
enum Days3 { Sun = 3, Mon = 1, Tue, Wed, Thu, Fri, Sat };
// console.log(Days3["Sun"] === 3); // true
// console.log(Days3["Wed"] === 3); // true
// console.log(Days3[3] === "Sun"); // false
// console.log(Days3[3] === "Wed"); // true
// 上面的例子中，递增到 3 的时候与前面的 Sun 的取值重复了，但是 TypeScript 并没有报错，导致 Days[3] 的值先是 "Sun"，而后又被 "Wed" 覆盖了
// 编译的结果是
/*
var Days;
(function (Days) {
    Days[Days["Sun"] = 3] = "Sun";
    Days[Days["Mon"] = 1] = "Mon";
    Days[Days["Tue"] = 2] = "Tue";
    Days[Days["Wed"] = 3] = "Wed";
    Days[Days["Thu"] = 4] = "Thu";
    Days[Days["Fri"] = 5] = "Fri";
    Days[Days["Sat"] = 6] = "Sat";
})(Days || (Days = {}));
*/
// 所以使用的时候需要注意，最好不要出现这种覆盖的情况

// 3、手动赋值的枚举项可以不是数字，此时需要使用类型断言来让 tsc 无视类型检查 (编译出的 js 仍然是可用的)
enum Days4 {Sun = 7, Mon, Tue, Wed, Thu, Fri, Sat = <any>"S"};
/*
var Days4;
(function (Days4) {
    Days4[Days4["Sun"] = 7] = "Sun";
    Days4[Days4["Mon"] = 8] = "Mon";
    Days4[Days4["Tue"] = 9] = "Tue";
    Days4[Days4["Wed"] = 10] = "Wed";
    Days4[Days4["Thu"] = 11] = "Thu";
    Days4[Days4["Fri"] = 12] = "Fri";
    Days4[Days4["Sat"] = "S"] = "Sat";
})(Days4 || (Days4 = {}));
*/

// 3.1、当然，手动赋值的枚举项也可以为小数或负数，此时后续未手动赋值的项的递增步长仍为 1
enum Days5 {Sun = 7, Mon = 1.5, Tue, Wed, Thu, Fri, Sat};
// console.log(Days5["Sun"] === 7); // true
// console.log(Days5["Mon"] === 1.5); // true
// console.log(Days5["Tue"] === 2.5); // true
// console.log(Days5["Sat"] === 6.5); // true

// 4、常数项和计算所得项
// 枚举项有两种类型：常数项（constant member）和计算所得项（computed member）。
// 前面我们所举的例子都是常数项
// 一个典型的计算所得项的例子
enum Color {Red, Green, Blue = "blue".length}
// console.log(Color['Red'] === 0); // true
// console.log(Color['Green'] === 1); // true
// console.log(Color['Blue'] === 4); // true
// 上面的例子中，"blue".length 就是一个计算所得项。

// 5、上面的例子不会报错，但是如果紧接在计算所得项后面的是未手动赋值的项，那么它就会因为无法获得初始值而报错
// enum Color2 {Red = "red".length, Green, Blue}; // 枚举成员必须具有初始化表达式。

/*
当满足以下条件时，枚举成员被当作是常数：

● 不具有初始化函数并且之前的枚举成员是常数。在这种情况下，当前枚举成员的值为上一个枚举成员的值加 1。但第一个枚举元素是个例外。如果它没有初始化方法，那么它的初始值为 0。
● 枚举成员使用常数枚举表达式初始化。常数枚举表达式是 TypeScript 表达式的子集，它可以在编译阶段求值。当一个表达式满足下面条件之一时，它就是一个常数枚举表达式： 
  ○ 数字字面量
  ○ 引用之前定义的常数枚举成员（可以是在不同的枚举类型中定义的）如果这个成员是在同一个枚举类型中定义的，可以使用非限定名来引用
  ○ 带括号的常数枚举表达式
  ○ +, -, ~ 一元运算符应用于常数枚举表达式
  ○ +, -, *, /, %, <<, >>, >>>, &, |, ^ 二元运算符，常数枚举表达式做为其一个操作对象。若常数枚举表达式求值后为 NaN 或 Infinity，则会在编译阶段报错

所有其它情况的枚举成员被当作是需要计算得出的值。
*/

// 6、常数枚举
const enum Directions {
  Up,
  Down,
  Left,
  Right
}
let directions = [
  Directions.Up, 
  Directions.Down, 
  Directions.Left, 
  Directions.Right
];
console.log(directions);
// 常数枚举与普通枚举的区别是，它会在编译阶段被删除，并且不能包含计算成员。

// 6.2、上例的编译结果是
// var directions = [0 /* Up */, 1 /* Down */, 2 /* Left */, 3 /* Right */];

// 6.3、假如包含了计算成员，则会在编译阶段报错
// const enum Color3 {Red, Green, Blue = "blue".length}; // Const枚举成员初始化方法必须是常量表达式

// 7、外部枚举
declare enum Directions2 {
  Up,
  Down,
  Left,
  Right
}
let directions2 = [
  Directions2.Up, 
  Directions2.Down, 
  Directions2.Left, 
  Directions2.Right
];
console.log(directions2);
// 之前提到过，declare 定义的类型只会用于编译时的检查，编译结果中会被删除。
// 上例的编译结果是
// var directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
// 外部枚举与声明语句一样，常出现在声明文件中。

// 8、同时使用 declare 和 const 也是可以的
declare const enum Directions3 {
  Up,
  Down,
  Left,
  Right
}
let directions3 = [
  Directions3.Up, 
  Directions3.Down, 
  Directions3.Left, 
  Directions3.Right
];
// 编译结果
// let directions3 = [
//   0 /* Directions3.Up */,
//   1 /* Directions3.Down */,
//   2 /* Directions3.Left */,
//   3 /* Directions3.Right */
// ];
