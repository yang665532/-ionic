import { Component } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';
import { CourseDetailPage } from './course-detail/course-detail.page';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  category;
  part:Array<object> = [];
  type:Array<object> = [];
  seg_Value = 'part';

    constructor(public navCtrl: NavController,
                public dataService: DataService,
                public router: Router,
                public modalCtrl: ModalController) {	
      this.category = "part";

      this.dataService.getCoursePart().subscribe(data => {
        this.part = data.map(e => {
          return {
            title: e.payload.doc.data()['Title'],
            thumbPic: e.payload.doc.data()['Thumbnail'],
            video:e.payload.doc.data()['Video'],
            id:  e.payload.doc.id
          };
        });
      });

      this.dataService.getCourseType().subscribe(data => {
        this.type = data.map(e => {
          return {
            title: e.payload.doc.data()['Title'],
            thumbPic: e.payload.doc.data()['Thumbnail'],
            video:e.payload.doc.data()['Video'],
            id:  e.payload.doc.id
          };
        });
      });
    }	

    segChange(){
      this.category = "type";
    }

    segValue(ev){
      let value = ev.detail['value'];
      this.seg_Value = value;
      console.log(this.seg_Value)
    }

    async goDetail(title, video, id){
      const modal = await this.modalCtrl.create({
        component: CourseDetailPage,
        componentProps: {
          'title': title,
          'video': video,
          'id': id,
          'segValue': this.seg_Value
        }
      });
      return await modal.present();
    }
}
