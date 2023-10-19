// 1、ECMAScript 的内置对象
let b: Boolean = new Boolean(1);
let e: Error = new Error('Error occurred');
let d: Date = new Date();
let r: RegExp = /[a-z]/;

// 2、DOM 和 BOM 提供的内置对象
let body: HTMLElement = document.body;
let allDiv: NodeList = document.querySelectorAll('div');
document.addEventListener('click', function(e: MouseEvent) {
  // Do something
});

// 3、TypeScript 核心库的定义文件
// Math.pow(10, '2'); // index.ts(1,14): error TS2345: Argument of type 'string' is not assignable to parameter of type 'number'.
Math.pow(10, 2);
// 上面的例子中，Math.pow 必须接受两个 number 类型的参数。

// 3.1、事实上 Math.pow 的类型定义如下
interface Math {
  /**
   * Returns the value of a base expression taken to a specified power.
   * @param x The base value of the expression.
   * @param y The exponent value of the expression.
   */
  pow(x: number, y: number): number;
}

// 3.2、再举一个 DOM 中的例子
document.addEventListener('click', function(e) {
  // console.log(e.targetCurrent); // 类型“MouseEvent”上不存在属性“targetCurrent”。
});
// 上面的例子中，addEventListener 方法是在 TypeScript 核心库中定义的

// 3.3、源码
// interface Document extends Node, GlobalEventHandlers, NodeSelector, DocumentEvent {
//   addEventListener(type: string, listener: (ev: MouseEvent) => any, useCapture?: boolean): void;
// }
// 所以 e 被推断成了 MouseEvent，而 MouseEvent 是没有 targetCurrent 属性的，所以报错了。
// 注意，TypeScript 核心库的定义中不包含 Node.js 部分

// 4、用 TypeScript 写 Node.js
// Node.js 不是内置对象的一部分，如果想用 TypeScript 写 Node.js，则需要引入第三方声明文件
// npm install @types/node --save-dev
