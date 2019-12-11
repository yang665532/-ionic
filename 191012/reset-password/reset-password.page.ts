import { Component, OnInit } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { AlertController, NavController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  public resetPasswordForm: FormGroup;

  constructor(
    private authService: AuthService,
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private router: Router,
    private navCtrl: NavController
  ) {
    this.resetPasswordForm = this.formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, Validators.email]),
      ],
    });
  }

  goback(){
    this.navCtrl.back();
  }

  resetPassword(resetPasswordForm: FormGroup): void{
    if (!resetPasswordForm.valid) {
      console.log(
        'Form is not valid yet, current value:', resetPasswordForm.value
      );
    } else {
      const email: string = resetPasswordForm.value.email;
      this.authService.resetPassword(email).then(
        async () => {
          const alert = await this.alertCtrl.create({
            message: '請查看您的郵件通知並依步驟重設密碼。',
            buttons: [
              {
                text: '關閉',
                role: 'cancel',
                handler: () => {
                  this.router.navigateByUrl('login');
                },
              },
            ],
          });
          await alert.present();
        },
        async error => {
          const errorAlert = await this.alertCtrl.create({
            message: "沒有與此郵件匹配的用戶資料，請確認後再輸入一次。",
            buttons: [{ text: '關閉', role: 'cancel' }],
          });
          await errorAlert.present();
        }
      );
    }
  }

  ngOnInit() {}

}