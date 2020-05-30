import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed = false;
  title = '选择仓库';
  leftSideTitle = 'aa';
  collection = [
    {
      id: 1,
      title: '商品信息',
      options: [
        { label: '开发平台', value: 'developPlatformDesc' },
        { label: 'OA状态', value: 'oaStatusDesc' },
        { label: '销售状态', value: 'statusDesc' },
        { label: '供应链状态', value: 'scmTypeDesc' },
        { label: '到货天数', value: 'scmArrivalDays' },
        { label: '上架时间', value: 'publishTime' },
        { label: '分类链路', value: 'treeName' },
        { label: '产品英文标题', value: 'title' },
        { label: '品牌', value: 'brand' },
        { label: '属性', value: 'item1' },
        { label: '成本价', value: 'costPrice' },
        { label: '重量', value: 'weight' },
        { label: '体积重量', value: 'bulkFactor' },
        { label: '长宽高', value: 'lwh' }
      ]
    },
    {
      id: 2,
      title: '人员信息',
      options: [
        { label: '销售经理', value: 'bgSalesManager' },
        { label: '销售员', value: 'salesUser' },
        { label: '海外仓运营人员', value: 'abroadSalesUser' },
        { label: '编辑员', value: 'editor' },
      ]
    },
    {
      id: 3,
      title: '库存/备货',
      options: [
        { label: '可用库存', value: 'AvailableQty'},
        { label: '发货仓库存', value: 'DeliveryQty' },
        { label: '采购仓库存', value: 'PurchaseQty' },
        { label: '未审核个数', value: 'PurchaseRequireQty' },
        { label: '已审核个数', value: 'PurchaseApproveQty' },
        { label: '调拨产品数量', value: 'AllotQty' },
      ],
      exreaOptions: [
        { label: '中仓', value: 'cnStorage', checked: true },
        { label: '美仓', value: 'usStorage' },
        { label: '香港仓', value: 'hkStorage' },
        { label: '英仓', value: 'ukStorage' },
        { label: '法仓', value: 'frStorage' },
        { label: '澳仓', value: 'auStorage' },
        { label: '俄仓', value: 'ruStorage' },
        { label: '西班牙仓', value: 'esStorage' },
      ],
    },
    {
      id: 4,
      title: '价格/毛利率',
      options: [
        { label: '销售价', value: 'SalesPrice' },
        { label: '市场价', value: 'MarketPrice' },
        { label: '折扣率', value: 'MarketPriceRate' },
        { label: '预算毛利率', value: 'ExpectGrossProfitRate' },
        { label: '实际毛利率', value: 'ActualGrossProfitRate'},
      ],
      exreaOptions: [
        { label: '中仓', value: 'cnStorage', checked: true},
        { label: '美仓', value: 'usStorage'},
        { label: '香港仓', value: 'hkStorage'},
        { label: '英仓', value: 'ukStorage'},
        { label: '法仓', value: 'frStorage'},
        { label: '澳仓', value: 'auStorage'},
        { label: '俄仓', value: 'ruStorage' },
        { label: '西班牙仓', value: 'esStorage'},
      ],
    },
    {
      id: 5,
      title: '销量',
      options: [
        { label: '最近1天销量', value: 'SalesQtyD1'},
        { label: '最近3天销量', value: 'SalesQtyD3' },
        { label: '最近7天销量', value: 'SalesQtyD7' },
        { label: '最近15天销量', value: 'SalesQtyD15' },
        { label: '容错销量', value: 'SalesQtyAvg'},
      ],
      exreaOptions: [
        { label: '中仓', value: 'cnStore', checked: true},
        { label: '美仓', value: 'usStorage'},
        { label: '香港仓', value: 'hkStorage'},
        { label: '英仓', value: 'ukStorage'},
        { label: '法仓', value: 'frStorage'},
        { label: '澳仓', value: 'auStorage'},
        { label: '俄仓', value: 'ruStorage'},
        { label: '西班牙仓', value: 'esStorage'},
      ],
    }
  ];
  value = [
    {label: '开发平台', value: 'developPlatformDesc', pid: 1},
    { label: '体积重量', value: 'bulkFactor', pid: 1 },
    { label: '长宽高', value: 'lwh', pid: 1 }
];
  ddd() {
    console.log(this.value);
  }
  caa(e) {
    console.log(e);
  }
}
