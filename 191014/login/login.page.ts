import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  ngOnInit(){
    
  }
  
  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
  hasVerified = true;

  cnt:number = 0;
  icon_name:string = "eye";
  type:string = "password";

  public loginForm: FormGroup;
  public loading: HTMLIonLoadingElement;
 
  constructor( 
    private navCtrl: NavController,
    private authService: AuthService,
    public afAuth: AngularFireAuth,
    private formBuilder: FormBuilder,
    //test
    private router: Router,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
  ) { 
    this.loginForm = this.formBuilder.group({
      email: ['',
        Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
  }

  hidepwd(){
    if(this.cnt == 0){
      this.icon_name = "eye-off";
      this.type = "text";
      this.cnt+=1;    
    }else{
      this.icon_name = "eye";
      this.type = "password";
      this.cnt-=1;
    }
  }

  goback(){
    this.navCtrl.back();
  }

  async loginUser(loginForm: FormGroup): Promise<void> {
    if (!loginForm.valid) {
      console.log('Form is not valid yet, current value:', loginForm.value);
    } else {
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();
  
      const email = loginForm.value.email;
      const password = loginForm.value.password;
  
      this.authService.loginUser(email, password).then(
        () => {
          this.loading.dismiss().then(() => {
            this.router.navigateByUrl('tabs');
          });
        },
        error => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              message: "電子郵件或密碼錯誤。",
              buttons: [{ text: '關閉', role: 'cancel' }],
            });
            await alert.present();
          });
        }
      );
    }
  }

  resetPwd(){
    this.navCtrl.navigateRoot('/reset-password');
  }

  goToRegister(){
    this.navCtrl.navigateForward('/register');
  } 

  googleLogin(){
    
  }
  
}









  // goHome(): void{
  //   this.navCtrl.navigateRoot('/tabs');
  // }

  // ngOnInit() {
  //   this.validations_form = this.formBuilder.group({
  //     email: new FormControl('', Validators.compose([
  //       Validators.required,
  //       Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
  //     ])),
  //     password: new FormControl('', Validators.compose([
  //       Validators.minLength(5),
  //       Validators.required
  //     ])),
  //   });
  // }

  // validation_messages = {
  //   'email': [
  //     { type: 'required', message: '請輸入信箱' },
  //     { type: 'pattern', message: '請輸入可用的信箱' }
  //   ],
  //   'password': [
  //     { type: 'required', message: '請輸入密碼' },
  //     { type: 'minlength', message: '密碼長度需大於5個字元' }
  //   ]
  // }; 
 
  // loginUser(value){
  //   this.authService.loginUser(value)
  //   .then(res => {
  //     console.log(res);
  //     this.errorMessage = "";
  //     this.successMessage = "登入成功!歡迎使用";
  //     this.navCtrl.navigateRoot('/tabs');
  //   }, err => {
  //     this.errorMessage = "密碼錯誤或該使用者尚未註冊";
  //     this.successMessage = "";
  //   })
  // }
 



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



