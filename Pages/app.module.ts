import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { GooglePlus} from '@ionic-native/google-plus/ngx';
// import { Facebook, FacebookOriginal } from '@ionic-native/facebook';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPage } from './login/login.page';

const firebaseConfig ={
  
}

@NgModule({
  declarations: [AppComponent, LoginPage],
  entryComponents: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig), // <-- firebase here
    AngularFireAuthModule
  ],
  providers: [
    GooglePlus,
    StatusBar,
    SplashScreen,
    Facebook,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
