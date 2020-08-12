## 文本溢出省略 自动添加切换按钮

### 传入参数

|参数|类型|默认|说明|
|:---:|:---:|:---:|:---:|
|   lines    | `Number` | `2`  | 需要限制多少行 |
| lineHeight | `Number` | `19` |  每行默认多高  |

### tips

- 使用的时候，必须外层包一层，将载点定在外层
    - 原因 添加的按钮节点 是找到载点的firstChild节点设置样式
    ```html
    <div v-text-overflow>
      <div v-html="content.content"></div>
    </div>
    ```
- 内容最好是v-html指令，而不是innerHtml，可能造成获取高度不及时误差的情况
