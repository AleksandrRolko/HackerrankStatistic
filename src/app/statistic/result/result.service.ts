import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Data} from './data';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  private url = './assets/result.json';

  constructor(private http: HttpClient) {
  }

  public getResult(): Observable<Data> {
    return this.http.get<Data>(this.url)
  }
}
