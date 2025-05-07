# 已知问题

## 项目问题

1. 在快速点击<ruby>服务器铭牌<rp>(</rp><rt>ServerCard</rt><rp>)</rp></ruby>启动 SSH 时，如果发生消息阻塞导致一个事件没有被成功发出，那么后续事件都会卡住无法发出，导致 *主视窗* 的消息阻塞。刷新页面可以清空消息队列（等同于强制重载）。
2. *命令行* 和 *救援* 对 React 的<ruby>严格模式<rp>(</rp><rt>Strict Mode</rt><rp>)</rp></ruby>支持不佳，第一个标签页可能会被添加多次；救援的 websockify 事件会由于多次加载（它目前由标签页状态管理生命周期）导致出现僵尸进程，需要去资源管理器一类的系统进程管理器中手动结束。生产环境没有这个问题。

## 依赖问题

1. xterm.js 在 5.3.0 以后的版本中的 `open` 函数出现了问题[^xterm-open]，导致在标签页迁移矩阵位置后无法重新加载，所以锁定在 5.3.0 版本，等待问题修复后才能升级。
   
   同时也因此有 xterm.js 在 5.4.0 新推出的函数 `input` 无法使用，需要在升级后将群控相关的指令移动到组件里面去（也可以不移动？看情况）

2. noVNC 在 1.6.0 版本中使用了顶层的 await 命令，但 esbuild （也可能是 babel ）不支持这个导致无法打包[^novnc-await]，所以锁定在 1.5.0 版本。

<!-- 脚注 -->

[^xterm-open]: [xterm.js#4978](https://github.com/xtermjs/xterm.js/issues/4978)
[^novnc-await]: [noVNC#1943](https://github.com/novnc/noVNC/issues/1943)
