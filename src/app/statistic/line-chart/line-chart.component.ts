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
            const categoriesMap = new Map();
            categoriesMap.set(model.kind, Number(model.score));
            map.set(strDate, categoriesMap);
          } else {
            const categoriesMap = map.get(strDate);
            categoriesMap.set(model.kind, categoriesMap.get(model.kind) + Number(model.score));
            map.set(strDate, categoriesMap);
          }
        });

        console.log(map);

        const canvasElement = document.getElementById('lineChartByDaysAndCategories') as HTMLCanvasElement;
        const ctx = canvasElement.getContext('2d');

        const dataSets = [];

        map.forEach((value, key) => {
          const dataLine = {
            data: Array.from(map.get(key).keys()),
            label: key,
            backgroundColor: 'rgba(27, 169, 76, 0.3)',
            borderColor: 'rgba(27, 169, 76, 1)',
            pointBackgroundColor: 'rgba(27, 169, 76, 1)',
            pointBorderColor: 'rgba(27, 169, 76, 1)',
            pointHoverBackgroundColor: 'rgba(0, 19, 25, 0.5)',
            pointHoverBorderColor: 'rgba(0, 19, 25, 1)',
            pointHoverRadius: 7,
            pointRadius: 9
          };
          dataSets.push(dataLine);
        });

        const dataSetByDay = {
          labels: Array.from(map.keys()),
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
