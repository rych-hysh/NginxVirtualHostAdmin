import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  inputpass: string = "";

  constructor(private auth: AuthService, private router: Router) {

  }

  doLogin() {
    this.auth.login(this.inputpass).then(() => {
      this.router.navigate(["/hosts"]);
    })
  }
}
