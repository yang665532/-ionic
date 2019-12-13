import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { ToastController, NavController, ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { EditCommentPage } from 'src/app/forum/edit-comment/edit-comment.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mycomments',
  templateUrl: './mycomments.page.html',
  styleUrls: ['./mycomments.page.scss'],
})
export class MycommentsPage implements OnInit {
  userCommentRef;
  userComment;
  isCmted;

  constructor(public authService: AuthService,
    public toastCtrl: ToastController,
    private dataService: DataService,
    public actionSheetCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    private firestore: AngularFirestore,
    public modalCtrl: ModalController,
    private router: Router) { 
    //get comments
    this.userCommentRef = this.firestore.collection('forum').doc('2019_li_don').collection('comments' , 
      ref => ref.orderBy('dateTime', 'desc'));

    this.userCommentRef.snapshotChanges().subscribe(data => {
      this.userComment = data.map(e =>{
        return {
          uid: e.payload.doc.data()['uid'],
          userName: e.payload.doc.data()['userName'],
          profilePic: e.payload.doc.data()['profilePic'],
          cmt: e.payload.doc.data()['comment'],
          dateTime: e.payload.doc.data()['dateTime'],
          title: e.payload.doc.data()['title'],
          id: e.payload.doc.id
        };
      });console.log(this.userComment);
    });

  }

  ngOnInit() {
  }

  toPost(){
    this.router.navigateByUrl('tabs/forum')
  }

  async moreOpts(id, userName, ProfilePic, cmt){
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [{
        text: '編輯',
        icon: 'md-create',
        handler: () => {
          console.log("1: " + id, userName, ProfilePic, cmt);
          this.editComment(id, userName, ProfilePic, cmt);
        }
      }, {
        text: '刪除',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.dataService.checkDelete(id);
        }
      }]
    });
    await actionSheet.present();
  }

  async editComment(id, userName, ProfilePic, cmt){
    const modal = await this.modalCtrl.create({
      component: EditCommentPage,
      componentProps: {
        'id': id,
        'userName': userName,
        'ProfilePic': ProfilePic,
        'cmt': cmt
      }
    });console.log("2: "+id, userName, ProfilePic, cmt);
    return await modal.present();
  }

  currentUserCmt(uid){
    const currentUserUid = firebase.auth().currentUser.uid;
    if(uid == currentUserUid){
      this.isCmted = true;
      return true;
    }else {
      this.isCmted = false;
      return false;
    }
  }
}
