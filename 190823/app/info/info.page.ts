import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-info',
  templateUrl: './info.page.html',
  styleUrls: ['./info.page.scss'],
})

export class InfoPage implements OnInit {
  
  constructor(public navCtrl: NavController) { }

  goHome(): void{
    this.navCtrl.navigateRoot('/tabs');
  }

  ngOnInit() {
  }

}
