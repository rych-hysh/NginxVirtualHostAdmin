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
    console.log("[api connection test] start");
    this.getTest().subscribe(val => {
      console.log('[api connection test] success')
    },
      error => console.log(error))
  }

  getTest(): Observable<String> {
    return this.http.get<String>(this.apiConfigService.getApiUrl() + "connection");

  }

}
