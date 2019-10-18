import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';
import { async } from '@angular/core/testing';


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
    private dataService: DataService,
    public afAuth: AngularFireAuth,
    private formBuilder: FormBuilder,
    private storage: Storage,
    private router: Router,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController
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
      return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL) //.localPersistence()
      .then(async () => {
        this.loading = await this.loadingCtrl.create();
        await this.loading.present();
    
        const email = loginForm.value.email;
        const password = loginForm.value.password;
    
        this.authService.loginUser(email, password).then(
          () => {
            //this.storage.set('email', email);
            //this.storage.set('password', password);
            this.dataService.setValue('email', email, 'password', password);
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
     });     
    }
  }

  resetPwd(){
    this.navCtrl.navigateRoot('/reset-password');
  }

  goToRegister(){
    this.navCtrl.navigateForward('/register');
  } 

  googleLogin(){
    this.authService.loginWithGoogle().then(async () => {
      await this.loading.present();
      this.router.navigateByUrl('tabs');
    }, error　=> console.log(this.errorMessage));
  }

  // login(){
  //   this.authService.login();
  // }
  
}





