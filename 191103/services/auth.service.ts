import { Injectable } from "@angular/core";
import * as firebase from 'firebase/app';
import { Platform } from '@ionic/angular';
import 'firebase/auth';
import 'firebase/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { BehaviorSubject } from 'rxjs';
import { DataService } from './data.service';
import AuthProvider = firebase.auth.AuthProvider;


//const TOKEN_KEY = 'auth-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authState = new BehaviorSubject(false);
  email:string;
  password: string;
  data;
  user;

  constructor(public angularFireAuth: AngularFireAuth,
              private platform: Platform,
              private dataService: DataService,
              public afAuth: AngularFireAuth
              ) { 
                afAuth.authState.subscribe(user => {
                  this.user = this.afAuth.auth.currentUser;
                  console.log(this.user);
                });

                // this.platform.ready().then(async() => {
                //   this.checkToken();
                // });
              }
  async registerUser(email:string, password:string, UserName:string, profilePic:string):Promise<any>{
    try {
        const newUserCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
      firebase.firestore().doc(`/userProfile/${newUserCredential.user.uid}`)
        .set({ email, password, UserName, profilePic });
      this.dataService.setValue(email, password, UserName);
    }
    catch (error) {
      console.error(error);
      throw new Error(error);
    }
  }

  setUserProfile(userName:string, profilePic:string){
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: userName,
      photoURL: profilePic
    }).then(function() {
      // Profile updated successfully!
      // "Jane Q. User"
      userName = user.displayName;
      profilePic = user.photoURL;
      // "https://example.com/jane-q-user/profile.jpg"
      //photo = user.photoURL;
    }, function(error) {
      // An error happened.
    });
  }

  resetPassword(email:string): Promise<void>{
    return firebase.auth().sendPasswordResetEmail(email)
  }

  loginUser(email:string, password:string):Promise<firebase.auth.UserCredential>{
    return firebase.auth().signInWithEmailAndPassword(email, password);      
  }

  logoutUser():Promise<void>{
    localStorage.clear();
    return firebase.auth().signOut();
  }

  userDetails(){
    return firebase.auth().currentUser;
  }

  getName(){
    return this.user && this.user.displayName;
  }

  async loginWithGoogle() {
    console.log('Sign in with google');
		return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
    //return await this.angularFireAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
  }

  private oauthSignIn(provider: AuthProvider) {
    if (!(<any>window).cordova) {
      return this.afAuth.auth.signInWithPopup(provider);
    } else {
      return this.afAuth.auth.signInWithRedirect(provider)
      .then(() => {
        return this.afAuth.auth.getRedirectResult().then( result => {
          // This gives you a Google Access Token.
          // You can use it to access the Google API.
          let token = (<any>result).credential.accessToken;
          // The signed-in user info.
          let user = result.user;
          console.log(token, user);
        }).catch(function(error) {
          // Handle Errors here.
          alert(error.message);
        });
      });
    }
  }
}

 

