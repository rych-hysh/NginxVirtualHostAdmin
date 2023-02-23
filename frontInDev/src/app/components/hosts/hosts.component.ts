import { Component } from '@angular/core';
import { Host } from "../../models/host";
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { HostListService } from "../../services/host-list.service";

var hostsAvailable: Host[] = [
  { id: 1, host: "mock1.example.com", state: false, usage: "hoge", remarks: "This is mock." },
  { id: 2, host: "mock.example.com", state: false, usage: "foo", remarks: "Please contact to admin." },
]

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}
@Component({
  selector: 'app-hosts',
  templateUrl: './hosts.component.html',
  styleUrls: ['./hosts.component.scss']
})
export class HostsComponent {
  displayedColumns = ["id", "host", "state", "usage", "remarks"]
  AvailableHostsList: Host[] = hostsAvailable;
  AvailableHostsListBackup: Host[] = [];

  constructor(private dialog: MatDialog, private router: Router, private http: HttpClient, private _snackbar: MatSnackBar, private hostListService: HostListService) { }

  async ngOnInit() {


    this.hostListService.isConnected().subscribe({
      next: (ok) => {
        // Todo: 関数化
        if (ok) {
          this._snackbar.open("logged in", "ok");
          this._snackbar.open("api connection established", "ok");
          this.http.get<Host[]>(this.hostListService.getApiURL("sites")).subscribe(list => {
            this.AvailableHostsList = list;
            this.AvailableHostsListBackup = JSON.parse(JSON.stringify(list));
          });
        } else {
          this._snackbar.open("api connection failed", "ok");
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        console.error(err);
      }
    })
  }

  dataReset() {
    this.AvailableHostsList = this.AvailableHostsListBackup;
  }

  openSaveDialog() {
    const dialogRef = this.dialog.open(SaveDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        //登録処理
        this.http.post<Host>(this.hostListService.getApiURL("sites/update"), JSON.stringify(this.AvailableHostsList), httpOptions).subscribe();
        this.router.navigate(['/']);
      }
    });
  }

  openCancelDialog() {
    const dialogRef = this.dialog.open(CancelDialog);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.router.navigate(['/']);
      }
    });
  }

}

@Component({
  selector: 'save-dialog',
  templateUrl: '../../resources/saveDialog.html',
})
//'/frontInDev/src/app/resources/saveDialog.html'
export class SaveDialog { }

@Component({
  selector: 'cancel-dialog',
  templateUrl: '../../resources/cancelDialog.html'
})
export class CancelDialog { }