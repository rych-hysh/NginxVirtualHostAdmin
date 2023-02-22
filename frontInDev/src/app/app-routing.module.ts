import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from "./components/login/login.component";
import { HostsComponent } from "./components/hosts/hosts.component";
import { of } from 'rxjs';

const routes: Routes = [
  {path: '', pathMatch: 'full', component: LoginComponent},
  {path: 'hosts', component: HostsComponent, canActivate:[]},
  {path:"**", redirectTo:""}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
