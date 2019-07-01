import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  selectedFile = null;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  // onFileSelected(event) {
  //   this.selectedFile = event.target.files[0];
  // }
  //
  // uploadFile(){
  //   const fd = new FormData();
  //   fd.append('result', this.selectedFile, this.selectedFile.name);
  //   this.http.post('gs://hackerrank-statistic.appspot.com/', fd)
  //     .subscribe(res => console.log(res));
  // }
}
