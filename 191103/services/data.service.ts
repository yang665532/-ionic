import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  cnt:number = 0;
  userName_cmt;
  timeStamp;

  constructor(private storage: Storage,private firestore: AngularFirestore) {
   }
//email: string, value_email: any, password: string, value_pwd: any
  setValue(value_email, value_pwd, value_name) {
    this.storage.set('email', value_email);
    this.storage.set('password', value_pwd);
    this.storage.set('userName', value_name);
    return true;      
  }

  getUserEmail(): Promise<any> {
    return this.storage.get('email');
  }
  getUserPwd(): Promise<any> {
    return this.storage.get('password');
  }

  readComment() {
    return this.firestore.collection('forum').snapshotChanges();
  }

  async postComments(userUid:string, userName:string, profilePic:string, comment:string, dateTime:string, timeStamp:Date):Promise<any>{
    try {
        //const random = firebase.auth().currentUser;
        ///const timeStamp = new Date();
      firebase.firestore().doc(`/forum/${timeStamp}`)
        .set({ userUid, userName, profilePic, comment, dateTime, timeStamp }).then(() => {
          // this.cnt+=1;
          // console.log(this.cnt);
        });
    }
    catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  uploadImage(imageURI){
    return new Promise<any>((resolve, reject) => {
      let storageRef = firebase.storage().ref();
      let imageRef = storageRef.child('image').child('imageName');
      this.encodeImageUri(imageURI, function(image64){
        imageRef.putString(image64, 'data_url')
        .then(snapshot => {
          resolve(snapshot.downloadURL)
        }, err => {
          reject(err);
        })
      })
    })
  }
  encodeImageUri(imageUri, callback) {
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
}
