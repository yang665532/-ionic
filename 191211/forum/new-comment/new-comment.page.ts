import { Component, OnInit, ViewChild } from '@angular/core';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { DataService } from 'src/app/services/data.service';
import * as firebase from 'firebase';
import * as moment from 'moment-timezone';
import { ToastController, IonTextarea, AlertController, NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-new-comment',
  templateUrl: './new-comment.page.html',
  styleUrls: ['./new-comment.page.scss'],
})
export class NewCommentPage implements OnInit {
  userName;
  ProfilePic;
  comment:string = "";
  @ViewChild("newComment") editComment: IonTextarea;

  constructor(public alertCtrl: AlertController,
              public navCtrl: NavController,
              public modalCtrl: ModalController,
              private keyboard: Keyboard,
              public toastCtrl: ToastController,
              private dataService: DataService) {
                this.userName = firebase.auth().currentUser.displayName;
                this.ProfilePic = firebase.auth().currentUser.photoURL;
               }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.editComment.setFocus();
    this.keyboard.show();
  }

  async cancel(){
    const alert = await this.alertCtrl.create({
      header: "確定要離開嗎?所做的編輯不會被儲存。",
      buttons: [{ text: '繼續編輯', role: 'cancel' },
                { text: '放棄編輯', handler: () => {
                   this.modalCtrl.dismiss();   
                }}]
    });
    alert.present();   
  }

  async postComment(comment){
    if(comment == ""){
      console.log("comment require!");
      const toast = await this.toastCtrl.create({
        message: '內容不能為空!',
        duration: 2000
      });
      toast.present();
   }else{
    console.log(comment);
    const uid = firebase.auth().currentUser.uid;
    const userName = this.userName;
    const profilePic = this.ProfilePic;
    const dateTime = moment().format('YY/MM/DD HH:mm');

    this.dataService.postComments(uid, userName, profilePic, comment, dateTime).then(async() =>{
      const toast = await this.toastCtrl.create({
        message: '發文成功!',
        duration: 2000
      });
      toast.present();
      this.modalCtrl.dismiss();
    },
    async error => {
      const toast = await this.toastCtrl.create({
        message: '發文失敗...',
        duration: 2000
      });
      toast.present();
    });
   }
  }

}
