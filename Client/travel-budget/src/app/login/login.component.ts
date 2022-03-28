import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  createFormGroup() {
    return new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }


  loading = false;
  success = false;
  failure = false;
  feedback: String = "";

  logForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.logForm = this.createFormGroup();
  
  }

  ngOnInit(): void {
  }

  // Getters for the form values to display custom error messages
  
  get email() {
    return this.logForm.get('email');
  }

  get password() {
    return this.logForm.get('password');
  }

  login():void {
  console.log(this.logForm.value); 
  }


}
