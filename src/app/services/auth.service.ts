import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  /* 
    Since the create, connect and disconnect operations are asynchronous, that is, they do not have an instant result, 
    the methods you will create to handle them will return Promises, which will also allow you to manage error situations.
  */

  // Method to creat new user
  createNewUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        //here we use firebase authentification methods
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            //if the creation of new user was successful, we resolve the promise 
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }
  // Methode to signin (to connect user)
  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }
  // Method to signup (to disconnect user)
  signOutUser() {
    firebase.auth().signOut();
  }

}
