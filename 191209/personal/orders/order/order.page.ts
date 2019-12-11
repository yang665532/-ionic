import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
})
export class OrderPage implements OnInit {
  lengthOfCart;
  orderID;
  orderDetail;
  showTitle:Array<string> = ["購買人：", "訂單成立時間：", "地址：", "付款方式：",
                            "寄送方式：", "訂單總計(含運$60)："];
  public uid = firebase.auth().currentUser.uid; 
  realName;       dateTime;
  address;        payment;
  shipment;       total;
  name;   price;  qty;
  pic; 

  constructor(
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private firestore: AngularFirestore,
    private nativeStorage: NativeStorage,
    private productService: ProductService
    ) {
      setInterval(() => {
        this.lengthOfCart = this.navParams.get('lengthOfCart');
        this.orderID = this.navParams.get('id');
      });
      
      this.nativeStorage.getItem('orderID').then((data) => {
        //get info
        this.productService.orderInfoSnapshot(data).subscribe(info => {
            this.realName = info.payload.data()['RealName'];
            this.dateTime = info.payload.data()['DateTime'];
            this.address =  info.payload.data()['Address'];
            this.payment =  info.payload.data()['Payment'];
            this.shipment =  info.payload.data()['Shipment'];
          });
          //get product detail
        this.productService.orderDetailSnapshot(data).subscribe(detail => {
          this.orderDetail = detail.map(e => {
            return {
              name: e.payload.doc.data()['Name'],
              pic: e.payload.doc.data()['Photo'],
              price: e.payload.doc.data()['Price'],
              qty: e.payload.doc.data()['Quantity'],
            };
          });
        });
      });
     }

  ngOnInit() {
  }

  close(){
    this.modalCtrl.dismiss();
  }

}
