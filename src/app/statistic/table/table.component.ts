import {Component, OnInit} from '@angular/core';
import {Result} from '../result/result';
import {TableService} from './table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  columns: string[];
  rows: Result[];

  constructor(private tableService: TableService) { }

  ngOnInit() {
    this.columns = this.tableService.getColumns();
    this.rows = this.tableService.getRows();
  }
}
