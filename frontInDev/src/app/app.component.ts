import { Component } from '@angular/core';

import { AuthService } from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontInDev';
  constructor(private auth: AuthService) {

  }
  ngOnInit() {
  }

}
