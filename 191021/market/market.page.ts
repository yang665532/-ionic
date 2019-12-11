import { Component, OnInit } from '@angular/core';
import { ProductService } from './../services/product.service';
import { Router } from '@angular/router';
import { ModalController, NavController, NavParams } from '@ionic/angular';
import { ProductDetailPage } from '../product-detail/product-detail.page';

@Component({
  selector: 'app-market',
  templateUrl: './market.page.html',
  styleUrls: ['./market.page.scss'],
})
export class MarketPage implements OnInit {
  product:any;
  
  constructor(private ProductService: ProductService,
              private router: Router,
              public modalCtrl: ModalController,
              public navCtrl: NavController) { 
                
              }

  ngOnInit() {
    this.ProductService.readProduct().subscribe(data => {
 
      this.product = data.map(e => {
        return {
          Name: e.payload.doc.data()['Name'],
          Photo: e.payload.doc.data()['Photo'],
          Detail: e.payload.doc.data()['Detail'],
        };
      })
      console.log(this.product); 
    });
  }

  async presentModal(Name, Photo, Detail) {
    const modal = await this.modalCtrl.create({
      component: ProductDetailPage,
      componentProps: {
        'Name': Name,
        'Photo': Photo,
        'Detail': Detail
      }
    });
    return await modal.present();
  }

}
