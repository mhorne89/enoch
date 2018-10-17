import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-overview',
  templateUrl: '../templates/overview.html'
})
export class OverviewComponent {
  public logs: Object;

  constructor(private http: HttpClient) {
    const location = window.location.origin.replace('4000', '8085'); 
    
    this.http.get(`${ location }/enoch-logs`).subscribe(
      logs => this.logs = logs,
      err => console.log(err)
    );
  }
}
