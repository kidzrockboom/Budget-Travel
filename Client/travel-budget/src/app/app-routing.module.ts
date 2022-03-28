import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { TripsComponent } from './trips/trips.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: "", component: MainComponent,
  children: [
     {path: 'edit', component: EditComponent},
     {path: 'trips', component: TripsComponent},
     {path: 'home', component: HomepageComponent},
     {path: 'login', component: LoginComponent},
     {path: 'signup', component: RegisterComponent},
  ]
},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
