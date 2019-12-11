import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { NavController, ToastController, AlertController, ModalController } from '@ionic/angular';
import * as firebase from 'firebase';
import { ActionSheetController } from '@ionic/angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { EditCommentPage } from './edit-comment/edit-comment.page';
import { NewCommentPage } from './new-comment/new-comment.page';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.page.html',
  styleUrls: ['./forum.page.scss'],
})
export class ForumPage implements OnInit {
  title:string = "立冬進補不只補嘴空，中醫推5藥材美味且滋補強身";
  article;            userName;
  ProfilePic;         cmt;
  email;              comment:string = "";
  openOpts;           email_cmt:string;

  userComment:Array<object> = [];
  user_Comment;
  postLikes:Array<object> = [];
  checkResult:Array<object> =[];
  checkUid:boolean = false;
  userCommentRef:AngularFirestoreCollection<object>;

  likes:number = 0;     
  icon_name;
  cnt:number = 0;
  color = "red";

  constructor(public authService: AuthService,
              public toastCtrl: ToastController,
              private navCtrl: NavController,
              private dataService: DataService,
              public actionSheetCtrl: ActionSheetController,
              public alertCtrl: AlertController,
              private firestore: AngularFirestore,
              public modalCtrl: ModalController,
              public router: Router) { 
    if(this.authService.userDetails()){
      this.userName = this.authService.userDetails().displayName;
      this.ProfilePic = this.authService.userDetails().photoURL;
      //console.log("2:" + this.userEmail +", " + this.userName);
    }else{
      this.navCtrl.navigateBack('');
    }
    //get comments
    this.userCommentRef = this.firestore.collection('forum', 
          ref => ref.orderBy('dateTime', 'desc'));

    this.userCommentRef.snapshotChanges().subscribe(data => {
      this.userComment = this.user_Comment = data.map(e =>{
        return {
          uid: e.payload.doc.data()['uid'],
          userName: e.payload.doc.data()['userName'],
          profilePic: e.payload.doc.data()['profilePic'],
          cmt: e.payload.doc.data()['comment'],
          dateTime: e.payload.doc.data()['dateTime'],
          id: e.payload.doc.id
        };
      });console.log(this.userComment);
    });

    //get post likes
    this.dataService.getPostLikes().subscribe(data => {
      this.postLikes =  data.map(e => {
        return {
          idLiked: e.payload.doc.id
        };
      });
    });

    
    // for(let a of this.user_Comment){
    //   let uid = a.uid;
    //   firebase.firestore().collection('userProfile').doc(uid).get().then((data) => {
    //     let name = data.data()['Name']
    //     console.log(name)
    //   })
    // }
  }

  ionViewWillEnter(){
    let uid = firebase.auth().currentUser.uid;
    let i:number=0;

    setTimeout(() => {
      for(i=0; i<this.postLikes.length; i++){
        const likedPost = this.postLikes[i]['idLiked'].toString();
        console.log(uid, likedPost);
        if(likedPost == uid){
          this.cnt += 1;
          console.log("already press like!", this.icon_name+this.cnt);
          this.icon_name = "heart";
          break;
        }else{        
          this.cnt += 0;
          console.log("haven't press like!", this.icon_name+this.cnt);
          this.icon_name = "heart-empty";
        }
      }
    }, 1000);
  }

  ngOnInit() {
    this.article = "【早安健康／唐佑任（臺北醫學大學附設醫院傳統醫學科主治醫師）】\n\n2016年的立冬時節為11月7日，《月令七十二候集解》說：「立，建始也。冬，終也，萬物收藏也。」在中國傳統農業社會進入此時節代表著冬天的開始，一年的田間操作結束，要將收成的農作物貯存好以度過嚴寒的冬季；而在台灣，冬季寒冷程度和長度雖不像中國一樣，有時也會持續農作，但仍有相同風俗，就是在立冬進補，希望在這一年辛勞工作後，潛伏閉藏收斂散失的陽氣，再度用滿滿活力面對全新一年的挑戰！\n\n傳統藥燉養生是飲食文化的重要組成部份，「醫食同源」、「藥食同源」 是自古以來的食療養生觀念，其根據治療、強身、抗衰老的需求，在中醫藥理論指導下，將中藥與某些具有藥用價值的食物相配伍，並採用獨特的飲食烹調技術和現代科學方法，製作成具有色、香、味、形的美味食品，使得在防病治病滋補強身、抗老延年方面具有獨到之處。\n\n台灣人冬天或天冷常會吃些麻油雞、薑母鴨或者是四物湯、十全大補湯、當歸熬排骨湯等，希望能夠氣血雙補（益氣攝血生血，金元時期醫學名家李杲提出的當歸補血湯中所強調的概念），藉此以驅風散寒避免感冒，同時減輕疲勞感養精蓄銳，大都以人參、當歸、肉桂、黃耆、熟地等常見中藥為主；但並不是所有補性的食材都能起到相同效果，若是服用不當或過量反而會蒙受其害。";
   
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

  async addComment(){
    const newc = await this.modalCtrl.create({
      component: NewCommentPage
    });
    return await newc.present();
  
  }

  optsOrNot(uid){
    const currentUserUid = firebase.auth().currentUser.uid;
    if(uid == currentUserUid){
      return true;
    }else {
      return false;
    }
  }

  name(uid){
    
  }

  likeComment(){
    let uid = firebase.auth().currentUser.uid;
    //let likedUid = this.postLikes;
    if(this.cnt !== 0){
      this.cnt -= 1;  
      this.icon_name = "heart-empty";
      console.log('disliked', this.cnt);
      firebase.firestore().doc(`/forum_likes/${uid}`).delete();
    }else{
      this.cnt += 1;  
      this.icon_name = "heart";
      console.log('liked', this.cnt);
      firebase.firestore().doc(`/forum_likes/${uid}`).set({});
    }
  }

}
