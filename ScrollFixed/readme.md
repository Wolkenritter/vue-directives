##滚动吸附效果

通过传入的 offsetTop 或者 offsetBottom 来判断是吸附在顶部还是底部

    offsetTop和offsetBottom 同时存在 或者两个同时不存在， 吸附在顶部

    只offsetTop存在，吸附在顶部

    只offsetBottom存在，吸附在底部

可通过 className 设置添加固定吸附之后的自定义样式类，通过此样式操作修改子集或者兄弟节点的样式，默认为 v-scroll-fixed

### 可选参数：

|      参数      |  类型   |      默认      |                    说明                    |
| :------------: | :-----: | :------------: | :----------------------------------------: |
|   `offsetTop`    | Number  |       0        |             设置吸附顶部的距离             |
|  `offsetBottom`  | Number  |       0        |             设置吸附底部的距离             |
|     `zIndex`     | Number  |      1000      |           设置载点的 zIndex 层级           |
|   `className`    | String  | v-scroll-fixed |          设置滚动节点吸附后的类名          |
| `canMoveHorizon` | Boolean |     false      | 若浏览器页面左右滚动，载点是否跟随左右移动 |
|    `disabled`    | Boolean |     false      |           是否禁止使用吸附的功能,初始值,不动态监听(其实没用，动态的需要使用 update这个钩子)           |

### demo1

```html
<demo v-scroll-fixed="{ offsetTop: 20, zIndex: 10, canMoveHorizon: true }"></demo>
```


### demo2 
#### 设置是否使用吸附功能
```html
<demo v-scroll-fixed="{ disabled: isDisabled }"></demo>
```


### Tip
使用时最好外层包裹一层div，因为添加的 `占位节点` 是通过appendChild方法追加的

