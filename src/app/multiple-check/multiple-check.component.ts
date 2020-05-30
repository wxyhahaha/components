
import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'multiple-check-box',
  templateUrl: './multiple-check.component.html',
  styleUrls: ['./multiple-check.component.less'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MultipleCheckBoxComponent),
    multi: true
  }]
})
export class MultipleCheckBoxComponent implements OnInit, ControlValueAccessor {
  @Input()leftSideTitle = '导出字段';
  @Input()exreaTitle = '选择仓库';
  @Input()
  get checkData() {
    return this.collection || [];
  }
  set checkData(value) {
    this.collection = value || [];
    for (const valueItem of this.collection) {
      valueItem.allChecked = false;
      valueItem.indeterminate = false;
      try {
        if (valueItem.exreaOptions) {
          valueItem.exreaOptionsShow = false;
          valueItem.chooseExreaOptions =  '';
          valueItem.chooseExreaOptions = '(' + valueItem.exreaOptions.filter(item1 => item1.checked === true)
          .map(item1 => item1.label) + ')';
          for (const exreaOptionItem of valueItem.exreaOptions) {
            for (const optionItem of valueItem.options) {
              this.allOptionsCopy.push({
                label: `${optionItem.label}(${exreaOptionItem.label})`,
                value: `${optionItem.value}${exreaOptionItem.value}`,
                checked: false,
                pid: valueItem.id});
            }
          }
        } else {
            for (const optionItem of valueItem.options) {
              optionItem.checked = false;
              this.allOptionsCopy.push({ label: optionItem.label, value: optionItem.value, checked: false, pid: valueItem.id });
          }
        }
      } catch (error) { }
    }
  }
  collection: any[] = [];
  allChecked = false;
  allFieldIndeterminate = false;
  allOptionsCopy: Array<any> = [];
  inputData = [];
  constructor(
  ) {
  }
  innerValue: any[] = [];
  onTouchedCallback: () => void = () => { };
  onChangeCallback: (_: any) => void =  (_) => { };
  get itemSide(): any[] {
    return this.innerValue;
  }

  // itemSide变化
  set itemSide(v: any[]) {
    if (v !== this.innerValue) {
      this.innerValue = [...this.inputData, ...v];
      this.onChangeCallback([...this.inputData, ...v]);
      this.allChooseLogs();
    }
  }
  /**
   *  model view -> view value
   */
  writeValue(value: any[]) {
    if (value !== this.innerValue) {
      this.innerValue = value || [];
      for (const item of this.innerValue) {
        for (const colleItem of this.collection) {
          if (item.pid === colleItem.id) {
            colleItem.options.find(optionItem => optionItem.value === item.value).checked = true;
            this.indeterminateStatus(colleItem);
          }
        }
        this.allOptionsCopy.find(allOptionItem => allOptionItem.value === item.value).checked = true;
      }
      this.allChooseLogs();
    }
  }
  /**
   * view value ->model value
   */
  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }
  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  ngOnInit() {

  }
  checkBoxChange() {
    this.allChooseLogs();
  }

  // 标题的全选
  fieldTitleCheckedChange(event, item) {
    if (!item.chooseExreaOptions && item.exreaOptions) {
      return;
    }
    if (event) {
      this.titleWatch(item, true);
    } else {
      this.titleWatch(item, false);
    }
    this.indeterminateStatus(item);
    this.allChooseLogs();
    this.itemSide = this.allOptionsCopy.filter(item1 => item1.checked === true)
    .map(checkedItem => {
      return {
        label: checkedItem.label,
        value: checkedItem.value,
        pid: checkedItem.pid
      };
    });
  }

  titleWatch(item, _CHECKED) {
    let exreaOptionsLabel = [];
    try {
      exreaOptionsLabel = item.exreaOptions
      .filter(item1 => item1.checked === true).map(item1 => item1.label);
      for (const optionsItem of item.options) {
        if (!optionsItem.disabled) {
          optionsItem.checked = _CHECKED;
        }
        for (const item2 of exreaOptionsLabel) {
          for (const allOptionsItem of this.allOptionsCopy) {
            if (allOptionsItem.label === `${optionsItem.label}(${item2})` && !allOptionsItem.disabled) {
              allOptionsItem.checked = _CHECKED;
            }
          }
        }
      }
    } catch (error) {
      for (const optionsItem of item.options) {
        if (!optionsItem.disabled) {
         optionsItem.checked = _CHECKED;
        }
        for (const allOptionsItem of this.allOptionsCopy) {
          if (allOptionsItem.label === optionsItem.label && !allOptionsItem.disabled) {
            allOptionsItem.checked = _CHECKED;
          }
        }
      }
     }
  }

  // 选择仓库时触发的$event事件
  exreaOptionsLogs(event, item) {
    if (event.length) {
      item.chooseExreaOptions = `(${event.join('，')})`;
      for (const item1 of item.options) {
        item1.disabled = false;
      }
    } else {
      item.chooseExreaOptions = '';
      item.allChecked = false;
      item.indeterminate = false;
      for (const item1 of item.options) {
        item1.disabled = true;
        item1.checked = false;
      }
    }
    this.allChooseLogs();
  }

  // 所有字段选择情况
  allChooseLogs() {
    if (this.allOptionsCopy.every(item => item.checked === true)) {
      this.allFieldIndeterminate = false;
      this.allChecked = true;
    } else if (this.allOptionsCopy.every(item => item.checked === false)) {
      this.allFieldIndeterminate = false;
      this.allChecked = false;
    } else {
      this.allFieldIndeterminate = true;
    }
  }

  // 所有字段全选
  allCheckedChange(e) {
    const exreaOptionsLabel = [];
    const optionsLabel = [];
    if (e === true) {
      this.allFieldIndeterminate = false;
      for (const item of this.collection) {
        item.indeterminate = false;
        if (!item.exreaOptions || item.chooseExreaOptions) {
          item.allChecked = true;
        }
        if (item.exreaOptions && !item.chooseExreaOptions) {
          item.allChecked = false;
        }
        let a: { disabled: boolean; };
        for (const optionItem of item.options) {
          a = optionItem as { disabled: boolean; };
          a.disabled
          ? optionItem.checked = false
          : optionItem.checked = true;
        }
        if (item.exreaOptions) {
          const optionItem = item.options as {label: string}[];
          optionsLabel.push(optionItem.map(item2 => item2.label));
          exreaOptionsLabel.push(item.exreaOptions.filter(item2 => item2.checked === true).map(item2 => item2.label));
        }
      }
      for (const item of this.allOptionsCopy) {
        if (item.label.includes('(')) { // 含有**说明是有仓库的字段
          for (let i = 0; i < exreaOptionsLabel.length; i++) {
            for (const item1 of exreaOptionsLabel[i]) {
              for (const item2 of optionsLabel[i]) {
                if (item.label === `${item2}(${item1})` && !item.disabled) {
                  item.checked = true;
                }
              }
            }
          }
        } else {
          if (!item.disabled) {
            item.checked = true;
          }
        }
      }
    } else {
      this.allFieldIndeterminate = false;
      for (const item of this.collection) {
        item.indeterminate = false;
        item.allChecked = false;
      }
      this.allFieldIndeterminate = false;
      for (const item of this.collection) {
        for (const optionItem of item.options) {
          optionItem.checked = false;
        }
      }
      for (const item of this.allOptionsCopy) {
        item.checked = false;
      }
    }
    this.itemSide = this.allOptionsCopy.filter(item => item.checked === true)
    .map(checkedItem => {
      return {
        label: checkedItem.label,
        value: checkedItem.value,
        pid: checkedItem.pid
      };
    });
  }

  /**
   * 移除左侧栏字段
   * @param item 选中数据
   */
  delItem(item) {
    this.itemSide.splice(this.itemSide.indexOf(item), 1);
    for (const item1 of this.allOptionsCopy) {
      if (item1.label === item.label) {
        item1.checked = false;
      }
    }
    if (item.label.includes('(')) {
      let ifExit = false;
      const labelArr = this.allOptionsCopy.filter(item1 => item1.checked === true).map(item1 => item1.label);
      for (const item1 of labelArr) {
        if (item1.indexOf(item.label.split('(')[0]) !== -1) {
          ifExit = true;
          break;
        }
      }
      if (!ifExit) {
        for (const colleItem of this.collection) {
          for (const item2 of colleItem.options) {
            if (item2.label === item.label.split('(')[0]) {
              item2.checked = false;
            }
          }
        }
      }
    } else {
      for (const colleItem of this.collection) {
        for (const item2 of colleItem.options) {
          if (item2.label === item.label) {
            item2.checked = false;
          }
        }
      }
    }
    for (const colleItem of this.collection) {
      if (colleItem.id === item.pid) {
        this.indeterminateStatus(colleItem);
      }
    }
    this.allChooseLogs();
    this.itemSide = this.allOptionsCopy.filter(item1 => item1.checked === true)
    .map(checkedItem => {
      return {
        label: checkedItem.label,
        value: checkedItem.value,
        pid: checkedItem.pid
      };
    });
  }

  /**
   * 选择仓库push左侧栏含有仓库的字段
   * @param data 当前的仓库item
   */
  exreaOptionsCheckedChange(data, item) {
    let optionsChecked = [];
    optionsChecked = item.options.filter(item1 => item1.checked === true)
    .map(item1 => item1.label);
    if (!optionsChecked) {
      return;
    }
    const arrLabel = optionsChecked;
    for (const item1 of arrLabel) {
      for (const item2 of this.allOptionsCopy) {
        if (item2.label === `${item1}(${data.label})`) {
          item2.checked = !item2.checked;
        }
      }
    }
    this.itemSide = this.allOptionsCopy.filter(item1 => item1.checked === true)
    .map(checkedItem => {
      return {
        label: checkedItem.label,
        value: checkedItem.value,
        pid: checkedItem.pid
      };
    });
  }

  /**
   * 选择普通选项push左侧栏含有仓库的字段
   * @param data 当前的选项item
   */
  checkedChange(data, item) {
    if (data.checked) {
      if (item.exreaOptions) {
        let exreaOptionsChecked = [];
        exreaOptionsChecked = item.exreaOptions.filter(item1 => item1.checked === true)
        .map(item1 => item1.label);
        const arrLabel = exreaOptionsChecked;
        for (const item1 of arrLabel) {
          for (const item2 of this.allOptionsCopy) {
            if (`${data.label}(${item1})` === item2.label) {
              item2.checked = true;
            }
          }
        }
      } else {
        for (const item1 of this.allOptionsCopy) {
          if (item1.label === data.label) {
            item1.checked = true;
          }
        }
      }
    } else {
      if (item.exreaOptions) {
        let exreaOptionsChecked = [];
        exreaOptionsChecked = item.exreaOptions.filter(item1 => item1.checked === true)
        .map(item1 => item1.label);
        const arrLabel = exreaOptionsChecked;
        for (const item1 of arrLabel) {
          for (const item2 of this.allOptionsCopy) {
            if (`${data.label}(${item1})` === item2.label) {
              item2.checked = false;
            }
          }
        }
      } else {
        for (const item1 of this.allOptionsCopy) {
          if (item1.label === data.label) {
            item1.checked = false;
          }
        }
      }
    }

    this.indeterminateStatus(item);
    this.itemSide = this.allOptionsCopy.filter(item1 => item1.checked === true)
    .map(checkedItem => {
      return {
        label: checkedItem.label,
        value: checkedItem.value,
        pid: checkedItem.pid
      };
    });
  }

  // checkBox不确定样式状态
  indeterminateStatus(item) {
    if (item.options.every(item1 => item1.checked === true)) {
      item.allChecked = true;
      item.indeterminate = false;
    } else if (item.options.every(item1 => item1.checked === false)) {
      item.allChecked = false;
      item.indeterminate = false;
    } else {
      item.indeterminate = true;
    }
  }
}
