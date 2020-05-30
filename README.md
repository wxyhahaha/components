# MultipleCheckBox

This project was generated with Angular CLI version 8.1.0.

```js
// 这是一个angular组件，多选框，可用于导出字段..配置等...
npm i/install multiple-check-box
yarn add multiple-check-box
"dependencies" :{"multiple-check-box": <package-version>}
```

## 引用模块

```js
import { MultipleCheckBoxModule } from 'multiple-check-box'
@NgModule({
  imports: [
    MultipleCheckBoxModule,
  ]
})
```

## 示例

angular.html

``` html
<multiple-check-box [checkData]="collection" [(ngModel)]="value" [exreaTitle]="title" [leftSideTitle]="leftSideTitle"></multiple-check-box>
```

``` js
  title = '选择仓库';
  leftSideTitle = '导出字段';
  collection = [
    {
      id: 1,
      title: '商品信息',
      options: [
        { label: '开发平台', value: 'developPlatformDesc'},
      ]
    },
    {
      id: 2,
      title: '人员信息',
      options: [
        { label: '销售经理', value: 'bgSalesManager'},
      ]
    },
    {
      id: 3,
      title: '库存/备货',
      options: [
        { label: '可用库存', value: 'AvailableQty'},
      ],
      exreaOptions: [
        { label: '中仓', value: 'cnStorage', checked: true},
      ],
    },
    {
      id: 4,
      title: '价格/毛利率',
      options: [
        { label: '销售价', value: 'SalesPrice'},
      ],
      exreaOptions: [
        { label: '中仓', value: 'cnStorage', checked: true},
      ]
    },
    {
      id: 5,
      title: '销量',
      options: [
        { label: '最近1天销量', value: 'SalesQtyD1'},
      ],
      exreaOptions: [
        { label: '中仓', value: 'cnStore', checked: true},
      ],
    }
  ];
  value = [{label: '开发平台', value: 'developPlatformDesc' pid: 1}];
```

## API

| 属性 | 说明 | 类型 | 默认值 |
| :--- | :--- | :--- | :--- |
| `[checkData]` | check的数据 | `{id,title,options,exreaOptions}[]` | `[]` |
|`[(ngModel)]`| 被选中项的对象数据| `{label: string, value: string, checked: boolean, id: number}[]`|`[]`|
|`[exreaTitle]`| 额外选项标题| `string`| `'请选择仓库'` |
|`[leftSideTitle]`| 左侧栏的标题 | `string` | `'导出字段'`|

```md
tips:
1.如果需要传入额外选项则`exreaOptions`一定要加上;
2.`exreaOptions`的checked需要设置为true
3.pid字段对应`collection`id项
4.暂时拥有`exreaOptions`的不可正常运行双向绑定
如
value = [{ label: '最近1天销量', value: 'SalesQtyD1', pid: 5}]
```

## 运行项目

ng serve 运行或者 yarn run start 运行你的angular项目
