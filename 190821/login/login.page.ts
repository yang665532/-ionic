import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
 
  constructor(
 
    private navCtrl: NavController,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) { }

  goHome(): void{
    this.navCtrl.navigateRoot('/tabs');
  }

  ngOnInit() {
    this.validations_form = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  validation_messages = {
    'email': [
      { type: 'required', message: '請輸入信箱' },
      { type: 'pattern', message: '請輸入可用的信箱' }
    ],
    'password': [
      { type: 'required', message: '請輸入密碼' },
      { type: 'minlength', message: '密碼長度需大於5個字元' }
    ]
  }; 
 
  loginUser(value){
    this.authService.loginUser(value)
    .then(res => {
      console.log(res);
      this.errorMessage = "";
      this.successMessage = "登入成功!歡迎使用";
      this.navCtrl.navigateRoot('/tabs');
    }, err => {
      this.errorMessage = "密碼錯誤或該使用者尚未註冊";
      this.successMessage = "";
    })
  }
 
  goToRegister(){
    this.navCtrl.navigateForward('/register');
  } 
}

// presentToast() {
//   const toast = this.toastCtrl.create({
//     message: 'User was added successfully',
//     duration: 3000
//   });
//   toast.present();
// }


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



