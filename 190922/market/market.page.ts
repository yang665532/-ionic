import { Component, OnInit } from '@angular/core';
import { ProductService } from './../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-market',
  templateUrl: './market.page.html',
  styleUrls: ['./market.page.scss'],
})
export class MarketPage implements OnInit {
  product:any;

  constructor(private ProductService: ProductService,
              private router: Router) { }

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

  goDetail(){
    this.router.navigateByUrl('product-detail');
  }

}
