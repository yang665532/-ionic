import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AngularFirestore } from 'angularfire2/firestore';
import { DataService } from 'src/app/services/data.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.page.html',
  styleUrls: ['./course-detail.page.scss'],
})
export class CourseDetailPage implements OnInit {
  title;
  video:SafeResourceUrl = "";
  unsafe;
  id;
  acups: Array<object> = [];
  acups_id;
  courseTitle;
  block = false;
  game = "來場小測驗吧!";
  related;

  constructor(public modalCtrl: ModalController,
              public navParams: NavParams,
              private domSanitizer: DomSanitizer,
              private firestore: AngularFirestore,
              private dataService: DataService,
              private nativeStorage: NativeStorage) { 
  }

  ngOnInit() {
      this.title = this.navParams.get('title');
      this.unsafe = this.navParams.get('video');
      this.id = this.navParams.get('id');
      console.log(this.id.substring(0, 7));

      if(this.id.substring(0, 7) !== 'youtube'){
        this.related = true;
        this.dataService.getPartDesc(this.id).subscribe(data => {
          this.acups = data.map(e => {
            return {
              acup_pic: e.payload.doc.data()['acup_pic'],
              desc: e.payload.doc.data()['detail']
            }
          });console.log(this.acups);
        });
      }
      let title = this.title.substring(0, 2);
      if(title !== '肩部'){
        this.game = '測驗尚未開放';
        this.block = true;
    }
  }

  ionViewWillEnter(){
      this.video = this.domSanitizer.bypassSecurityTrustResourceUrl(this.unsafe);
      
    }

  close(){
    this.modalCtrl.dismiss();
  }

  close_passId(courseTitle){
    this.nativeStorage.setItem('courseTitle', courseTitle).then((data) => {
      this.modalCtrl.dismiss();
      console.log('Stored first item!',data),
      error => console.error('Error storing item', error)
    });
  }
}
