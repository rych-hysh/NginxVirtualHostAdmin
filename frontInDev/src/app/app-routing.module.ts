import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SitesComponent } from "./components/sites/sites.component";
import { ExternalComponent } from "./components/external/external.component";

const routes: Routes = [
  {path: '', pathMatch: 'full', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'sites', component: SitesComponent},
  {path: 'external', component: ExternalComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
