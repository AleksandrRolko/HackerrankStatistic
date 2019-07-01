import {Component, OnInit} from '@angular/core';
import {Chart} from 'chart.js';
import {ResultService} from '../result/result.service';


@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  public isVisible: boolean;

  constructor(private resultService: ResultService) {
  }

  ngOnInit(): void {
    this.isVisible = true;

    this.resultService.getResult()
      .toPromise()
      .then(data => {

        let map = new Map();

        data.models.forEach(function(model) {
          if (map.get(model.kind) == undefined) {
            map.set(model.kind, Number(model.score));
          } else {
            map.set(model.kind, map.get(model.kind) + Number(model.score));
          }
        });

        let canvas = <HTMLCanvasElement> document.getElementById('barChart');
        let ctx = canvas.getContext('2d');
        let barChart = new Chart(ctx, {
          type: 'bar',
          data: {
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
          }
        });
      });
  }

  public toggle(): void { this.isVisible = !this.isVisible; }
}
