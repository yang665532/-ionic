import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import * as firebase from 'firebase/app'
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-mypoints',
  templateUrl: './mypoints.page.html',
  styleUrls: ['./mypoints.page.scss'],
})
export class MypointsPage implements OnInit {
  uid = firebase.auth().currentUser.uid;
  points:number = 0;    date;   reason;
  PointsHistory;

  constructor(
    private dataService: DataService,
    private router: Router,
    private platform: Platform
  ) { 
    this.platform.backButton.subscribeWithPriority(100, () => {
      console.log("back button clicked!")
      this.router.navigateByUrl('tabs/tab4');
    });
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.dataService.getPoints(this.uid).subscribe(user => {
      this.PointsHistory = user.map(e => {
        return{
          points: e.payload.doc.data()['Points'],
          reason: e.payload.doc.data()['Reason'],
          date: e.payload.doc.id
        };
      });console.log(this.PointsHistory)
      
      for(let point of this.PointsHistory){
        this.points += point.points;
        console.log(point.points, this.points)
      }
    });
  }

  goToPersonal(){
    this.router.navigateByUrl('tabs/tab4');
    this.points = 0;
  }

}
