import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  items:Array<Object>=[];	
  userEmail;
  userName;
  profilePic;
  uploadOpts;
  email;
  pwd;

  constructor(public navCtrl: NavController,
              private authService: AuthService) {
    }	

  ngOnInit() {
    if(this.authService.userDetails()){
      this.userEmail = this.authService.userDetails().email;
      this.userName = this.authService.userDetails().displayName;
      this.profilePic = this.authService.userDetails().photoURL;
      console.log("1:" + this.userEmail +", " + this.userName);
    }else{
      this.navCtrl.navigateBack('');
    }
    
  }
  ionViewDidEnter(){
    document.addEventListener("backbutton",function(e) {
      console.log("disable back button")
    }, false);
  }

  ionViewWillLeave(){
    this.uploadOpts = "";
  }

  changePhoto(){
    this.uploadOpts = "上傳大頭照";
  }

  uploadCancel(){
    this.uploadOpts = "";
  }

  uploadPic(){

  }

}
