import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

// Interface for the currency code array
interface Currency {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  regForm: FormGroup;
  
  // Array definition for currency ISO codes 
  currencyCodes: Currency[] = [
    {value: 'USD', viewValue: 'U.S Dollar'},
    {value: 'EUR', viewValue: 'Euro'},
    {value: 'GBP', viewValue: 'Great Britain Pound(Sterling)'},
    {value: 'JPY', viewValue: 'Japanese yen'},
    {value: 'CHF', viewValue: 'Swiss Franc'},
    {value: 'AUD', viewValue: 'Australian Dollar'},
    {value: 'CAD', viewValue: 'Canadian Dollar'},
    {value: 'INR', viewValue: 'Indian Rupee'},
    {value: 'BZR', viewValue: 'Brazilian Real'},
    {value: 'SEK', viewValue: 'Swedish Krona'},
    {value: 'ZAR', viewValue: 'South African Rand'},
    {value: 'HKD', viewValue: 'Hong Kong Dollar'},
    {value: 'NGN', viewValue: 'Nigerian Naira'}
  ];


  feedback: any = {message: ""};
  message = this.feedback.message;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    private toastr: ToastrService) {
    this.regForm = this.createFormGroup();

   }

  ngOnInit(): void {
    
  }

  // Creating the pattern for the form and the required validations
  createFormGroup(): FormGroup {
    return new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, 
        Validators.pattern("(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}")]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      currency: new FormControl("", [Validators.required])
    });
  }
  
  get email() {
    return this.regForm.get('email');
  }

  get password() {
    return this.regForm.get('password');
  }

  get currency() {
    return this.regForm.get('currency');
  }

  signup ():void {
    this.authService.signup(this.regForm.value)
    .subscribe((msg) => {
      this.feedback = msg;
      this.message = this.feedback.message;
      if (this.message === "Registration successful") {
        this.toastr.success(this.message);
      } else {
        this.toastr.error(this.message);
      }
      
    })
  }

}
