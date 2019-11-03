import { Component, OnInit } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
//sidemenu
export class AppComponent implements OnInit{ 
  userEmail: string;
  userName;
  email: string;
  profilePic;
  a;

  ngOnInit(){
    if(firebase.auth().currentUser){
      this.userEmail = this.authService.userDetails().email;
      this.profilePic = this.authService.userDetails().photoURL;
      //this.userName = this.authService.userDetails().displayName;
      //console.log("2:" + this.userEmail +", " + this.userName);
    }else{
      this.router.navigateByUrl('');
    }

    setInterval(() => {
      this.authService.getName()
    }, 1000);
  }  

  public appPages = [
    { title: '穴位圖總覽',
      url:'/list',
      icon:'book' 
    },{ title: '關於經絡',
      url:'/info',
      icon:'information-circle'
    },{
      title: 'FAQ專區',
      url:'/faq',
      icon:'help-circle'
    },{
      title: '幫助',
      url:'/help',
      icon:'hand'
    },{
      title: '設置',
      url:'/setting',
      icon:'settings'}];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router,
    private storage: Storage
  ) { 
    
   }

  initializeApp() {    
    this.platform.ready().then(() => {
      //this.statusBar.overlaysWebView(true);
      this.statusBar.backgroundColorByHexString('#3EBB9');
      this.splashScreen.hide();
      
      //this.userName = this.authService.getName()
    });  

    // this.platform.ready().then(() => {
    //   //Here we will check if the user is already logged in
    //   //because we don't want to ask users to log in each time they open the app
    //   this.nativeStorage.getItem('google_user')
    //   .then( (data: any) =>{
    //     // user is previously logged and we have his data
    //     // we will let him access the app
    //     this.router.navigate(["/user"]);
    //     this.splashScreen.hide();
    //   }, error =>{
    //     this.router.navigate(["/login"]);
    //     this.splashScreen.hide();
    //   });
    //   this.statusBar.styleDefault();
    // });
  }
}
