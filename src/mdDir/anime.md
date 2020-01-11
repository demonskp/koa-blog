# Anime.js学习笔记

Anime.js (/ˈæn.ə.meɪ/) 是一个轻量的JavaScript 动画库， 拥有简单而强大的API。
可对 CSS 属性、 SVG、 DOM 和JavaScript 对象进行动画。

```简单示例
anime({
  targets: '.dir-normal',
  translateX: 250,
  easing: 'easeInOutSine'
});
```

## Anime.js可以作用于哪些对象？

targets属性控制了Anime.js能够作用于哪些对象。

1. 使用css选择器。
2. 使用DOM元素。
3. js对象。
4. 使用数组。

> 对于css选择器，你可以使用CSS中的任何选择语法，除了伪类和伪元素。

```
targets: '.dir-normal .el',// 选择dir-normal里的el

targets: '.dir-normal:befor',// 这是不被允许的
```

> 对于DOM元素。你可以使用DOM操作获取任何的元素。

```
var elements = document.querySelectorAll('.dom-node-demo .el');

anime({
  targets: elements,
  translateX: 270
});
```

> 对于js对象，他所改变的是对象当中属性的值。所以声明动画时，同时应当在其中声明你需要改变的值得最终值。(动画中update是回调函数，用来在界面中显示值)

```
var logEl = document.querySelector('.battery-log');

var battery = {
  charged: '0%',
  cycles: 120
}

anime({
  targets: battery,
  charged: '100%',
  cycles: 130,
  round: 1,
  easing: 'linear',
  update: function() {
    logEl.innerHTML = JSON.stringify(battery);
  }
});
```

> 对于数组对象，数组对象可以包含以上所有的对象。

```
var el = document.querySelector('.mixed-array-demo .el-01');

anime({
  targets: [el, '.mixed-array-demo .el-02', '.mixed-array-demo .el-03'],
  translateX: 250
});
```

## 可变化属性

1. CSS属性

```
//全部的CSS属性都可以作为动画的变换对象。
anime({
  targets: '.css-prop-demo .el',
  left: '240px',
  backgroundColor: '#FFF',
  borderRadius: ['0%', '50%'],
  easing: 'easeInOutQuad'
});
```

2. CSS变换

> 由于CSS属性的变化会引起页面的重布局，所以建议使用CSS变换代替CSS属性来优化使用。

| 属性名 | 默认单位 | 意义 |
| - | - | - |
| translateX | px | X轴变换 |
