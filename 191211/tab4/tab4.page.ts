import { Component, OnInit } from '@angular/core';
import { NavController, ActionSheetController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { Camera, CameraOptions } from '@ionic-native/Camera/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { File } from '@ionic-native/file/ngx';

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
  userCommentRef;
  userComment;

  croppedImagepath = "";

  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };

  constructor(public navCtrl: NavController,
              private authService: AuthService,
              private dataService: DataService,
              private camera: Camera,
              private crop: Crop,
              private file: File,
              public actionSheetCtrl: ActionSheetController) { }
  public fullList =[
    { title: '我的訂單',
      url:'/orders',
      icon:'filing' 
    },{
      title: '我的按讚',
      url:'/likes-posts',
      icon:'heart'
    },{
      title: '我的留言',
      url:'/mycomments',
      icon:'chatboxes'
    },{
      title: '我的點數',
      url:'/mypoints',
      svg:'assets/icon/coin.svg'}
  ];

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
    this.uploadOpts = false;
  }

  changePhoto(){
    this.uploadOpts = !this.uploadOpts;
  }

  logout(){
    this.authService.logoutUser();
  }

  pickImage(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      this.cropImage(imageData);
    }, (err) => {
      // Handle error
    });
  }

  async selectImage() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: "選擇圖像來源",
      buttons: [{
        text: '從相簿',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.PHOTOLIBRARY);
      }},{
        text: '使用相機',
        handler: () => {
          this.pickImage(this.camera.PictureSourceType.CAMERA);
      }},{
        text: '取消',
        role: 'cancel'
      }]
    });
    await actionSheet.present();
  }

  cropImage(fileUrl) {
    this.crop.crop(fileUrl, { quality: 50 })
      .then(
        newPath => {
          this.showCroppedImage(newPath.split('?')[0])
        },
        error => {
          alert('Error cropping image' + error);
        }
      );
  }

  showCroppedImage(ImagePath) {
    var copyPath = ImagePath;
    var splitPath = copyPath.split('/');
    var imageName = splitPath[splitPath.length - 1];
    var filePath = ImagePath.split(imageName)[0];

    this.file.readAsDataURL(filePath, imageName).then(async base64 => {
      this.croppedImagepath = base64;
      this.dataService.uploadImageToFirebase(base64);
    });
  }
}
