import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { groupBy, countBy, toPairs } from 'lodash';


@Component({
  selector: 'app-overview',
  templateUrl: '../templates/overview.html'
})
export class OverviewComponent {
  public logs: Array<Object>;
  public status: Object;
  public errors = 0;

  constructor(private http: HttpClient) {
    const location = window.location.origin.replace('4000', '8085'); 

    this.http.get(`${ location }/enoch-logs`).subscribe(
      (logs: Array<Object>) => {
        this.logs = logs;
        this.groupByStatusCodes();
        this.createMap();
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

  private createMap() {
    const countByCounty = toPairs(countBy(this.logs, (log) => {
      if (log['location'] && log['location']['country']) return log['location']['country'];
    }));

    const mapData = [];

    countByCounty.forEach((country) => {
      mapData.push({ code: country[0], value: country[1] });
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
