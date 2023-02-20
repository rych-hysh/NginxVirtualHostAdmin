import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {

  private apiUrl: String = "http://localhost:3030/";


  constructor() { }
  
  getApiUrl(): String{
    return this.apiUrl;
  }
}
