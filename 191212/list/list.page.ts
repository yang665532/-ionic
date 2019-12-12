import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  Arm = true;    
  Body = false;   
  Head = false;   
  Leg = false;    
  listPic = "../../assets/list/armRightFront.jpg";
  
  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

  segmentChanged(ev: any) {
    console.log('Segment changed', ev.detail['value']);
    let value = ev.detail['value'];

    if(value == 'body'){
      this.Body = true;   this.Head = false;
      this.Arm = false;   this.Leg = false;
      this.listPic = "../../assets/list/bodyFront.jpg"
    }else if(value == 'arm'){
      this.Body = false;   this.Head = false;
      this.Arm = true;   this.Leg = false;
      this.listPic = "../../assets/list/armRightFront.jpg"
    }else if(value == 'head'){
      this.Body = false;   this.Head = true;
      this.Arm = false;   this.Leg = false;
      this.listPic = "../../assets/list/face.jpg"
    }else{
      this.Body = false;   this.Head = false;
      this.Arm = false;   this.Leg = true;
      this.listPic = "../../assets/list/legRightFront.jpg"
    }
  }

  armPart(ev){
    let value = ev.detail['value'];

    if(value == 'front'){
      this.listPic = "../../assets/list/armRightFront.jpg"
    }else if(value == 'back'){
      this.listPic = "../../assets/list/armRightBack.jpg"
    }else{
      this.listPic = "../../assets/list/armRightOut.jpg"
    }
  }

  bodyPart(ev){
    let value = ev.detail['value'];

    if(value == 'front'){
      this.listPic = "../../assets/list/bodyFront.jpg"
    }else if(value == 'back'){
      this.listPic = "../../assets/list/bodyBack.jpg"
    }else{
      this.listPic = "../../assets/list/bodyRight.jpg"
    }
  }

  headPart(ev){
    let value = ev.detail['value'];

    if(value == 'front'){
      this.listPic = "../../assets/list/face.jpg"
    }else if(value == 'back'){
      this.listPic = "../../assets/list/headBack.jpg"
    }else{
      this.listPic = "../../assets/list/headRight.jpg"
    }
  }

  legPart(ev){
    let value = ev.detail['value'];

    if(value == 'front'){
      this.listPic = "../../assets/list/legRightFront.jpg"
    }else if(value == 'back'){
      this.listPic = "../../assets/list/legRightBack.jpg"
    }else if(value == 'in'){
      this.listPic = "../../assets/list/legRightIn.jpg"
    }else{
      this.listPic = "../../assets/list/legRightOut.jpg"
    }
  }
}
