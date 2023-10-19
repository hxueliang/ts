// 1、类型断言
// 需要在还不确定类型的时候就访问其中一个类型特有的属性或方法
interface Cat {
  name: string,
  run(): void;
}
interface Fish {
  name: string,
  swim(): void;
}
function isFish(animal: Cat | Fish) {
  // if(typeof animal.swim === 'function') { // 类型“Cat | Fish”上不存在属性“swim”。
  //   return true
  // }
  if(typeof (animal as Fish).swim === 'function') { // 解决访问 animal.swim 时报错
    return true
  }
  return false;
}
// 注意，类型断言只能够「欺骗」TypeScript 编译器，
// 无法避免运行时的错误，反而滥用类型断言可能会导致运行时错误

// 2、滥用类型断言
function swim(animal: Cat | Fish) {
  (animal as Fish).swim();
}
const tom8: Cat = {
  name: 'Tom',
  run() {console.log('run')}
}
swim(tom8); // 编译不报错，运行时错误，TypeError: animal.swim is not a function
// 原因是 (animal as Fish).swim() 这段代码隐藏了 animal 可能为 Cat 的情况，
// 将 animal 直接断言为 Fish 了，而 TypeScript 编译器信任了我们的断言，故在调用 swim() 时没有编译错误。
// 可是 swim 函数接受的参数是 Cat | Fish，一旦传入的参数是 Cat 类型的变量，由于 Cat 上没有 swim 方法，就会导致运行时错误了。
// 总之，使用类型断言时一定要格外小心，尽量避免断言后调用方法或引用深层属性，以减少不必要的运行时错误。

// 3、将一个父类断言为更加具体的子类
class ApiError extends Error {
  code: number = 0;
}
class HttpError extends Error {
  statusCode: number = 400;
}

// 3.1、当类之间有继承关系时，类型断言也是很常见
function isApiError(error: Error) {
  if (typeof (error as ApiError).code === 'number') {
    return true
  }
  return false;
}

// 3.2、因为 ApiError 和 HttpError 都是类，可以用 instanceof 代替 typeof 来判断是否 Error的实例
function isApiError2(error: Error) {
  if(error instanceof ApiError) {
    return true
  }
  return false;
}

// 3.3、但有时 ApiError 和 HttpError 并非真正的类，而只是一个 TypeScript 的接口，
// 接口是一个类型，不是一个真正的值，它在编译结果中会被删除，当然就无法使用 instanceof 来做运行时判断
// interface ApiError2 extends Error {
//   code: number;
// }
// interface HttpError2 extends Error {
//   statusCode: number;
// }
// function isApiError3(error: Error) {
//   if (error instanceof ApiError2) { // “ApiError2”仅表示类型，但在此处却作为值使用。
//     return true;
//   }
//   return false;
// }

// 3.4、此时就只能用类型断言，通过判断是否存在 code 属性，来判断传入的参数是不是 ApiError 了
interface ApiError3 extends Error {
  code: number;
}
interface HttpError3 extends Error {
  statusCode: number;
}
function isApiError3(error: Error) {
  if (typeof (error as ApiError3).code === 'number') {
    return true;
  }
  return false;
}

// 4、将任何一个类型断言为any
// 4.1、有的时候，我们非常确定这段代码不会出错，比如下面这个例子
// window.foo = 1; // 类型“Window & typeof globalThis”上不存在属性“foo”。

// 4.2、此时我们可以使用 as any 临时将 window 断言为 any 类型
(window as any).foo = 1;
// 需要注意的是，将一个变量断言为 any 可以说是解决 TypeScript 中类型问题的最后一个手段。
// 它极有可能掩盖了真正的类型错误，所以如果不是非常确定，就不要使用 as any
// 上面的例子中，我们也可以通过[扩展 window 的类型（TODO）][]解决这个错误，不过如果只是临时的增加 foo 属性，as any 会更加方便。
// 总之，一方面不能滥用 as any，
// 另一方面也不要完全否定它的作用，
// 我们需要在类型的严格性和开发的便利性之间掌握平衡（这也是 TypeScript 的设计理念之一），
// 才能发挥出 TypeScript 最大的价值。

// 5、将 any 断言为一个具体的类型
// 5.1、例如，历史遗留的代码中有个 getCacheData，它的返回值是 any
function getCacheData(key: string): any {
  return (window as any).cache[key];
}

// 5.2、将调用了它之后的返回值断言成一个精确的类型，这样就方便了后续的操作
interface Cat {
  name: string,
  run(): void,
}
const tom9 = getCacheData('Tom') as Cat;
tom9.run()
// 上面的例子中，我们调用完 getCacheData 之后，
// 立即将它断言为 Cat 类型。这样的话明确了 tom 的类型，
// 后续对 tom 的访问时就有了代码补全，提高了代码的可维护性。

// 6、类型断言的限制
// 6.1、当 Animal 兼容 Cat 时，它们就可以互相进行类型断言了
interface Animal {
  name: string
}
interface Cat extends Animal {
 run(): void
}
function testAnimal(animal: Animal) {
  return (animal as Cat);
}
function testCat(cat: Cat) {
  return (cat as Animal);
}
// 允许 animal as Cat 是因为「父类可以被断言为子类」，这个前面已经学习过了
// 允许 cat as Animal 是因为既然子类拥有父类的属性和方法，那么被断言为父类，获取父类的属性、调用父类的方法，就不会有任何问题，故「子类可以被断言为父类」
// 需要注意的是，这里我们使用了简化的父类子类的关系来表达类型的兼容性，而实际上 TypeScript 在判断类型的兼容性时，比这种情况复杂很多，详细请参考[类型的兼容性（TODO)][]章节。
// 总之，若 A 兼容 B，那么 A 能够被断言为 B，B 也能被断言为 A。
// 所以这也可以换一种说法：要使得 A 能够被断言为 B，只需要 A 兼容 B 或 B 兼容 A 即可，这也是为了在类型断言时的安全考虑，毕竟毫无根据的断言是非常危险的。

/*
综上所述：

● 联合类型可以被断言为其中一个类型
● 父类可以被断言为子类
● 任何类型都可以被断言为 any
● any 可以被断言为任何类型
● 要使得 A 能够被断言为 B，只需要 A 兼容 B 或 B 兼容 A 即可

其实前四种情况都是最后一个的特例。
*/

// 7、双重断言
// 既然：
// ● 任何类型都可以被断言为 any
// ● any 可以被断言为任何类型
// 是不是可以使用双重断言 as any as Foo 来将任何一个类型断言为任何另一个类型呢
interface Cat {
  run(): void
}
interface Fish {
  swim(): void
}
function testCat2(cat: Cat) {
  // return (cat as Fish); // 类型 "Cat" 到类型 "Fish" 的转换可能是错误的，因为两种类型不能充分重叠。如果这是有意的，请先将表达式转换为 "unknown"。类型 "Cat" 中缺少属性 "swim"，但类型 "Fish" 中需要该属性。
  return (cat as any as Fish);
}
// 在上面的例子中，若直接使用 cat as Fish 肯定会报错，因为 Cat 和 Fish 互相都不兼容。
// 但是若使用双重断言，则可以打破「要使得 A 能够被断言为 B，只需要 A 兼容 B 或 B 兼容 A 即可」的限制，将任何一个类型断言为任何另一个类型。
// 若你使用了这种双重断言，那么十有八九是非常错误的，它很可能会导致运行时错误。
// 除非迫不得已，千万别用双重断言。

// 8、类型断言 vs 类型转换
// 8.1、类型断言只会影响 TypeScript 编译时的类型，类型断言语句在编译结果中会被删
function toBoolean(something: any): boolean {
  return something as boolean;
}
toBoolean(1); 
// 返回值为 1
// 所以类型断言不是类型转换，它不会真的影响到变量的类型。

// 8.2、若要进行类型转换，需要直接调用类型转换的方法
function toBoolean2(something: any): boolean {
  return Boolean(something);
}
toBoolean2(1); 
// 返回值为 true

// 9、类型断言 vs 类型声明
// 9.1、我们使用 as Cat 将 any 类型断言为了 Cat 类型
function getCacheData2(key: string): any {
  return (window as any).cache[key];
}
interface Cat {
  name: string;
  run(): void;
}
const tom10 = getCacheData2('tom') as Cat;
tom10.run();


// 9.2、但实际上还有其他方式可以解决这个问题
const tom11 = getCacheData2('tom');
tom11.run();
// 上面的例子中，我们通过类型声明的方式，
// 将 tom 声明为 Cat，然后再将 any 类型的 getCacheData('tom') 赋值给 Cat 类型的 tom。
// 这和类型断言是非常相似的，而且产生的结果也几乎是一样的——tom 在接下来的代码中都变成了 Cat 类型。

// 9.3、它们的区别，可以通过这个例子来理解
interface Animal {
  name: string;
}
interface Cat {
  name: string;
  run(): void;
}
const animal: Animal = {
  name: 'Tom'
}
let tom12 = animal as Cat;
// 在上面的例子中，由于 Animal 兼容 Cat，故可以将 animal 断言为 Cat 赋值给 tom。

// 9.4、但是若直接声明 tom 为 Cat 类型
// let tom: Cat = animal; // 无法重新声明块范围变量“tom”。

// 10、类型断言 vs 泛型
// 10.1、还是这个例子
function getCacheData3(key: string): any {
  return (window as any).cache[key];
}
interface Cat {
  name: string;
  run(): void;
}
const tom13 = getCacheData3('tom') as Cat;
tom13.run();

// 10.2、我们还有第三种方式可以解决这个问题，那就是泛型
function getCacheData4<T>(key: string): T {
  return (window as any).cache[key];
}
interface Cat {
  name: string;
  run(): void;
}
const tom14 = getCacheData4<Cat>('tom');
tom14.run();
// 通过给 getCacheData 函数添加了一个泛型 ``，我们可以更加规范的实现对 getCacheData 返回值的约束，这也同时去除掉了代码中的 any，是最优的一个解决方案
