import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from './../services/auth.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
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
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.signupForm = this.formBuilder.group({
      email:['', Validators.compose([
            Validators.required,
            Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
          ])],
      password: ['',
        Validators.compose([Validators.minLength(6), Validators.required])
      ],
      re_password: ['', Validators.compose([
          Validators.required,
          this.equalTo('password')
        ])],
        UserName: ['', Validators.compose([
        Validators.required,
        Validators.minLength(3), Validators.maxLength(20)
      ])]
    });

    
  }
  ngOnInit(){}

  

  async signupUser(signupForm: FormGroup): Promise<void> {
    if (!signupForm.valid) {
      console.log('Need to complete the form, current value: ', signupForm.value);
    } else {
      const email: string = signupForm.value.email;
      const password: string = signupForm.value.password;
      const UserName: string = signupForm.value.UserName;

      const user = {
        email: this.signupForm.value.email,
        password: this.signupForm.value.password};

      let emailPwd = {
        queryParams: {
          special: JSON.stringify(user)
        }
      };
  
      this.authService.registerUser(email, password, UserName).then(
        () => {
          this.authService.setUserName(UserName)
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              header: "歡迎",
              message: "註冊成功!請驗證您的電子郵件。",
              buttons: [{ text: '關閉', role: 'cancel' }]
            });
            
            this.router.navigate(['verify-email'], emailPwd);
            //this.router.navigateByUrl('verify-email');
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
        this.loading = await this.loadingCtrl.create();
        await this.loading.present();
      }
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

}
