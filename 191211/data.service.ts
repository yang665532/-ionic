import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, ToastController } from '@ionic/angular';
import * as moment from 'moment-timezone';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  cnt:number = 0;
  userName_cmt;
  timeStamp;
  user = firebase.auth().currentUser.uid;
  userCommentRef;
  userComment;

  constructor(private storage: Storage,
              private firestore: AngularFirestore,
              public alertCtrl: AlertController,
              private toastCtrl: ToastController,
              private webview: WebView,
              private authService: AuthService) {
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

  getUserEmail(): Promise<any> {
    return this.storage.get('email');
  }
  getUserPwd(): Promise<any> {
    return this.storage.get('password');
  }

  getPostLikes() {
    return this.firestore.collection('forum_likes').snapshotChanges();
  }

  async postComments(uid:string, userName:string, profilePic:string, comment:string, dateTime:string):Promise<any>{
    try {
        //const random = firebase.auth().currentUser;
        const timeStamp = new Date();
      firebase.firestore().doc(`/forum/${timeStamp}`)
        .set({ uid, userName, profilePic, comment, dateTime });
    }
    catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  async editComments(id:string, comment:string):Promise<any>{
    try {
      firebase.firestore().doc(`/forum/${id}`)
        .update({ comment });
    }
    catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }
  uploadImageToFirebase(image){
    const imageUrl = this.webview.convertFileSrc(image);
    //uploads img to firebase storage
    this.uploadImage(imageUrl)
    .then(async photoURL => {
      this.getAvatar();
      let toast = await this.toastCtrl.create({
        message: '成功上傳頭像！',
        duration: 3000
      });
      await toast.present();
      })
    }

  uploadImage(imageURI){
    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref(this.user + '/avatar.jpeg');
      this.encodeImageUrl(imageURI, function(image64){
        storageRef.putString(image64, 'data_url')
        .then(snapshot => {
          resolve(snapshot.downloadURL);
        }, err => {
          reject(err);
        })
      })
    })
  }

  getAvatar(){
    let storageRef = firebase.storage().ref(this.user + '/avatar.jpeg');
    let user = firebase.auth().currentUser;
    let userUid = firebase.auth().currentUser.uid;

    storageRef.getDownloadURL().then(url => {
      this.updateForumProfilePic(url)
      user.updateProfile({photoURL: url}).then(function() {
        url = user.photoURL;
        console.log('change success!')
        firebase.firestore().collection('userProfile').doc(userUid).update({profilePic: url})
      }, function(error) {
        // An error happened.
        console.log(error + 'error updating photo!')
      });
    }).catch(function(error) {
      // Handle any errors
    });
  }

  updateForumProfilePic(profilePic){
    for(let cmt of this.userComment){
      let cmtUid = cmt.uid
      let cmtId = cmt.id

      if(cmtUid == this.user){
        console.log(cmtId + '\n' + cmt.profilePic)
        firebase.firestore().doc(`/forum/${cmtId}`).update({ profilePic });
      }
    }
  }

  encodeImageUrl(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux:any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  };

  async checkDelete(id){
    const alert = await this.alertCtrl.create({
      header: "是否要刪除此留言?",
      buttons: [{ text: '取消', role: 'cancel' },
                { text: '確定', handler: () => {
                  firebase.firestore().doc(`/forum/${id}`).delete()
                  console.log('Comment deleted.',id);   
                }}]
    });
    alert.present();   
  }
  
  //get course
  getCoursePart(){
    return this.firestore.collection('course')
    .doc('VnhhtoiEsuIcQvcY3hK9').collection('part').snapshotChanges();
  }
  getPartDesc(id){
    return this.firestore.collection('course')
    .doc('VnhhtoiEsuIcQvcY3hK9').collection('part')
    .doc(id).collection('Description')
    .snapshotChanges();
  }

  getCourseType(){
    return this.firestore.collection('course')
    .doc('VnhhtoiEsuIcQvcY3hK9').collection('type').snapshotChanges();
  }
  getTypeDesc(id){
    return this.firestore.collection('course')
    .doc('VnhhtoiEsuIcQvcY3hK9').collection('type')
    .doc(id).collection('Description')
    .snapshotChanges();
  }

  savePoints(uid, Points:number, Reason){
    const TimeStamp = moment().format('YYYY-MM-DD');

    return this.firestore.collection('userPoints').doc(uid).collection('points').doc(TimeStamp).set({ Points, Reason });
  }

  getPoints(uid){
    return this.firestore.collection('userPoints').doc(uid).collection('points').snapshotChanges();
  }
}
