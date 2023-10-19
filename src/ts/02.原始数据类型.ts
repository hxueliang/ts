// 1、布尔值
let isDone: boolean = false;
console.log(isDone);

// 2、数值
let decLiteral: number = 10;
let hexLiteral: number = 0xf;
let binaryLiteral: number = 0b10;
let octalLiteral: number = 0o10;
let notANumber: number = NaN;
let infinityNumber:number = Infinity;
console.log(
  decLiteral,
  hexLiteral,
  binaryLiteral,
  octalLiteral,
  notANumber,
  infinityNumber
)

// 字符串
let myName: string = 'hxl';
let myAge: number = 18;
let sentence: string =  `
  你好，我是 ${myName}，
  我快要 ${myAge + 1} 岁了。
`
console.log(sentence);

// Null Undefined
let n: null = null;
let u: undefined = undefined;
console.log(n, u);

// 空值
function outputName(): void {
  console.log('hxl');
}
outputName();
let unusable: void = undefined;