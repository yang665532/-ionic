import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {

  constructor(public navCtrl: NavController,
              private authService: AuthService,
              private alertCtrl: AlertController) { }
  async logout(){
    const alert = await this.alertCtrl.create({
      header: "是否確定要登出？",
      buttons: [{text: '取消', role: 'cancel'}
              , {text: '是', handler: () => {
                  this.authService.logoutUser()
                .then(res => {
                  console.log(res);
                  this.navCtrl.navigateBack('entrance');
                })
                .catch(error => {
                  console.log(error);
                })
            }}]
    })
    await alert.present()
  }

  ngOnInit() {
  }

}
