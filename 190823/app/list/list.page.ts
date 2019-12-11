import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  
  constructor(public navCtrl: NavController) { }

  goHome(): void{
    this.navCtrl.navigateRoot('/tabs');
  }
  
  ngOnInit() {
  }

}
