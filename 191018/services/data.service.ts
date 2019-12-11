import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private storage: Storage) {
    storage.ready().then(() => {
      console.log('Hello DataService Provider');
    });
   }

  setValue(email: string, value_email: any, password: string, value_pwd: any) {
    this.storage.set(email, value_email);
    this.storage.set(password, value_pwd);
    return true;      
  }

  getValue(email: string): Promise<any> {
    return this.storage.get(email);
  }
}
