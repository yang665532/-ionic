import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
   //--------------
    // 宣告成員
    //--------------
    // items:Array<Object>=[];	
	
    //--------------
    // 建構元函式
    //--------------
    // constructor(public navCtrl: NavController) {
    //     this.items.push({'picName':'', 'title':'經絡課程1', 'fullText':'幾年來，幾乎所和企業的人有所接觸後，我都沒有。 '});
    //     this.items.push({'picName':'', 'title':'經絡課程2', 'fullText':'我現在不問工程師有沒人可以告訴我公司比較重要。'});
    //     this.items.push({'picName':'', 'title':'經絡課程3', 'fullText':'現飄，白的好漂亮，我的週休二日就為我回來做自己。'});	  			
    // }	
	
    //------------------------------------------------
    // 宣告函式(依序傳入圖片名稱, 大標, 詳細內容)
    //------------------------------------------------
    // redirect(picName, title, fullText) {	    
    //     this.navCtrl.push('course', {picName:picName, title:title, fullText:fullText});
    // }; 
}
