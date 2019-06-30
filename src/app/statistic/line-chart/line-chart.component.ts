import {Component, OnInit} from '@angular/core';
import {ResultService} from '../result/result.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  public lineChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  public lineChartLabels = []; //['30.06.2019', '29.06.2019', '28.06.2019'];
  public lineChartType = 'line';
  public lineChartLegend = true;

  public lineChartData = [];

  // {
  //   data: [230, 100, 300],
  //   label: 'Score',
  //   backgroundColor: 'rgba(27, 169, 76, 0.3)',
  //   borderColor: 'rgba(27, 169, 76, 1)',
  //   pointBackgroundColor: 'rgba(27, 169, 76, 1)',
  //   pointBorderColor: 'rgba(27, 169, 76, 1)',
  //   pointHoverBackgroundColor: 'rgba(0, 19, 25, 0.5)',
  //   pointHoverBorderColor: 'rgba(0, 19, 25, 1)',
  //   pointHoverRadius: 7,
  //   pointRadius: 9
  // }

  constructor(private resultService: ResultService) {
  }

  ngOnInit() {
    this.resultService.getResult()
      .subscribe(data => {
        console.log(data);
        let map = new Map();
        data.models.forEach(function(model) {
          let date;

          if (/.*(hours|hour)/.test(model.time_ago)) {
            let hour = model.time_ago.replace(/(^.+)(\w\d+\w)(.+$)/i, '$2');
            date = Date.now();
            date.setHours(date.getHours() - hour);
          } else if (/.*(days|day)/.test(model.time_ago)) {
            let day = model.time_ago.replace(/(^.+)(\w\d+\w)(.+$)/i, '$2');
            date = Date.now();
            date.setDate(date.getDate() - day);
          }

          if (map.get(date) == undefined) {
            map.set(date, Number(model.score));
          } else {
            map.set(date, map.get(date) + Number(model.score));
          }
        });

        this.lineChartLabels = Array.from(map.keys());
        this.lineChartData = [{
          data: Array.from(map.values()),
          label: 'Score',
          backgroundColor: 'rgba(27, 169, 76, 0.3)',
          borderColor: 'rgba(27, 169, 76, 1)',
          pointBackgroundColor: 'rgba(27, 169, 76, 1)',
          pointBorderColor: 'rgba(27, 169, 76, 1)',
          pointHoverBackgroundColor: 'rgba(0, 19, 25, 0.5)',
          pointHoverBorderColor: 'rgba(0, 19, 25, 1)',
          pointHoverRadius: 7,
          pointRadius: 9
        }];
      });
  }
}
