import { Component, OnInit, NgModule } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { MarketPageModule } from '../market/market.module';
import { CommonModule } from '@angular/common';
//import { ProductDetailComponent } from 'product-detail';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})

export class ProductDetailPage implements OnInit {
  Name: string;
  Photo: string;
  Detail: string;
  item:Array<object> = [];
  
  constructor(public navParams: NavParams, public modalCtrl: ModalController) {
    
   }

  ngOnInit() {
    this.item=[
      this.Name = this.navParams.get('Name'),
      this.Photo = this.navParams.get('Photo'),
      this.Detail = this.navParams.get('Detail')
    ];
    
    console.log(this.item);
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

}
