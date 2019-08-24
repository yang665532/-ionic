import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  validations_form: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';
 
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
 
  constructor(
    private navCtrl: NavController,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {}

  goHome(): void{
    this.navCtrl.navigateRoot('/tabs');
  }

  ngOnInit(){
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
 
  tryRegister(value){
    this.authService.registerUser(value)
     .then(res => {
       console.log(res);
       this.errorMessage = "";
       this.successMessage = "帳號註冊成功，請重新登入";
     }, err => {
       console.log(err);
       this.errorMessage = err.message; //改中文(email address already in use)
       this.successMessage = "";
     })
  }
 
  goLoginPage(){
    this.navCtrl.navigateRoot('/login');
  }

}
