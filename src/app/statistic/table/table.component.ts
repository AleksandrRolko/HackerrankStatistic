import {Component, OnInit} from '@angular/core';
import {TableService} from './table.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  public isVisible: boolean;

  columns: string[];
  rows: any[];

  constructor(private tableService: TableService) {
  }

  ngOnInit() {
    this.isVisible = false;

    this.columns = this.tableService.getColumns();
    this.tableService.getRows()
      .subscribe(data => {
        const results = [];
        data.models.forEach(function(model) {
          const result = {
            challenge: model.challenge.name,
            category: model.kind,
            language: model.language,
            timeAgo: model.time_ago,
            status: model.status,
            score: model.score
          };
          results.push(result);
        });

        this.rows = results;
      });
  }

  public toggle(): void {
    this.isVisible = !this.isVisible;
  }
}
