import {Component, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
import {ResultService} from '../result/result.service';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  constructor(private resultService: ResultService) {
  }

  ngOnInit(): void {
    this.resultService.getResult()
      .toPromise()
      .then(data => {

        const map = new Map();

        data.models.forEach(model => {
          if (map.get(model.kind) === undefined) {
            map.set(model.kind, Number(model.score));
          } else {
            map.set(model.kind, map.get(model.kind) + Number(model.score));
          }
        });

        const canvas = document.getElementById('barChart') as HTMLCanvasElement;
        const ctx = canvas.getContext('2d');

        const dataSet = {
          labels: Array.from(map.keys()),
          datasets: [
            {
              data: Array.from(map.values()),
              label: 'Score',
              backgroundColor: 'rgba(27,169,76, 0.7)',
              borderColor: 'rgba(27,169,76, 1)',
              hoverBackgroundColor: 'rgba(27,169,76, 1)'
            }
          ]
        };

        const option = {
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

        const barChart = new Chart(ctx, {
          type: 'bar',
          data: dataSet,
          options: option
        });
      });
  }
}
