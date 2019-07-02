import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Data} from '../result/data';
import {Chart} from 'chart.js';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.createChartByDays();
    this.createChartByDaysAndCategories();
  }

  private createChartByDaysAndCategories() {
    this.http.get<Data>('./assets/result.json')
      .toPromise()
      .then(data => {
        const days = new Set();
        const map = new Map();

        data.models.forEach(model => {
          let date = new Date();

          if (/.*(hours|hour)/.test(model.time_ago)) {
            const hour = model.time_ago.match(/\d+/g).map(Number)[0];
            date = new Date(Date.now());
            date.setHours(date.getHours() - Number(hour));
          } else if (/.*(days|day)/.test(model.time_ago)) {
            const day = model.time_ago.match(/\d+/g).map(Number)[0];
            date = new Date(Date.now());
            date.setDate(date.getDate() - Number(day));
          }

          const strDate = date.toLocaleDateString('en-US');

          days.add(strDate);

          if (map.get(model.kind) === undefined) {
            const dayScoreMap = new Map();
            dayScoreMap.set(strDate, Number(model.score));
            map.set(model.kind, dayScoreMap);
          } else {
            const dayScoreMap = map.get(model.kind);
            if (dayScoreMap.get(strDate) === undefined) {
              dayScoreMap.set(strDate, Number(model.score));
            } else {
              dayScoreMap.set(strDate, dayScoreMap.get(strDate) + Number(model.score));
            }
            map.set(model.kind, dayScoreMap);
          }
        });

        console.log(map);

        const canvasElement = document.getElementById('lineChartByDaysAndCategories') as HTMLCanvasElement;
        const ctx = canvasElement.getContext('2d');

        const dataSets = [];

        map.forEach((value, key) => {
          const dataLine = {
            data: Array.from(map.get(key).values()),
            label: key,
            backgroundColor: this.randomColor(),
            // backgroundColor: 'rgba(27, 169, 76, 0.3)',
            // borderColor: 'rgba(27, 169, 76, 1)',
            // pointBackgroundColor: 'rgba(27, 169, 76, 1)',
            // pointBorderColor: 'rgba(27, 169, 76, 1)',
            // pointHoverBackgroundColor: 'rgba(0, 19, 25, 0.5)',
            // pointHoverBorderColor: 'rgba(0, 19, 25, 1)',
            pointHoverRadius: 7,
            pointRadius: 9
          };
          dataSets.push(dataLine);
        });

        const dataSetByDay = {
          labels: Array.from(days),
          datasets: dataSets
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

        const lineChartByDays = new Chart(ctx, {
          type: 'line',
          data: dataSetByDay,
          options: option
        });
      });
  }

  private randomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return 'rgb(' + r + ',' + g + ',' + b + ', 0.5)';
  }

  private createChartByDays() {
    this.http.get<Data>('./assets/result.json')
      .toPromise()
      .then(data => {
        const map = new Map();
        data.models.forEach(model => {
          let date = new Date();

          if (/.*(hours|hour)/.test(model.time_ago)) {
            const hour = model.time_ago.match(/\d+/g).map(Number)[0];
            date = new Date(Date.now());
            date.setHours(date.getHours() - Number(hour));
          } else if (/.*(days|day)/.test(model.time_ago)) {
            const day = model.time_ago.match(/\d+/g).map(Number)[0];
            date = new Date(Date.now());
            date.setDate(date.getDate() - Number(day));
          }

          const strDate = date.toLocaleDateString('en-US');

          if (map.get(strDate) === undefined) {
            map.set(strDate, Number(model.score));
          } else {
            map.set(strDate, map.get(strDate) + Number(model.score));
          }
        });

        const canvasElement = document.getElementById('lineChartByDays') as HTMLCanvasElement;
        const ctx = canvasElement.getContext('2d');

        const dataSetByDay = {
          labels: Array.from(map.keys()),
          datasets: [
            {
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

        const lineChartByDays = new Chart(ctx, {
          type: 'line',
          data: dataSetByDay,
          options: option
        });
      });
  }
}
