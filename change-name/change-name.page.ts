import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app'
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Title } from '@angular/platform-browser';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-change-name',
  templateUrl: './change-name.page.html',
  styleUrls: ['./change-name.page.scss'],
})
export class ChangeNamePage implements OnInit {
  userName;
  user = firebase.auth().currentUser;
  uid = firebase.auth().currentUser.uid;
  userCommentRef;
  userComment;

  constructor(private authService: AuthService,
              private router: Router,
              private loading: LoadingController,
              private firestore: AngularFirestore) { 
    this.userName = authService.getName();
    this.userCommentRef = this.firestore.collection('forum');

    this.userCommentRef.snapshotChanges().subscribe(data => {
      this.userComment = data.map(e =>{
        return {
          uid: e.payload.doc.data()['uid'],
          userName: e.payload.doc.data()['userName'],
          profilePic: e.payload.doc.data()['profilePic'],
          id: e.payload.doc.id
        };
      });
    });
  }

  ngOnInit() {
  }

  async saveName(userName){
    this.user.updateProfile({displayName: userName})
    this.updateForumName(userName)
    const load = await this.loading.create({
      duration: 500,
      message: '儲存中...'
    })
    await load.present()
    await load.dismiss().then(() => {
      this.router.navigateByUrl('setting')})
  }

  updateForumName(userName){
    for(let cmt of this.userComment){
      let cmtUid = cmt.uid
      let cmtId = cmt.id

      if(cmtUid == this.uid){
        //console.log(cmtId + '\n' + cmt.userName)
        firebase.firestore().doc(`/forum/${cmtId}`).update({ userName });
      }
    }
  }
}
