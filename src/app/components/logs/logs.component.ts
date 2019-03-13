import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-logs',
  templateUrl: 'logs.html'
})
export class LogsComponent {
  public logs: any;
  public filter: string;
  public selectedLog: Object;

  constructor(private http: HttpClient, private router: Router) {
    const location = window.location.origin.replace('4000', '8081');

    const headers = {
      headers: new HttpHeaders({
        'uuid': JSON.parse(sessionStorage.getItem('revelation-session')).uuid
      })
    };

    this.http.get(`${ location }/revelation/logs`, headers).subscribe(
      logs => this.logs = logs,
      err => {
        sessionStorage.removeItem('revelation-session');
        this.router.navigate(['/revelation/auth']);
      }
    );
  }

  public showBody(log) { this.selectedLog = log; }

  public filterList(value) { this.filter = (value === '') ? null : value; }
}
