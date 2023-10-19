// 1、定义时未指定类型
// let myFavoriteNumber2 = 'seven';
// myFavoriteNumber2 = 7; // 编译报错

// 2、定义时没赋值，不管之后有没赋值，都被推断成any
let myFavoriteNumber2;
myFavoriteNumber2 = 'seven';
myFavoriteNumber2 = 7;