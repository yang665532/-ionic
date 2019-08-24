import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { GooglePlus} from '@ionic-native/google-plus/ngx';
// import { Facebook, FacebookOriginal } from '@ionic-native/facebook';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';

import * as firebase from 'firebase';
import { ReactiveFormsModule } from '@angular/forms';
 
firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireAuthModule,ReactiveFormsModule
  ],
  providers: [
    GooglePlus,
    StatusBar,
    SplashScreen,
    Facebook,
    AuthService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
