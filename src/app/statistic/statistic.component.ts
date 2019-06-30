import {Component, OnInit} from '@angular/core';
import {ResultService} from './result/result.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {

  constructor(private resultService: ResultService) {
  }

  ngOnInit() {
    let results = this.resultService.getResult();
    
  }
}
