import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Complete-Application-with-Angular-and-Firebase';
  constructor(){
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyDeEE2SKErXZR2MHTm7OxNnrFLGVAKONrE",
      authDomain: "book-application-d121e.firebaseapp.com",
      databaseURL: "https://book-application-d121e.firebaseio.com",
      projectId: "book-application-d121e",
      storageBucket: "book-application-d121e.appspot.com",
      messagingSenderId: "72956975120",
      appId: "1:72956975120:web:9b06b082272b3a35195295",
      measurementId: "G-NB0JHSZFGX"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
