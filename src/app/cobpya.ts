import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import {GoogleCharts} from '../../node_modules/google-charts';
declare let google: {
  charts: {
    load: (arg0: string, arg1: {
      packages:
      // import {GoogleCharts} from '../../node_modules/google-charts';
      string[];
    }) => void; setOnLoadCallback: (arg0: () => void) => void;
  }; visualization: { arrayToDataTable: (arg0: (string | number)[][]) => any; PieChart: new (arg0: any) => any; };
};


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  mydata=[
    ['Task', 'Hours per Day'],
    ['Work',     11],
    ['Eat',      2],
    ['Commute',  2],
    ['Watch TV', 2]
   
  ]
  @ViewChild('pieChart') pieChart!: ElementRef
  title = 'googleChartTest';
  ngOnInit(): void {
    google.charts.load('current', { 'packages': ['corechart'] })
    google.charts.setOnLoadCallback(this.drawChart);
  }
  drawChart = () => {
    
    const data = google.visualization.arrayToDataTable(this.mydata);
  
    const options = {
      title: 'My Daily Activities',
      legend: {position: 'top'}
    };
  
    const chart = new google.visualization.PieChart(this.pieChart.nativeElement);
  
    chart.draw(data, options);
  }
  addRow(){
    const data =  ['Sleep',    7]
    this.mydata.push(data);
    google.charts.load('current', { 'packages': ['corechart'] })
    google.charts.setOnLoadCallback(this.drawChart);
}}
