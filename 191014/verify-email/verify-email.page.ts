import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController, LoadingController  } from '@ionic/angular';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {
  hasVerified = true;
  verificationEmailSent;

  constructor(public afAuth: AngularFireAuth,
              private alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private router: Router) { 
                this.afAuth.authState.subscribe(user =>{
                  setInterval(() => {
                    this.afAuth.auth.currentUser.reload().then(() => {
                        if(user)
                        this.hasVerified = this.afAuth.auth.currentUser.emailVerified;
                      });
                  }, 1000);
                })
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
      }
    })      
  }

  


  loadTabs(){
    this.afAuth.authState.subscribe(user =>{
      //this.hasVerified = this.afAuth.auth.currentUser.emailVerified;
      if(user){                
        console.log("test");
        
        
      //   async() =>{
      //     const alert = await this.alertCtrl.create({
      //       header: "Attention!",
      //       message: "Login fail! Please Verify Your Email.",
      //       buttons: [{ text: 'Ok', role: 'cancel' }]
      //     });
      //     await alert.present();
      //     this.router.navigateByUrl('tabs');
      //   }
      //  } 
      // else {
      //   async() =>{
      //     const alert = await this.alertCtrl.create({
      //       header: "Attention!",
      //       message: "Login fail! Please Verify Your Email.",
      //       buttons: [{ text: 'Ok', role: 'cancel' }]
      //     });
      //     await alert.present();
      //   };
      }
    }) 
  }
}  