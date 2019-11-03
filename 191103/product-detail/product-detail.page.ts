import { Component, OnInit, ViewChild, SecurityContext } from '@angular/core';
import { NavParams, ModalController, IonSlides } from '@ionic/angular';
import { MarketPageModule } from '../market/market.module';
import { CommonModule } from '@angular/common';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { VideoPlayer } from '@ionic-native/video-player/ngx';
import { Content } from '@angular/compiler/src/render3/r3_ast';
//import { ProductDetailComponent } from 'product-detail';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
})

export class ProductDetailPage implements OnInit {
  @ViewChild('slides') slides: IonSlides;
  Name: string;
  Photo: string;
  Detail: string;
  Video: SafeResourceUrl;
  untrusted;
  item:Array<object> = [];
  a;
  demovideo = <HTMLVideoElement>document.getElementById('demo');
  
  constructor(public navParams: NavParams, public modalCtrl: ModalController,
              private Sanitizer: DomSanitizer) {
    
   }

  ngOnInit() {
    setInterval(() => {
      this.item=[
        this.Name = this.navParams.get('Name'),
        this.Photo = this.navParams.get('Photo'),
        this.Detail = this.navParams.get('Detail'),
        this.untrusted = this.navParams.get('Video')
      ];
    }, 1000);
    this.Video = this.Sanitizer.bypassSecurityTrustResourceUrl(
                    this.untrusted);
                    //this.a = "https://www.youtube.com/embed/AyS3uw7HZOM";
                    //this.Video = this.Sanitizer.bypassSecurityTrustResourceUrl(this.a);
      
      console.log(this.Video);
  }

  closeModal(){
    this.modalCtrl.dismiss();
  }

  btnPrev(){
    this.slides.slidePrev();
    
  }
  btnNext(){
    this.slides.slideNext();
  }

  ionViewDidEnter(){
  }

}
