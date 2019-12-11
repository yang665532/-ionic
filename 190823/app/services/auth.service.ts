import { Injectable } from "@angular/core";
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // registerUser(value){
  //   return new Promise<any>((resolve, reject) => {
  //     firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
  //     .then(
  //       res => resolve(res),
  //       err => reject(err))
  //   })
  //  }

  registerUser(email:string, password:string):Promise<any>{
    return firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((newUserCredential: firebase.auth.UserCredential) => {
      firebase.firestore().doc(`/userProfile/${newUserCredential.user.uid}`)
      .set({ email });
    })
    .catch(error => {
      console.error(error);
      throw new Error(error);
    })
  }

  resetPassword(email:string): Promise<void>{
    return firebase.auth().sendPasswordResetEmail(email)
  }

  
  //  loginUser(value){
  //   return new Promise<any>((resolve, reject) => {
  //     firebase.auth().signInWithEmailAndPassword(value.email, value.password)
  //     .then(
  //       res => resolve(res),
  //       err => reject(err))
  //   })
  //  }

   loginUser(
     email:string, password:string
     ): Promise<firebase.auth.UserCredential>{
      return firebase.auth().signInWithEmailAndPassword(email, password);
   }
  
  //  logoutUser(){
  //    return new Promise((resolve, reject) => {
  //      if(firebase.auth().currentUser){
  //        firebase.auth().signOut()
  //        .then(() => {
  //          console.log("LOG Out");
  //          resolve();
  //        }).catch((error) => {
  //          reject();
  //        });
  //      }
  //    })

    logoutUser():Promise<void>{
      return firebase.auth().signOut();
    }
    userDetails(){
      return firebase.auth().currentUser;
    }

   }
  
 

