// 1、数组类型
// 数组类型有多种定义方式，比较灵活

// 1.1、「类型 + 方括号」表示法
let arr: number[] = [1, 2, 3];

// 1.2、数组的一些方法的参数也会根据数组在定义时约定的类型进行限制
// arr.push('1'); // 类型“string”的参数不能赋给类型“number”的参数。

// 2、数组泛型
let arr1: Array<number> = [1, 2, 3];

// 3、用接口表示数组
interface NumberArray {
  [index: number]: number;
}
let arr2: NumberArray = [1, 2, 3]
// NumberArray 表示：只要索引的类型是数字时，那么值的类型必须是数字。
// 虽然接口也可以用来描述数组，但是我们一般不会这么做，因为这种方式比前两种方式复杂多了。
// 不过有一种情况例外，那就是它常用来表示类数组。

// 4、类数组
// 4.1、类数组（Array-like Object）不是数组类型，比如 arguments：
// function sum() {
//   let args: number[] = arguments; // 类型“IArguments”缺少类型“number[]”的以下属性: pop, push, concat, join 及其他 24 项。
// }

// 4.2、上例中，arguments 实际上是一个类数组，不能用普通的数组的方式来描述，而应该用接口
function sum() {
  let args: {
    [index: number]: number,
    length: number,
    callee: Function,
  } = arguments;
}
// 在这个例子中，我们除了约束当索引的类型是数字时，值的类型必须是数字之外，也约束了它还有 length 和 callee 两个属性。
// 事实上常用的类数组都有自己的接口定义，如 IArguments, NodeList, HTMLCollection 等

// 4.3、IArguments接口的源码
interface IArguments {
  [index: number]: number,
  length: number,
  callee: Function,
}

// 5、any在数组中的应用
let list: any[] = [1, '2', true, {}];