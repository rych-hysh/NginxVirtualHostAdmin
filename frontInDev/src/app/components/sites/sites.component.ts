import { Component } from '@angular/core';
import { Site } from "../../models/site";
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

var sitesAvailable: Site[] = [
  {id:1, host:"mock1.example.com", state:false, usage:"hoge", remarks:"This is mock."},
  {id:2, host:"mock.example.com", state:false, usage:"foo", remarks:"Please contact to admin."}, 
]

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.scss']
})
export class SitesComponent {
  displayedColumns = ["id", "host", "state", "usage", "remarks"]
  AvailableSitesList = sitesAvailable;
  AvailableSitesListBackup: Site[] = [];

  constructor(private dialog: MatDialog, private router: Router, private http: HttpClient) {}

  ngOnInit(){
    this.http.get<Site[]>("http://localhost:3030/sites").subscribe(list => {
      this.AvailableSitesList = list;
      this.AvailableSitesListBackup = JSON.parse(JSON.stringify(list));
    });
  }

  dataReset(){
    this.AvailableSitesList = this.AvailableSitesListBackup;
  }

  openSaveDialog(){
    const dialogRef = this.dialog.open(SaveDialog);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        //登録処理
        this.http.post<Site>("http://localhost:3030/sites/update", JSON.stringify(this.AvailableSitesList), httpOptions).subscribe();
        this.router.navigate(['/home']);
      }
    });
  }

  openCancelDialog(){
    const dialogRef = this.dialog.open(CancelDialog);
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.router.navigate(['/home']);
      }
    });
  }

}

@Component({
  selector: 'save-dialog',
  templateUrl: '../../resources/saveDialog.html',
})
//'/frontInDev/src/app/resources/saveDialog.html'
export class SaveDialog {}

@Component({
  selector: 'cancel-dialog',
  templateUrl: '../../resources/cancelDialog.html'
})
export class CancelDialog {}