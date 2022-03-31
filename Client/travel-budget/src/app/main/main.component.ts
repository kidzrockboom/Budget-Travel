import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private auth: AuthService) { }



  loggedIn: boolean = false;

  

  ngOnInit(): void {
    this.auth.isLoggedIn$.subscribe(data => {
      if(data ===  true){
        this.loggedIn = true;
      } 

    })
  }

}
