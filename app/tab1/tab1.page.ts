import { Component } from '@angular/core';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  // show(){ 
  //   var date = new Date(); //日期对象 
  //   var now = "";
  //   now = now + date.getHours()+"时"; 
  //   now = now + date.getMinutes()+"分"; 
  //   document.getElementById("today").innerHTML = now; //div的html是now这个字符串 
  //   setTimeout("show()",1000); //设置过1000毫秒就是1秒，调用show方法 
  //   }     
}

export class DatePipeComponent {
  today: number = Date.now();
}