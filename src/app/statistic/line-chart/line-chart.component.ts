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

  public isVisible: boolean;

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.isVisible = false;

    this.http.get<Data>('./assets/result.json')
      .toPromise()
      .then(data => {
        let map = new Map();
        data.models.forEach(function(model) {
          let date = new Date();

          if (/.*(hours|hour)/.test(model.time_ago)) {
            let hour = model.time_ago.match(/\d+/g).map(Number)[0];
            date = new Date(Date.now());
            date.setHours(date.getHours() - Number(hour));
          } else if (/.*(days|day)/.test(model.time_ago)) {
            let day = model.time_ago.match(/\d+/g).map(Number)[0];
            date = new Date(Date.now());
            date.setDate(date.getDate() - Number(day));
          }

          let strDate = date.toLocaleDateString('en-US');
          console.log(strDate);

          if (map.get(strDate) == undefined) {
            map.set(strDate, Number(model.score));
          } else {
            map.set(strDate, map.get(strDate) + Number(model.score));
          }
        });

        let canvas = <HTMLCanvasElement> document.getElementById('lineChart');
        let ctx = canvas.getContext('2d');
        let lineChart = new Chart(ctx, {
          type: 'line',
          data: {
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
          }
        });
      });
  }

  public toggle(): void { this.isVisible = !this.isVisible; }
}
