// 1、字符串字面量类型
// 字符串字面量类型用来约束取值只能是某几个字符串中的一个
type EventNames = 'click' | 'scroll' | 'mousemove';
function handleEvent(ele: Element | null, event: EventNames) {
  // do something
}
// handleEvent(document.getElementById('world'), 'dblclick'); // 类型'dblclick'的参数不能赋给类型'EventNames'的参数。
handleEvent(document.getElementById('hello'), 'scroll');  // 没问题
// 上例中，我们使用 type 定了一个字符串字面量类型 EventNames，它只能取三种字符串中的一种。
// 注意，类型别名与字符串字面量类型都是使用 type 进行定义。
