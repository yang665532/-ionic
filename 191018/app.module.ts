import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { GooglePlus} from '@ionic-native/google-plus/ngx';
// import { Facebook, FacebookOriginal } from '@ionic-native/facebook';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { AuthService } from './services/auth.service';
import { ProductService } from './services/product.service';
import { DataService } from './services/data.service';
import { ProductDetailPageModule } from './product-detail/product-detail.module';
import { AcupDetailPageModule } from './acup-detail/acup-detail.module';

import * as firebase from 'firebase';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation'

 
firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule, ReactiveFormsModule,
    FormsModule, CustomFormsModule,IonicStorageModule.forRoot(),
    AngularFirestoreModule, AngularFireDatabaseModule,
    ProductDetailPageModule, AcupDetailPageModule
  ],
  providers: [
    GooglePlus,
    StatusBar,
    SplashScreen,
    Facebook,
    AuthService,
    ProductService,
    NativeStorage,
    DataService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
