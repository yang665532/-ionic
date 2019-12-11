import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, ModalController, NavParams, AlertController, IonTextarea, ToastController } from '@ionic/angular';
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-edit-comment',
  templateUrl: './edit-comment.page.html',
  styleUrls: ['./edit-comment.page.scss'],
})
export class EditCommentPage implements OnInit {
  id;
  userName;
  ProfilePic;
  cmt;
  comment:string = "";
  @ViewChild("editComment") editComment: IonTextarea;

  constructor(public alertCtrl: AlertController,
              public navCtrl: NavController,
              public modalCtrl: ModalController,
              public navParams: NavParams,
              private keyboard: Keyboard,
              public toastCtrl: ToastController,
              private dataService: DataService) {  }

  ngOnInit() {
    setInterval(() => {
        this.id = this.navParams.get('id'),
        this.userName = this.navParams.get('userName'),
        this.ProfilePic = this.navParams.get('ProfilePic'),
        this.cmt = this.navParams.get('cmt')
    }, 1000);
    this.comment = this.cmt
  }

  ionViewDidEnter(){
    this.editComment.setFocus();
    this.keyboard.show();
  }

  async closeModal(){
    const alert = await this.alertCtrl.create({
      header: "確定要離開嗎?所做的編輯不會被儲存。",
      buttons: [{ text: '繼續編輯', role: 'cancel' },
                { text: '放棄編輯', handler: () => {
                   this.modalCtrl.dismiss();   
                }}]
    });
    alert.present();   
  }

  async postEditComment(comment){
    if(comment == ""){
      console.log("comment require!");
      const toast = await this.toastCtrl.create({
        message: '內容不能為空!',
        duration: 2000
      });
      toast.present();
   }else{
    console.log(comment);
    const id = this.id;

    this.dataService.editComments(id, comment).then(async() =>{
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
