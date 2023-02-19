import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontInDev';
  constructor(private http: HttpClient) {

  }
  ngOnInit() {
    console.log("[api connection test] start");
    this.getTest().subscribe(val => {
      console.log('[api connection test] success')
    },
      error => console.log(error))
  }

  getTest(): Observable<String> {
    return this.http.get<String>("http://localhost:3030/connection");

  }

}
