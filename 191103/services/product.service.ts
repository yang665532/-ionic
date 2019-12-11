import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firestore: AngularFirestore) { }

  readProduct() {
    return this.firestore.collection('Product').snapshotChanges();
  }

  readAcup() {
    return this.firestore.collection('Acup').snapshotChanges();
  }
}
