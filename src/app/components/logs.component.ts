import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-logs',
  templateUrl: '../templates/logs.html'
})
export class LogsComponent {
  public logs: any;
  public filter: string;
  public selectedLog: Object;

  constructor(private http: HttpClient) {
    const location = window.location.origin.replace('4000', '8085'); 

    this.http.get(`${ location }/enoch-logs`).subscribe(
      logs => this.logs = logs,
      err => console.log(err)
    );
  }

  public showBody(log) { this.selectedLog = log; }

  public filterList(value) { this.filter = (value === '') ? null : value; }
}
