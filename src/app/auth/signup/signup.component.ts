import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
<<<<<<< HEAD
=======
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
>>>>>>> develop
=======
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
>>>>>>> develop

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

<<<<<<< HEAD
<<<<<<< HEAD
  constructor() { }

  ngOnInit(): void {
  }

=======
=======
>>>>>>> develop
  // user are going to provide information to create an account, so we use reactive forms
  signupForm: FormGroup;
  //this is to display an error message returned by auth service
  errorMessage: string;

  constructor(
    // we need to call formbuilder to create our form
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    //this is for initialize form
    this.initForm();
  }

  initForm() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      // here we oblige the user to entre at minimum six alphanumerical characters
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  /* 
    this method is executed when user submit the form
    we manage the submission of the form, sending the values entered by the user to the method createNewUser()
    if the creation works, we redirect the user to / books;
    if it doesn't work, we see the error message returned by Firebase.
  */

  onSubmit() {
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    
    this.authService.createNewUser(email, password).then(
      () => {
        this.router.navigate(['/books']);
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
  
<<<<<<< HEAD
>>>>>>> develop
=======
>>>>>>> develop
}
