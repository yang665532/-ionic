import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, LoadingController  } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import * as firebase from 'firebase/app';
import { NativeStorage } from '@ionic-native/native-storage/ngx';


@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {
  hasVerified = true;
  verificationEmailSent;
  data: any;
  user:Array<object> = [];

  constructor(public afAuth: AngularFireAuth,
              private alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private authService: AuthService,
              private dataService:DataService,
              private router: Router,
              private route: ActivatedRoute,
              private localStorage: NativeStorage) { 
                this.afAuth.authState.subscribe(user =>{
                  setInterval(() => {
                    this.afAuth.auth.currentUser.reload().then(() => {
                        if(user)
                        this.hasVerified = this.afAuth.auth.currentUser.emailVerified;
                      });
                  }, 1000);
                })

                // this.route.queryParams.subscribe(params => {
                //   if (params && params.special) {
                //     this.data = JSON.parse(params.special);
                //     console.log(this.data);
                //   }
                // });
              }

  ngOnInit() {
  }

  sendVerificationEmail(){
    this.afAuth.auth.currentUser.sendEmailVerification();
    this.verificationEmailSent = new Date();
  }

  async verifyEmail(){
    this.afAuth.auth.onAuthStateChanged(async user =>{
      if(!this.hasVerified){
        console.log(this.hasVerified);
        const alert = await this.alertCtrl.create({
          message: "登入失敗！請驗證您的電子郵件。",
          buttons: [{ text: 'Ok', role: 'cancel' }]
        });
        await alert.present();
      }else{
        console.log(this.hasVerified);
        const loading = await this.loadingCtrl.create({
          message: "認證中，請稍後...",
          duration: 1000
        });
        await loading.present();

        let email = await this.dataService.getUserEmail();
        let password = await this.dataService.getUserPwd();


        this.authService.loginUser(email, password).then(() => {
          this.router.navigateByUrl('tabs');
        });
      }
    })      
  }
}  