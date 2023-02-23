import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable, of } from 'rxjs';
import { HostListService } from './host-list.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  isLoggedIn = false;
  constructor(private http: HttpClient, private hostListService: HostListService) { 
    //this.login("asdf").then(v => console.log(v))
  }

  login(password: string){
    return lastValueFrom(
    this.http.post(this.hostListService.getApiURL("auth"), {"pass": password}, httpOptions)).then(v => {
      if(v == true){
        this.isLoggedIn = true;
      }else{
        this.isLoggedIn = false;
      }
    })


    // .subscribe({
    //   next: res =>{
    //   if(res == true){
    //     this.isLoggedIn = true;
    //   }else{
    //     this.isLoggedIn = false;
    //   }
    //   },
    //   complete:() => {

    //   }
    // })
  }

  logout(){
    this.isLoggedIn = false;
  }
}
