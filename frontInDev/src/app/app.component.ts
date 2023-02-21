import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { config, Observable } from 'rxjs';

import { ApiConfigService } from "./services/api-config.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontInDev';
  constructor(private http: HttpClient, private apiConfigService: ApiConfigService) {

  }
  ngOnInit() {

  }

}
