## 限制input输入框输入类型的指令

### 说明：
只使用该指令时，默认为限制Number输入，若输入的包含非Number类型，则回退，输入的内容不起作用；

### 可选参数
|参数|类型|默认|说明|
|:---:|:---:|:---:|:---:|
|limit|String|"number"|限制输入Number类型，目前只实现这种，可扩展|
|limitLess|Number| null | 只在limit为"number"时起作用，限制输入的number小于多少|
|limitMore|Number| null | 只在limit为"number"时起作用，限制输入的number大于多少|

### limit参数
- number `string`
> 限制只能输入数字类型

- noChinese `string`
> 不能输入中文，输入的中文会置空

- zeroToOne `string`
> 不能输入中文，输入的中文会置空

