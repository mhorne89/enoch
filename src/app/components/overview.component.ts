import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { groupBy } from 'lodash';


@Component({
  selector: 'app-overview',
  templateUrl: '../templates/overview.html'
})
export class OverviewComponent {
  public logs: Object;
  public status: Object;
  public errors = 0;

  constructor(private http: HttpClient) {
    const location = window.location.origin.replace('4000', '8085'); 
    
    this.http.get(`${ location }/enoch-logs`).subscribe(
      logs => {
        this.logs = logs;
        this.groupByStatusCodes();
      },
      err => console.log(err)
    );
  }
  
  private groupByStatusCodes() {
    this.status = groupBy(this.logs, 'response_status');
        
    for (const key in this.status) {
      if (key.charAt(0) === '4' || key.charAt(0) === '5') this.errors += this.status[key].length;
    }
  }
}
