# 先上效果图

![demo1.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3248bfb1e99e4e798c8fdb60cdf1dfbc~tplv-k3u1fbpfcp-watermark.image)

![demo2 .gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5cfe5a9e79ed441c8e071838a0261bac~tplv-k3u1fbpfcp-watermark.image)

![demo3.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8811becae81549dbbb882133eeab5426~tplv-k3u1fbpfcp-watermark.image)

# 演示地址（vue版和react版一样）
https://dark2017.github.io/vue-dark-photo.github.io/

# react-dark-photo

- 基于 react17.x 开发的预览图片组件
- 支持 放大、缩小、复原、下载、打印、旋转、拖拽等功能
- 支持png、jpg、jpge、bmp、gif等常见图片格式
- 支持查看多个图片
- 开箱即用 只需传图片数据 轻便简单
- GitHub地址：https://github.com/Dark2017/react-dark-photo
- vue同款：https://github.com/Dark2017/vue-dark-photo

# 安装使用说明
[![react-dark-photo](https://nodei.co/npm/react-dark-photo.png)](https://npmjs.com/package/react-dark-photo)
```
npm i react-dark-photo

import { ReactDarkPhoto } from 'react-dark-photo'

例1：
var imgData = 'xxx'
export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showBox: true
    }
  }
  close = () => {
    this.setState({
      showBox: false
    })
  }
  open = () => {
    this.setState({
      showBox: true
    })
  }
  render() {
    return (
      <div>
        <button onClick={this.open}>open</button>
        <ReactDarkPhoto 
          showBox={this.state.showBox}
          imgData={imgData}
          close={this.close}
        />
      </div>
    )
  }
}
```


# api

## 属性

| 属性值 |  类型 | 描述 | 默认值 | 
| --- | --- | --- | ---
| imgData | string | 图片地址(url) | -
| imgArr | Array | 图片地址(数组) | -
| showBox | Boolean | 控制图片显隐 | false
| customAction | Object | 自定义操作栏 | null

## customAction

| 属性值 |  类型 | 描述 | 默认值 | 
| --- | --- | --- | ---
| lastCard | Boolean | 是否需要上一张 | true
| narrow | Boolean | 是否需要缩小 | true
| reduction | Boolean | 是否需要复原 | true
| enlarge | Boolean | 是否需要放大 | true
| leftRotate | Boolean | 是否需要逆时针旋转 | true
| rightRotate | Boolean | 是否需要顺时针旋转 | true
| downloadFile | Boolean | 是否需要下载 | true
| publish | Boolean | 是否需要打印 | true
| nextCard | Boolean | 是否需要下一张 | true
| mouseWheel | Boolean | 是否需要滚轮缩放 | true
| mouseDown | Boolean | 是否需要拖拽功能 | true

## 事件

| 事件名 |  说明 | 回调参数
| --- | --- | ---
| close | 关闭回调 | -

## 注意

- 若引用图片地址，相对地址使用require()包裹或使用绝对地址
- 若imgData 和 imgArr 同时传了 则只有imgData生效

# 最后

- 如果对你有帮助，请star一个哦，你的鼓励是我创作的动力
- 欢迎来到我的博客，希望能对你有所帮助
- 掘金：https://juejin.cn/user/2339399368751325/posts
- csdn：https://blog.csdn.net/weixin_44083712?spm=1010.2135.3001.5343
- csdn | 掘金 | 知乎 同名： 饼干_  或  饼干 




