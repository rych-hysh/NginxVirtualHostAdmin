import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private auth: AuthService, private router: Router){}
  doLogout(){
    this.auth.logout();
    this.router.navigate(['login']);
  }
}
