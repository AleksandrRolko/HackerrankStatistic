import {Component, OnInit} from '@angular/core';
import {ResultService} from '../result/result.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-diagram',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  public barChartOptions = {
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

  public barChartLabels = [];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData = [];

  constructor(private resultService: ResultService) {
  }

  ngOnInit(): void {
    this.resultService.getResult()
      .subscribe(data => {
        let map = new Map();

        data.models.forEach(function(model) {
          if (map.get(model.kind) == undefined) {
            map.set(model.kind, Number(model.score));
          } else {
            map.set(model.kind, map.get(model.kind) + Number(model.score));
          }
        });

        this.barChartLabels = Array.from(map.keys());
        this.barChartData = [{
          data: Array.from(map.values()),
          label: 'Score',
          backgroundColor: 'rgba(27,169,76, 0.7)',
          borderColor: 'rgba(27,169,76, 1)',
          hoverBackgroundColor: 'rgba(27,169,76, 1)'
        }];
      });
  }
}
