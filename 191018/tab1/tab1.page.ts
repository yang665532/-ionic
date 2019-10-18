import { Component, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { Storage } from '@ionic/storage';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
    hasVerified = true;
    momentjs: any = moment;
    userEmail: string;
    time: string;
    chineseTime: string;
    meridian: string;
    email;
 
    constructor(
      private navCtrl: NavController,
      private authService: AuthService,
      private storage: Storage,
      private afAuth: AngularFireAuth
    ) {
      this.afAuth.authState.subscribe(user =>{
        setInterval(() => {
          //check if users have verified their emails
          this.afAuth.auth.currentUser.reload().then(() => {
            if(user)
            this.hasVerified = this.afAuth.auth.currentUser.emailVerified;
          });

          //get information about time and meridian
          let now = moment().format('HH:mm');
          let a:number = now.substring(0, 2);
          this.time = now;

          if (a >= 1 && a < 3) {this.chineseTime = "丑時";  this.meridian = "肝經";}
          else if (a >=3 && a < 5){this.chineseTime = "寅時";  this.meridian = "肺經";}
          else if (a >=5 && a < 7){this.chineseTime = "卯時";  this.meridian = "大腸經";}
          else if (a >=7 && a < 9){this.chineseTime = "辰時";  this.meridian = "胃經";}
          else if (a >=9 && a < 11){this.chineseTime = "巳時";  this.meridian = "脾經";}
          else if (a >=11 && a < 13){this.chineseTime = "午時";  this.meridian = "心經";}
          else if (a >=13 && a < 15){this.chineseTime = "未時";  this.meridian = "小腸經";}
          else if (a >=15 && a < 17){this.chineseTime = "申時";  this.meridian = "膀胱經";}
          else if (a >=17 && a < 19){this.chineseTime = "酉時";  this.meridian = "腎經";}
          else if (a >=19 && a < 21){this.chineseTime = "戌時";  this.meridian = "心包經";}
          else if (a >=21 && a < 23){this.chineseTime = "亥時";  this.meridian = "三焦經";}
          else {this.chineseTime = "子時";  this.meridian = "膽經";}
        } , 1000);
      });
    }

    ngOnInit(){
    
      if(this.authService.userDetails()){
        this.userEmail = this.authService.userDetails().email;
        console.log("1:" + this.userEmail);
      }else{
        this.navCtrl.navigateBack('');
      }

      //get user email from local storage.
    //   this.storage.get('email').then((val) => {
    //     this.email = val;
    //     console.log(val);
    //   });

      this.email = this.afAuth.auth.currentUser.email;
      console.log("2:" + this.email);
    }

} 
