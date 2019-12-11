import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  items:Array<Object>=[];	

  constructor(public navCtrl: NavController) {
        this.items.push({'icon':'heart', 'title':'我的收藏'});
        this.items.push({'icon':'walk', 'title':'我的筆記'});	
        this.items.push({'icon':'star', 'title':'我的留言'}); 
        this.items.push({'icon':'star', 'title':'我的點數'});  			
    }	

  ngOnInit() {
  }

}
