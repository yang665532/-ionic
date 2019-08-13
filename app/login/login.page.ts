import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  

  constructor(public navCtrl: NavController) { }

  goHome(): void{
    this.navCtrl.navigateRoot('/tabs');
  }

  ngOnInit() {
  }

  // async doGoogleLogin(){
  //   const loading = await this.loadingController.create({
  //     message: 'Please wait...'
  //   });
  //   this.presentLoading(loading);
  
  //   this.googlePlus.login({
  //     'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
  //     'webClientId': 'webClientId.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
  //     'offline': true // Optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
  //   })
  //   .then(user =>{
  //     loading.dismiss();
  
  //     this.nativeStorage.setItem('google_user', {
  //       name: user.displayName,
  //       email: user.email,
  //       picture: user.imageUrl
  //     })
  //     .then(() =>{
  //       this.router.navigate(["/user"]);
  //     }, error =>{
  //       console.log(error);
  //     })
  //     loading.dismiss();
  //   }, err =>{
  //     console.log(err)
  //     loading.dismiss();
  //   });
  
  //   async presentLoading(loading) {
  //     return await loading.present();
  //   }
  // }

}

