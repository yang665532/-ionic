import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: '穴位圖總覽',
      url:'/list',
      icon:'book'
    },
    {
      title: '關於經絡',
      url:'/info',
      icon:'information-circle'
    },
	{
      title: 'FAQ專區',
      url:'/faq',
      icon:'help-circle'
    },
	{
      title: '幫助',
      url:'/help',
      icon:'hand'
    },
	{
      title: '設置',
      url:'/setting',
      icon:'settings'
    }
  ];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
