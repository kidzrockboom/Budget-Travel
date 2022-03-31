import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MainComponent } from './main/main.component';
import { RegisterComponent } from './register/register.component';
import { TripsComponent } from './trips/trips.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {path: "", 
  component: MainComponent,
  children: [
     {path: 'edit', component: EditComponent, canActivate: [AuthGuard]},
     {path: 'trips', component: TripsComponent, canActivate: [AuthGuard]},
     {path: 'home', component: HomepageComponent, canActivate: [AuthGuard]},
     {path: 'login', component: LoginComponent},
     {path: 'signup', component: RegisterComponent},
  ]
}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
