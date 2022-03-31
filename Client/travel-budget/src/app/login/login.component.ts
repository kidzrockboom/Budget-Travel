import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

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
 
  feedback: any = {};
  message: string = "";

  logForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    private toastr: ToastrService) {
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
    this.authService.login(this.logForm.value)
    .subscribe((msg) => {
      this.feedback = msg;
      this.message = this.feedback.message;
      if (this.message === "Logged In Successfully") {
        this.toastr.success(this.message)
      } else {
        this.toastr.error(this.message)
      }
    })
  }


}
