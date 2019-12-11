import { Component } from '@angular/core';
import * as moment from 'moment-timezone';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
    momentjs:any = moment;
    time = String;
    userEmail: string;
 
    constructor(
      private navCtrl: NavController,
      private authService: AuthService
    ) {}

    ngOnInit(){
    
      if(this.authService.userDetails()){
        this.userEmail = this.authService.userDetails().email;
      }else{
        this.navCtrl.navigateBack('');
      }
    }

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
