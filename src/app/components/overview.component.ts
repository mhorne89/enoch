import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as $ from 'jquery';

@Component({
  selector: 'app-overview',
  templateUrl: '../templates/overview.html',
  styleUrls: ['../../assets/sass/components/overview.scss']
})
export class OverviewComponent {
  public logs: Object;
  public filter: string;
  public date_from: string;
  public date_to: string;

  constructor(private http: HttpClient) {
    const location = window.location.origin.replace('4000', '8085'); 
    
    this.http.get(`${ location }/enoch-logs`).subscribe(
      logs => this.logs = logs,
      err => console.log(err)
    );
  }
  
  public showBody(event) { $(event.target).toggleClass('open'); }
  
  public filterList(value) { this.filter = (value === '') ? null : value; }
}
