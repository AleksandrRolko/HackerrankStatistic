import {Injectable} from '@angular/core';
import {ResultService} from '../result/result.service';
import {Result} from '../result/result';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private resultService: ResultService) {
  }

  getColumns(): string[] {
    return ['Problem', 'Category', 'Language', 'Time', 'Result', 'Score'];
  }

  getRows(): Observable<any> {
    return this.resultService.getResult();
  }
}
