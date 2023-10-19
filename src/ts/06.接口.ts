// 1、定义接口
interface Person {
  name: string,
  age: number
}

// 1.1、赋值时，变量的形状必须和接口的形状一致
let tom: Person = {
  name: 'hxl',
  age: 18
}

// 1.2、少了属性，报错
// let tom1: Person = {
//   name: 'hxl'
// }

// 1.3、多了属性，报错
// let tom2: Person = {
//   name: 'hxl',
//   age: 18,
//   gender: 'male'
// }

// 2、可选属性
interface Person2 {
  name: string,
  age?: number // 该属性可以不存在
}
// 2.1、没age
let tom3: Person2 = {
  name: 'hxl'
}
// 2.2、有age
let tom4: Person2 = {
  name: 'hxl',
  age: 18,
}

// 3、任意属性
// 3.1、一旦定义了任意属性，那么确定属性和可选属性的类型都必须是任意属性的类型的子集
// interface Person3 {
//   name: string,
//   age?: number, // Property 'age' of type 'number | undefined' is not assignable to 'string' index type 'string'.
//   [propName: string]: string,
// }

// 3.2、一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型：
interface Person4 {
  name: string,
  age?: number,
  [propName: string]: string | number | undefined,
}
let tom5: Person4 = {
  name: 'hxl',
  age: 18,
  gender: 'male'
}

// 4、只读属性
// 4.1、只读属性
interface Person5 {
  readonly id: number,
  name: string,
  age?: number,
  [propName: string]: string | number | undefined,
}
let tom6: Person5 = {
  id: 123,
  name: 'hxl',
  gender: 'male'
}
// tom6.id = 234; // 无法为“id”赋值，因为它是只读属性。

// 4.2、注意，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候
// interface Person6 {
//   readonly id: number,
//   name: string,
//   age?: number,
//   [propName: string]: string | number | undefined,
// }
// let tom7: Person6 = { // 类型 "{ name: string; gender: string; }" 中缺少属性 "id"，但类型 "Person6" 中需要该属性。
//   name: 'hxl',
//   gender: 'male'
// }
// tom7.id = 234; // 无法为“id”赋值，因为它是只读属性。