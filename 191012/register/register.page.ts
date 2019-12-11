import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from './../services/auth.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
//import { AngularFireAuth } from '@angular/fire/auth';
//import { AngularFireAuth } from '@angular/fire/auth/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  cnt: number = 0;
  icon_name: string = "eye";
  type: string = "password";
  icon_name2: string = "eye";
  type2: string = "password";

  public signupForm: FormGroup;
  public loading: any;
  
  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    //private afAuth: AngularFireAuth,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.signupForm = this.formBuilder.group({
      email:['', Validators.compose([
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
          ])],
      password: ['',
        Validators.compose([Validators.minLength(6), Validators.required])
      ],
      re_password: ['',
        Validators.compose([
          Validators.required,
          this.equalTo('password')
        ])]
    });
  }

  equalTo(password):ValidatorFn{
    return (control: AbstractControl): {[key: string]: any} => {
      let input = control.value;      
      let isValid=control.root.value[password]==input

      if(!isValid){
        return { 'equalTo': {isValid} }
      }else{
        return null;
      }};
  }

  goback(){
    this.navCtrl.back();
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

  hidere_pwd(){
    if(this.cnt == 0){
      this.icon_name2 = "eye-off";
      this.type2 = "text";
      this.cnt+=1;    
    }else{
      this.icon_name2 = "eye";
      this.type2 = "password";
      this.cnt-=1;
    }
  }

  async signupUser(signupForm: FormGroup): Promise<void> {
    if (!signupForm.valid) {
      console.log('Need to complete the form, current value: ', signupForm.value);
    } else {
      const email: string = signupForm.value.email;
      const password: string = signupForm.value.password;
  
      this.authService.registerUser(email, password).then(
        () => {
          //this.afAuth.auth.currentUser.sendEmailVerification().then(() =>
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              header: "歡迎",
              message: "註冊成功!請驗證您的電子郵件。",
              buttons: [{ text: '關閉', role: 'cancel' }]
            });
            this.router.navigateByUrl('verify-email');
            await alert.present();
          });
        },
        error => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              message: "這個帳號已被註冊過。",
              buttons: [{ text: '關閉', role: 'cancel' }],
            });
            await alert.present();
          });
        }
      );
        this.loading = await this.loadingCtrl.create();//this.router.navigateByUrl('tabs');
        await this.loading.present();
      }
    }
  

  ngOnInit(){
    // this.validations_form = this.formBuilder.group({
    //   email: new FormControl('', Validators.compose([
    //     Validators.required,
    //     Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    //   ])),
    //   password: new FormControl('', Validators.compose([
    //     Validators.minLength(5),
    //     Validators.required
    //   ])),
    // });
  }
 
  // tryRegister(value){
  //   this.authService.registerUser(value)
  //    .then(res => {
  //      console.log(res);
  //      this.errorMessage = "";
  //      this.successMessage = "帳號註冊成功，請重新登入";
  //    }, err => {
  //      console.log(err);
  //      this.errorMessage = err.message; //改中文(email address already in use)
  //      this.successMessage = "";
  //    })
  // }
 
  // goLoginPage(){
  //   this.navCtrl.navigateRoot('/login');
  // }

}
