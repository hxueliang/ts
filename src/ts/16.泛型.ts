/**
 * 1.1、泛型
 * 泛型（Generics）是指在定义函数、接口或类的时候，
 * 不预先指定具体的类型，而在使用的时候再指定类型的一种特性。
 * 
 * 我们来实现一个函数 createArray，
 * 它可以创建一个指定长度的数组，同时将每一项都填充一个默认值
 */
function createArray(length: number, value: any): Array<any> {
  let result = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}
console.log(createArray(3, 'a')); // ['a', 'a', 'a']

/**
 * 1.2、
 * 上例中，我们使用了之前提到过的数组泛型来定义返回值的类型。
 * 这段代码编译不会报错，但是一个显而易见的缺陷是，它并没有准确的定义返回值的类型
 * Array 允许数组的每一项都为任意类型。
 * 但是我们预期的是，数组中每一项都应该是输入的 value 的类型。
 * 这时候，泛型就派上用场
 */
function createArray2<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}
// console.log(createArray2<number>(3, 'a')); // 类型“string”的参数不能赋给类型“number”的参数。
console.log(createArray2<string>(3, 'a')); // ['a', 'a', 'a']

/**
 * 1.3、
 * 上例中，我们在函数名后添加了<T>，
 * 其中 T 用来指代任意输入的类型，
 * 在后面的输入 value: T 和输出 Array 中即可使用了
 * 接着在函数调用的时候，可以指定它具体的类型为 string。
 *
 * 当然，也可以不手动指定，而让类型推论自动推算出来
 */
console.log(createArray2(3, 'a')); // ['a', 'a', 'a']

/**
 * 2、多个类型参数
 * 定义泛型的时候，可以一次定义多个类型参数
 * 
 * 本例中，我们定义了一个 swap 函数，用来交换输入的元素
 */
function swap<T, U>(arr: [T, U]): [U, T] {
  return [arr[1], arr[0]]
}
console.log(swap([7, 'seven'])); // [ 'seven', 7 ]

/**
 * 3、泛型约束
 * 在函数内部使用泛型变量的时候，
 * 由于事先不知道它是哪种类型，
 * 所以不能随意的操作它的属性或方法
 */
function loggingIdentity<T>(arg: T): T {
  // console.log(arg.length); // 类型“T”上不存在属性“length”。
  return arg;
}

/**
 * 3.2、
 * 上例中，泛型 T 不一定包含属性 length，所以编译的时候报错了。
 * 这时，我们可以对泛型进行约束，
 * 只允许这个函数传入那些包含 length 属性的变量。这就是泛型约束
 */
interface Lengthwise {
  length: number;
}
function loggingIdentity2<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

/**
 * 3.3、
 * 上例中，
 * 我们使用了 extends 约束了泛型 T 
 * 必须符合接口 Lengthwise 的形状，
 * 也就是必须包含 length 属性。
 * 此时如果调用 loggingIdentity 的时候，
 * 传入的 arg 不包含 length，那么在编译阶段就会报错了
 */
// loggingIdentity2(7); // 类型“number”的参数不能赋给类型“Lengthwise”的参数。
loggingIdentity2('7');

/**
 * 3.4、多个类型参数之间也可以互相约束
 * 本例中，我们使用了两个类型参数，
 * 其中要求 T 继承 U，
 * 这样就保证了 U 上不会出现 T 中不存在的字段。
 */
function copyFields<T extends U, U>(target: T, source: U): T {
  for (const key in source) {
    target[key] = (<T>source)[key];
  }
  return target;
}
let x = {
  a: 1,
  b: 2,
  c: 3,
}
let x1 = copyFields(x, {b: 20, c: 30});
console.log(x1);

/**
 * 4、泛型接口
 * 之前学习过，可以使用接口的方式来定义一个函数需要符合的形状
 */
interface SearchFunc {
  (source: string, subString: string): boolean;
}
let mySearch2: SearchFunc;
mySearch2 = function(source: string, subString: string) {
  return source.search(subString) !== -1;
}

/**
 * 4.2、当然也可以使用含有泛型的接口来定义函数的形状
 */
interface CreateArrayFunc {
  <T>(length: number, value: T): Array<T>;
}
let createArray3: CreateArrayFunc;
createArray3 = function<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for(let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}
console.log(createArray3(4, 'a')); // ['a', 'a', 'a', 'a']

/**
 * 4.3、进一步，我们可以把泛型参数提前到接口名上
 * 此时在使用泛型接口的时候，需要定义泛型的类型
 */
interface CreateArrayFunc2<T> {
  (length: number, value: T): Array<T>;
}
let createArray4: CreateArrayFunc2<any>;
createArray4 = function<T>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for(let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}
console.log(createArray3(4, 'a')); // ['a', 'a', 'a', 'a']

/**
 * 5、泛型类
 * 与泛型接口类似，泛型也可以用于类的类型定义中
 */
class GenericNumber<T> {
  zeroValue: T;
  constructor(zeroValue: T) {
    this.zeroValue = zeroValue;
  }
}
let myGenericNumber = new GenericNumber<number>(0);

/**
 * 6、泛型参数的默认类型
 * 在 TypeScript 2.3 以后，
 * 我们可以为泛型中的类型参数指定默认类型。
 * 当使用泛型时没有在代码中直接指定类型参数，
 * 从实际值参数中也无法推测出时，
 * 这个默认类型就会起作用。
 */
function createArray5<T = string>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for(let i = 0; i <length; i++) {
    result[i] = value;
  }
  return result;
}