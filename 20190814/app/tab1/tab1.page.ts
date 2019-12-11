import { Component } from '@angular/core';
import * as moment from 'moment-timezone';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
    momentjs:any = moment;
    time = String;

    getTime(){
      let now = this.momentjs().tz('Asia/Taipei').format('HH:mm');
      console.log(now);
    }
    // getChineseTime(){
    //   let now = this.momentjs().tz('Asia/Taipei').format('HH:mm');
    //   if (now >= "01:00" && now < "03:00") {
    //     this.time = "丑時";
    //   }
    // }
}
