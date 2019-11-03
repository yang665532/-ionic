import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { NavController, LoadingController, ToastController } from '@ionic/angular';
import * as firebase from 'firebase';
import * as moment from 'moment-timezone';
import { ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-forum',
  templateUrl: './forum.page.html',
  styleUrls: ['./forum.page.scss'],
})
export class ForumPage implements OnInit {
  article;
  userName;
  ProfilePic;
  comment:string = "";
  userComment:Array<object> =[];
  cmt;
  openOpts;
  checkUid:boolean = false;
  checkResult:Array<object> =[];

  constructor(public authService: AuthService,
              public toastCtrl: ToastController,
              private loadingCtrl: LoadingController,
              private navCtrl: NavController,
              private dataService: DataService,
              public actionSheetCtrl: ActionSheetController) { 
    if(this.authService.userDetails()){
      this.userName = this.authService.userDetails().displayName;
      this.ProfilePic = this.authService.userDetails().photoURL;
      //console.log("2:" + this.userEmail +", " + this.userName);
    }else{
      this.navCtrl.navigateBack('');
    }

    this.dataService.readComment().subscribe(data => {
      this.userComment = data.map(e => {
        return {
          userUid: e.payload.doc.data()['userUid'],
          userName: e.payload.doc.data()['userName'],
          profilePic: e.payload.doc.data()['profilePic'],
          cmt: e.payload.doc.data()['comment'],
          dateTime: e.payload.doc.data()['dateTime'],
          timeStamp: e.payload.doc.data()['timeStamp']
        };
      });console.log(this.userComment[0])
      //match current user uid with comment's
      let i:number = 0;
      let uid = firebase.auth().currentUser.uid;

      for(i=0; i<5; i++){
        const userUid_cmt:string = this.userComment[i]['userUid'];
        console.log("userUid_cmt: "+userUid_cmt);
        console.log("uid:　"+uid);
        if(uid == userUid_cmt){
          this.checkUid = true;
          console.log(this.checkUid);
        }else{
          this.checkUid = false;
          console.log(this.checkUid);
        }
        this.checkResult.push({[i]:this.checkUid})
        console.log(this.checkResult);
      }
    });
  }

  ngOnInit() {
    this.article = "【早安健康／唐佑任（臺北醫學大學附設醫院傳統醫學科主治醫師）】\n\n2016年的立冬時節為11月7日，《月令七十二候集解》說：「立，建始也。冬，終也，萬物收藏也。」在中國傳統農業社會進入此時節代表著冬天的開始，一年的田間操作結束，要將收成的農作物貯存好以度過嚴寒的冬季；而在台灣，冬季寒冷程度和長度雖不像中國一樣，有時也會持續農作，但仍有相同風俗，就是在立冬進補，希望在這一年辛勞工作後，潛伏閉藏收斂散失的陽氣，再度用滿滿活力面對全新一年的挑戰！\n\n傳統藥燉養生是飲食文化的重要組成部份，「醫食同源」、「藥食同源」 是自古以來的食療養生觀念，其根據治療、強身、抗衰老的需求，在中醫藥理論指導下，將中藥與某些具有藥用價值的食物相配伍，並採用獨特的飲食烹調技術和現代科學方法，製作成具有色、香、味、形的美味食品，使得在防病治病滋補強身、抗老延年方面具有獨到之處。\n\n台灣人冬天或天冷常會吃些麻油雞、薑母鴨或者是四物湯、十全大補湯、當歸熬排骨湯等，希望能夠氣血雙補（益氣攝血生血，金元時期醫學名家李杲提出的當歸補血湯中所強調的概念），藉此以驅風散寒避免感冒，同時減輕疲勞感養精蓄銳，大都以人參、當歸、肉桂、黃耆、熟地等常見中藥為主；但並不是所有補性的食材都能起到相同效果，若是服用不當或過量反而會蒙受其害。";
    //this.cmt = "大家快來找我聊天!^^";
    
  }

  async postComment(comment): Promise<void>{
   if(comment == ""){
      console.log("comment require!", comment.required);
      const toast = await this.toastCtrl.create({
        message: '內容不能為空!',
        duration: 2000
      });
      toast.present();
   }else{
    console.log(comment);
    const userUid = firebase.auth().currentUser.uid;
    const userName = firebase.auth().currentUser.displayName; 
    const profilePic = firebase.auth().currentUser.photoURL;
    const dateTime = moment().format('YY/MM/DD HH:mm');
    const timeStamp = new Date();

    this.dataService.postComments(userUid, userName, profilePic, comment, dateTime, timeStamp).then(async() =>{
      const toast = await this.toastCtrl.create({
        message: '發文成功!',
        duration: 2000
      });
      toast.present();
      this.comment = "";
    },
    async error => {
      const toast = await this.toastCtrl.create({
        message: '發文失敗...',
        duration: 2000
      });
      toast.present();
    });
   }
  }

  async moreOpts(timeStamp){
    const actionSheet = await this.actionSheetCtrl.create({
      buttons: [{
        text: '編輯',
        icon: 'md-create',
        handler: () => {
          console.log('Share clicked');
        }
      }, {
        text: '刪除',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          firebase.firestore().doc(`/forum/${timeStamp}`).delete()
          console.log('Delete clicked',timeStamp);
        }
      }]
    });
    await actionSheet.present();
  }

}
