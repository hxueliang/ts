// 1、函数声明
// 1.1、一个函数有输入和输出，要在 TypeScript 中对其进行约束，需要把输入和输出都考虑到
function sum2(x: number, y: number): number {
 return x + y;
}

// 1.2、输入多余少于参数，是不允许的
// sum2(1, 2, 3); // 应有 2 个参数，但获得 3 个。
// sum2(1); // 应有 2 个参数，但获得 1 个。

// 2、函数表达式
// 2.1、
let mySum = function(x: number, y: number): number {
  return x + y;
}
// 这是可以通过编译的，
// 不过事实上，上面的代码只对等号右侧的匿名函数进行了类型定义，
// 而等号左边的 mySum，是通过赋值操作进行类型推论而推断出来的

// 2.2、给 mySum 添加类型
let mySum2: (x: number, y: number) => number = function(x: number, y: number): number {
  return x + y;
}
// 注意不要混淆了 TypeScript 中的 => 和 ES6 中的 =>。
// 在 TypeScript 的类型定义中，=> 用来表示函数的定义，左边是输入类型，需要用括号括起来，右边是输出类型。

// 3、用接口定义函数的形状
interface SearchFunc {
  (source: string, subString: string): boolean;
}
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string): boolean {
  return source.search(subString) > -1;
}
// 采用函数表达式|接口定义函数的方式时，对等号左侧进行类型限制，可以保证以后对函数名赋值时保证参数个数、参数类型、返回值类型不变。

// 4、可选参数
function buildName(firstName: string, lastName?: string) {
  if (lastName) {
    return `${firstName} ${lastName}`;
  } else {
    return firstName;
  }
}
let tomcat2 = buildName('Tom', 'Cat');
let tom2 = buildName('Tom');

// 5、参数默认值
// TypeScript 会将添加了默认值的参数识别为可选参数
function buildName3(firstName: string, lastName: string = 'Cat') {
  if (lastName) {
    return `${firstName} ${lastName}`;
  } else {
    return firstName;
  }
}
let tomcat7 = buildName3('Tom', 'Cat');
let tom7 = buildName3('Tom');

// 6、剩余参数
function push(arr: any[], ...resh: any[]) {
  resh.forEach(item => {
    arr.push(item)
  })
}
let arr3: any[] = [];
push(arr3, 1, 2, 3);
console.log(arr3);

// 7、重载
// 7.1
function reverse(x: number | string): number | string {
  if(typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''));
  }
  return x.split('').reverse().join('');
}
// 然而这样有一个缺点，就是不能够精确的表达，
// 输入为数字的时候，输出也应该为数字，
// 输入为字符串的时候，输出也应该为字符串。

// 7.2、这时，我们可以使用重载定义多个 reverse 的函数类型：
function reverse2(x: number): number;
function reverse2(x: string): string;
function reverse2(x: number | string): number | string {
  if(typeof x === 'number') {
    return Number(x.toString().split('').reverse().join(''));
  }
  return x.split('').reverse().join('');
}
// 注意，TypeScript 会优先从最前面的函数定义开始匹配，所以多个函数定义如果有包含关系，需要优先把精确的定义写在前面。
