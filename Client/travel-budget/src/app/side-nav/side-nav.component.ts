import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Request } from '../models/Request';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

  constructor(private auth: AuthService) {
   }

  userInfo: any = {};

  ngOnInit(): void {
    this.getUserProf();
  }

  // Get the users profile information
  getUserProf() {
    this.auth.getProfile().subscribe((res) => {
      
        this.userInfo = res;
        console.log(res);
        console.log(this.userInfo.data.firstname);
      
    });
  }

  // Logout the user
  logout(): void {
    this.auth.logout();
  }

}
