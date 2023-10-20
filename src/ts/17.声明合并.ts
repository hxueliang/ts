/**
 * 0、声明合并
 * 如果定义了两个相同名字的函数、接口或类，那么它们会合并成一个类型
 */
/**
 * 1、函数的合并
 * 之前学习过，我们可以使用重载定义多个函数类型
 */
function reverse3(x: number): number;
function reverse3(x: string): string;
function reverse3(x: number | string): number | string {
  if(typeof x === 'number') {
    return x.toString().split('').reverse().join('');
  }
  return x.split('').reverse().join('')
}
console.log(reverse3(123), reverse3('abc'));

/**
 * 2.1、接口的合并
 * 接口中的属性在合并时会简单的合并到一个接口中
 */
interface Alarm2 {
  price: number;
}
interface Alarm2 {
  weight: number;
}
/**
 * 2.2、【2.1】相当于
 */
interface Alarm3 {
  price: number;
  weight: number;
}

/**
 * 2.3、注意，合并的属性的类型必须是唯一的
 */
interface Alarm4 {
  price: number;
}
interface Alarm4 {
  price: number; // 虽然重复了，但是类型都是 `number`，所以不会报错
  weight: number;
}
interface Alarm5 {
  price: number;
}
interface Alarm5 {
  // price: string; // 类型不一到，报错
  weight: number;
}

/**
 * 2.4、接口中方法的合并，与函数的合并一样
 */
interface Alarm6 {
  price: number;
  alert(s: string): string;
}
interface Alarm6 {
  weight: number;
  alert(s: string, n: number): string;
}
/**
 * 2.5、【2.4】相当于
 */
interface Alarm7 {
  price: number;
  weight: number;
  alert(s: string): string;
  alert(s: string, n: number): string;
}

/**
 * 3、类的合并
 * 类的合并与接口的合并规则一致
 */