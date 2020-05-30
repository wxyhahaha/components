
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MultipleCheckBoxComponent } from './multiple-check.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    MultipleCheckBoxComponent
  ],
  imports: [
    CommonModule,
    NgZorroAntdModule,
    FormsModule
  ],
  exports: [
    MultipleCheckBoxComponent
  ]
})
export class MultipleCheckModule { }
