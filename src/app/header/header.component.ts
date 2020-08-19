import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  isAuth: boolean;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    /* 
      onAuthStateChanged (), which allows you to observe the user's authentication state: at each state change, 
      the function you pass as an argument is executed. If the user is properly authenticated, 
      onAuthStateChanged () receives the firebase.User type object corresponding to the user. 
      You can thus base the value of the local variable isAuth according to the user's authentication state, 
      and display the links corresponding to this state.
    */
    firebase.auth().onAuthStateChanged(
      (user) => {
        if(user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }
    );
  }

  onSignOut() {
    this.authService.signOutUser();
  }

}
