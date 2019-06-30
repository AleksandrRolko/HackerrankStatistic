import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  constructor(private http: HttpClient) {
  }

  public getResult(): Observable<any> {
    return this.http.get('./assets/result.json');
  }
}
