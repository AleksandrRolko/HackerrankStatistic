import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {MainComponent} from './main/main.component';
import {StatisticComponent} from './statistic/statistic.component';
import {RouterModule, Routes} from '@angular/router';
import {ResultService} from './statistic/result/result.service';
import {TableComponent} from './statistic/table/table.component';
import {MatTableModule} from '@angular/material';
import {BarChartComponent} from './statistic/bar-chart/bar-chart.component';
import {ChartsModule} from 'ng2-charts';
import {LineChartComponent} from './statistic/line-chart/line-chart.component';
import {MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSortModule} from '@angular/material';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';

const statisticRoutes: Routes = [
  {
    path: '',
    component: StatisticComponent
  },
  {
    path: 'table',
    component: TableComponent
  },
  {
    path: 'bar-chart',
    component: BarChartComponent
  },
  {
    path: 'line-chart',
    component: LineChartComponent
  }
];

const appRoutes: Routes = [
  {
    path: 'statistic',
    children: statisticRoutes
  },
  {
    path: '',
    component: MainComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    StatisticComponent,
    TableComponent,
    BarChartComponent,
    LineChartComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes, {enableTracing: true}
    ),
    BrowserModule,
    HttpClientModule,
    MatTableModule,
    ChartsModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    BrowserAnimationsModule,
    NoopAnimationsModule
  ],
  providers: [ResultService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
