import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ModalController } from '@ionic/angular';
import { OrderPage } from './order/order.page';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})

export class OrdersPage implements OnInit {
  orderDetail;
  order_Detail:Array<object> = [];
  orderInfo;

  constructor(
    private router:Router,
    private productService: ProductService,
    public modalCtrl: ModalController,
    private nativeStorage: NativeStorage) {
      this.productService.getOrderDetail().subscribe(detail => {
        this.orderDetail = this.order_Detail = detail.map(e => {
          return {
            name:e.payload.doc.data()['Name'],
            photo: e.payload.doc.data()['Photo'],
            total: e.payload.doc.data()['Total'],
            lengthOfCart: e.payload.doc.data()['lengthOfCart'],
            dateTime: e.payload.doc.data()['dateTime'],
            id: e.payload.doc.id
          };
        });console.log(this.orderDetail)
      });
     }
  ngOnInit() {
  }

  async goDetailModel(lengthOfCart, id, total){
    const modal = await this.modalCtrl.create({
      component: OrderPage,
      componentProps: {
        'lengthOfCart': lengthOfCart,
        'total': total
      }
    });
    this.nativeStorage.setItem('orderID', id)
    .then(
      (data) => console.log('Stored first item!',data),
      error => console.error('Error storing item', error)
    );
    return await modal.present();
  }
}
