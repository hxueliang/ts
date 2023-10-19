// 1、类的概念
/*
● 类（Class）：定义了一件事物的抽象特点，包含它的属性和方法
● 对象（Object）：类的实例，通过 new 生成
● 面向对象（OOP）的三大特性：封装、继承、多态
● 封装（Encapsulation）：将对数据的操作细节隐藏起来，只暴露对外的接口。外界调用端不需要（也不可能）知道细节，就能通过对外提供的接口来访问该对象，同时也保证了外界无法任意更改对象内部的数据
● 继承（Inheritance）：子类继承父类，子类除了拥有父类的所有特性外，还有一些更具体的特性
● 多态（Polymorphism）：由继承而产生了相关的不同的类，对同一个方法可以有不同的响应。比如 Cat 和 Dog 都继承自 Animal，但是分别实现了自己的 eat 方法。此时针对某一个实例，我们无需了解它是 Cat 还是 Dog，就可以直接调用 eat 方法，程序会自动判断出来应该如何执行 eat
● 存取器（getter & setter）：用以改变属性的读取和赋值行为
● 修饰符（Modifiers）：修饰符是一些关键字，用于限定成员或类型的性质。比如 public 表示公有属性或方法
● 抽象类（Abstract Class）：抽象类是供其他类继承的基类，抽象类不允许被实例化。抽象类中的抽象方法必须在子类中被实现
● 接口（Interfaces）：不同类之间公有的属性或方法，可以抽象成一个接口。接口可以被类实现（implements）。一个类只能继承自另一个类，但是可以实现多个接口
 */

// 2、ES6 中类的用法
/*
// 2.1、属性和方法
class Animal3 {
  public name;
  constructor(name) {
      this.name = name;
  }
  sayHi() {
      return `My name is ${this.name}`;
  }
}

let a = new Animal3('hxl');
console.log(a.sayHi()); // My name is hxl
*/

// 2.2、类的继承
/*
class Cat extends Animal3 {
  constructor(name) {
    super(name); // 调用父类的 constructor(name)
    console.log(this.name);
  }
  sayHi() {
    return 'Meow, ' + super.sayHi(); // 调用父类的 sayHi()
  }
}
let c = new Cat('Tom'); // Tom
console.log(c.sayHi()); // Meow, My name is Tom
*/

// 2.3、存取器
/*
class Animal {
  constructor(name) {
    this.name = name;
  }
  get name() {
    return 'Jack';
  }
  set name(value) {
    console.log('setter: ' + value);
  }
}

let a = new Animal('Kitty'); // setter: Kitty
a.name = 'Tom'; // setter: Tom
console.log(a.name); // Jack
*/

// 2.4、静态方法
// 使用 static 修饰符修饰的方法称为静态方法，它们不需要实例化，而是直接通过类来调用
/*
class Animal {
  static isAnimal(a) {
    return a instanceof Animal;
  }
}

let a = new Animal('Jack');
Animal.isAnimal(a); // true
a.isAnimal(a); // TypeError: a.isAnimal is not a function
*/

// 3、ES7 中类的用法
// 3.1、实例属性
// ES6 中实例的属性只能通过构造函数中的 this.xxx 来定义，ES7 提案中可以直接在类里面定义：
/*
class Animal {
  name = 'Jack';
  constructor() {}
}
let a = new Animal();
console.log(a.name); // Jack
*/

// 3.2、静态属性
// ES7 提案中，可以使用 static 定义一个静态属性
/*
class Animal {
  static num = 42;
  constructor() {}
}
console.log(Animal.num); // 42
*/

// 4、TypeScript 中类的用法
// 4.1、public private 和 protected
// ● public 修饰的属性或方法是公有的，可以在任何地方被访问到，默认所有的属性和方法都是 public 的
// ● private 修饰的属性或方法是私有的，不能在声明它的类的外部访问
// ● protected 修饰的属性或方法是受保护的，它和 private 类似，区别是它在子类中也是允许被访问的
class Animal4 {
  public name;
  public constructor(name: string) {
    this.name = name;
  }
}
let a = new Animal4('Jack');
console.log(a.name); // Jack
a.name = 'Tom';
console.log(a.name); // Tom
// 上面的例子中，name 被设置为了 public，所以直接访问实例的 name 属性是允许的

// 4.2、很多时候，我们希望有的属性是无法直接存取的，这时候就可以用 private 了
class Animal5 {
  private name;
  public constructor(name: string) {
    this.name = name;
  }
}

let a1 = new Animal5('Jack');
// console.log(a1.name); // Jack, 属性“name”为私有属性，只能在类“Animal5”中访问。
// a1.name = 'Tom'; // 属性“name”为私有属性，只能在类“Animal5”中访问。
// 需要注意的是，TypeScript 编译之后的代码中，并没有限制 private 属性在外部的可访问性

// 4.3、使用 private 修饰的属性或方法，在子类中也是不允许访问的
class Animal6 {
  private name;
  public constructor(name: string) {
    this.name = name;
  }
}

class Cat2 extends Animal6 {
  constructor(name: string) {
    super(name);
    // console.log(this.name); // 属性“name”为私有属性，只能在类“Animal6”中访问。
  }
}

// 4.4、而如果是用 protected 修饰，则允许在子类中访问
class Animal7 {
  protected name;
  public constructor(name: string) {
    this.name = name;
  }
}

class Cat3 extends Animal7 {
  constructor(name: string) {
    super(name);
    console.log(this.name);
  }
}

// 4.5、当构造函数修饰为 private 时，该类不允许被继承或者实例化
class Animal8 {
  public name;
  private constructor(name: string) {
    this.name = name;
  }
}
// class Cat extends Animal8 { // 无法扩展类“Animal8”。类构造函数标记为私有。
//   constructor(name: string) {
//     super(name);
//   }
// }
// let a3 = new Animal8('Jack'); // 类“Animal8”的构造函数是私有的，仅可在类声明中访问。

// 4.6、当构造函数修饰为 protected 时，该类只允许被继承
class Animal9 {
  public name;
  protected constructor(name: string) {
    this.name = name;
  }
}
class Cat extends Animal9 {
  constructor(name: string) {
    super(name);
  }
}
// let a4 = new Animal9('Jack'); // 类“Animal9”的构造函数是受保护的，仅可在类声明中访问。

// 5、参数属性
class Animal10 {
  // public name: string;
  public constructor(public name: string) {
    // this.name = name;
  }
}
// 修饰符和readonly还可以使用在构造函数参数中，等同于类中定义该属性同时给该属性赋值，使代码更简洁。
// 5.1、readonly只读属性关键字，只允许出现在属性声明或索引签名或构造函数中
class Animal12 {
  readonly name;
  public constructor(name: string) {
    this.name = name;
  }
}
let a5 = new Animal12('Jack');
console.log(a5.name); // Jack
// a5.name = 'Tom'; // 无法为“name”赋值，因为它是只读属性。

// 5.2、注意如果 readonly 和其他访问修饰符同时存在的话，需要写在其后面。
class Animal13 {
  // public readonly name;
  public constructor(public readonly name: string) {
    // this.name = name;
  }
}

// 6、抽象类
// 6.1、首先，抽象类是不允许被实例化的
abstract class Animal14 {
  public name;
  public constructor(name: string) {
    this.name = name;
  }
  public abstract sayHi(): void;
}
// let a6 = new Animal14('Jack'); // 无法创建抽象类的实例

// 6.2、其次，抽象类中的抽象方法必须被子类实现
abstract class Animal15 {
  public name;
  public constructor(name: string) {
    this.name = name;
  }
  public abstract sayHi(): void;
}

class Cat4 extends Animal15 {
  sayHi() {} // 抽象方法必须被子类实现，否则报错
  public eat() {
    console.log(`${this.name} is eating.`);
  }
}

let cat = new Cat('Tom');

// 7、类的类型
// 给类加上 TypeScript 的类型很简单，与接口类似
class Animal16 {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
  sayHi(): string {
    return `My name is ${this.name}`;
  }
}

let a6: Animal16 = new Animal16('Jack');
console.log(a6.sayHi()); // My name is Jack
