import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { groupBy, countBy, toPairs } from 'lodash';


@Component({
  selector: 'app-overview',
  templateUrl: 'overview.html'
})
export class OverviewComponent {
  public logs: Array<Object>;
  public status: Object;
  public errors = 0;

  constructor(private http: HttpClient, private router: Router) {
    const location = window.location.origin.replace('4000', '8081');
    
    const headers = {
      headers: new HttpHeaders({
        'uuid': JSON.parse(sessionStorage.getItem('revelation-session')).uuid
      })
    };

    this.http.get(`${ location }/revelation/logs`, headers).subscribe(
      (logs: Array<Object>) => {
        this.logs = logs;
        this.groupByStatusCodes();
        this.createMap();
      },
      err => {
        console.log(err);
        /*sessionStorage.removeItem('revelation-session');
        this.router.navigate(['/revelation/auth']);*/
      }
    );
  }

  private groupByStatusCodes() {
    this.status = groupBy(this.logs, 'response_status');

    for (const key in this.status) {
      if (key.charAt(0) === '4' || key.charAt(0) === '5') this.errors += this.status[key].length;
    }
  }

  private createMap() {
    const countByCounty = toPairs(countBy(this.logs, (log) => {
      if (log.location && log.location.country) return log.location.country;
      else console.log('Error getting location: ', log.location);
    }));

    const mapData = [];

    countByCounty.forEach((country) => {
      mapData.push({ code: country, value: country });
    });

    // @ts-ignore
    Highcharts.mapChart('map', <any>{
      chart: { height: 600 },
      title: { text: 'API requests by location' },
      mapNavigation: {
        enabled: true,
        buttonOptions: { verticalAlign: 'bottom' }
      },
      tooltip: {
        backgroundColor: {
          linearGradient: [0, 0, 0, 60],
          stops: [[0, '#FFFFFF'], [1, '#E0E0E0']]
        },
        borderWidth: 1,
        borderColor: '#AAA',
        borderRadius: 2
      },
      series: [{
        data: mapData,
        // @ts-ignore
        mapData: Highcharts.maps['custom/world'],
        joinBy: ['iso-a2', 'code'],
        name: 'API requests',
        states: {
          hover: {
            color: '#a4edba'
          }
        }
      }]
    });
  }
}
