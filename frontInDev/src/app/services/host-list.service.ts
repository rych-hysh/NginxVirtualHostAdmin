import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { catchError, Observable, of, Subject, throwError } from 'rxjs';
import { ApiConfigService } from "./api-config.service";

@Injectable({
  providedIn: 'root'
})
export class HostListService {

  constructor(private http: HttpClient, private apiConfigService: ApiConfigService) { }

  getApiURL(path: string = ""): string{
    return this.apiConfigService.getApiUrl() + path;
  };

  isConnected(): Observable<boolean>{
    console.log("[api connection test] start");
    const subject: Subject<boolean> = new Subject();
    this.connectionTest().subscribe({
      next: val => {
        if(val == "success"){
          console.log('[api connection test] success')
          subject.next(true);
        }else{
          console.log('[api connection test] failed')
          subject.next(false);
        }
      
    },
      error: err => {
        console.log(err);
        subject.next(false);
      },
      complete: () => {
        return subject;
      }
    })
    return subject;
  }

  connectionTest(): Observable<String> {
    return this.http.get<String>(this.apiConfigService.getApiUrl() + "connection").pipe(
      catchError(this.handleError)
    );

  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
