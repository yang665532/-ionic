import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {
  show(){ 
    var date = new Date(); //日期对象 
    var now = "";
    now = now + date.getHours()+"时"; 
    now = now + date.getMinutes()+"分"; 
    document.getElementById("today").innerHTML = now; //div的html是now这个字符串 
    setTimeout("show()",1000); //设置过1000毫秒就是1秒，调用show方法 
    } 
}
