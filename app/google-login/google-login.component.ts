import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform } from 'ionic-angular';

@Component({
  selector: 'app-google-login',
  templateUrl: './google-login.component.html',
  styleUrls: ['./google-login.component.scss'],
})
export class GoogleLoginComponent implements OnInit {

  user: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth,
              private gplus: GooglePlus,
              private platform: Platform) {
      
      this.user = this.afAuth.authState;
  }

  googleLogin(){
    if (this.platform.is('cordova')){
      this.nativeGoogleLogin();
    }else{
      this.webGoogleLogin();
    }
  }
//We need to add the google-login component to the Login html page.
async nativeGoogleLogin(): Promise<firebase.User>{
  try{
    const gplusUser = await this.gplus.login({
      'webClientID': '915665090700-56g4q80qil50cphlj4ambq3b0ubr7lr1.apps.googleusercontent.com',
      'offline': true,
      'scopes': 'profile email photo'
    })

    return await 
      this.afAuth.auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(gplusUser.idToken))
      
  } catch(err){
    console.log(err)
  }
}

async webGoogleLogin(): Promise<void>{
  try{
    const provider = await firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.auth.signInWithPopup(provider);

  } catch(err){
    console.log(err)
  }
}

signOut(){
  this.afAuth.auth.signOut();
  if (this.platform.is('cordova')){
    this.gplus.logout();
  }
}


  ngOnInit() {}

}
