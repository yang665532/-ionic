import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { async } from 'q';

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
              private router: Router) { 
                // this.afAuth.authState.subscribe(user =>{
                //   if(user)
                //     this.hasVerified = this.afAuth.auth.currentUser.emailVerified;
                // });
              }

  ngOnInit() {
  }

  sendVerificationEmail(){
    this.afAuth.auth.currentUser.sendEmailVerification();
    this.verificationEmailSent = new Date();
  }

  async verifyEmail(){
      if(this.hasVerified){
        const alert = await this.alertCtrl.create({
          header: "Attention!",
          message: "Login fail! Please Verify Your Email.",
          buttons: [{ text: 'Ok', role: 'cancel' }]
        });
        await alert.present();
      }
  }

  loadTabs(){
    this.afAuth.authState.subscribe(user =>{
      if(user){        
        this.hasVerified = this.afAuth.auth.currentUser.emailVerified;
        console.log("test");
        //this.router.navigateByUrl('tabs');
        async() =>{
          const alert = await this.alertCtrl.create({
            header: "Attention!",
            message: "Login fail! Please Verify Your Email.",
            buttons: [{ text: 'Ok', role: 'cancel' }]
          });
          await alert.present();
        }
       } 
      //else {
      //   async() =>{
      //     const alert = await this.alertCtrl.create({
      //       header: "Attention!",
      //       message: "Login fail! Please Verify Your Email.",
      //       buttons: [{ text: 'Ok', role: 'cancel' }]
      //     });
      //     await alert.present();
      //   };
      // }
    }) 
  }
}  