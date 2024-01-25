import { Component, OnInit } from '@angular/core';
declare let google: { visualization: { 
  DataTable: new () => any; // Add DataTable to the declaration
  arrayToDataTable: (arg0: any[]) => any; Timeline: new (arg0: any) => any; events: { addListener: (arg0: any, arg1: string, arg2: { (event: any): void; (event: any): void; }) => void; }; }; charts: { load: (arg0: string, arg1: { packages: string[]; }) => void; setOnLoadCallback: (arg0: () => void) => void; }; }

  export enum AcademicCalendarEventTypeEnum {
    ACADEMIC = "ACADEMIC",
    EXAMS = "EXAMS",
    VACATIONS = "VACATIONS",
    OTHER = "OTHER"
}
let chartData = [
  [
      "ACADEMIC EVENT",
      "Term 1",
      "2027-03-31T18:30:00.000Z",
      "2027-06-30T18:30:00.000Z"
  ],
  [
      "ACADEMIC EVENT",
      "Term 2",
      "2027-07-01T18:30:00.000Z",
      "2027-09-29T18:30:00.000Z"
  ],
  [
      "ACADEMIC EVENT",
      "Term 3",
      "2027-09-30T18:30:00.000Z",
      "2027-12-29T18:30:00.000Z"
  ],
  [
      "ACADEMIC EVENT",
      "Term 4",
      "2027-12-30T18:30:00.000Z",
      "2028-03-29T18:30:00.000Z"
  ],
  [
      "VACATIONS EVENT",
      "Vacation 1",
      "2027-03-31T18:30:00.000Z",
      "2027-04-02T18:30:00.000Z"
  ],
  [
      "VACATIONS EVENT",
      "zxvc",
      "2027-04-04T18:30:00.000Z",
      "2027-04-07T18:30:00.000Z"
  ],
  [
      "VACATIONS EVENT",
      "Vacation 2",
      "2027-07-01T18:30:00.000Z",
      "2027-07-19T18:30:00.000Z"
  ],
  [
      "VACATIONS EVENT",
      "Vacation 3",
      "2027-09-30T18:30:00.000Z",
      new Date("2027-10-18T18:30:00.000Z")
  ],
  [
      "VACATIONS EVENT",
      "Vacation 4",
      "2027-12-30T18:30:00.000Z",
      "2028-01-17T18:30:00.000Z"
  ],
  [
      "EXAMS EVENT",
      "Exam 1",
      "2027-04-20T18:30:00.000Z",
      "2027-05-09T18:30:00.000Z"
  ],
  [
      "EXAMS EVENT",
      "Exam 2",
      "2027-07-20T18:30:00.000Z",
      "2027-08-08T18:30:00.000Z"
  ],
  [
      "EXAMS EVENT",
      "Exam 3",
      "2027-10-19T18:30:00.000Z",
      "2027-11-07T18:30:00.000Z"
  ],
  [
      "EXAMS EVENT",
      "Exam 4",
      "2028-01-18T18:30:00.000Z",
      "2028-02-06T18:30:00.000Z"
  ]
];


 const chartData2 = [
  [
      "ACADEMIC EVENT",
      "Term 1",
      "2027-03-31T18:30:00.000Z",
      "2027-06-30T18:30:00.000Z"
  ],
  [
      "ACADEMIC EVENT",
      "Term 2",
      "2027-07-01T18:30:00.000Z",
      "2027-09-29T18:30:00.000Z"
  ],
  [
      "ACADEMIC EVENT",
      "Term 3",
      "2027-09-30T18:30:00.000Z",
      "2027-12-29T18:30:00.000Z"
  ],
  [
      "ACADEMIC EVENT",
      "Term 4",
      "2027-12-30T18:30:00.000Z",
      "2028-03-29T18:30:00.000Z"
  ],
  [
      "VACATIONS EVENT",
      "Vacation 1",
      "2027-03-31T18:30:00.000Z",
      "2027-06-30T18:30:00.000Z"
  ],
  [
      "VACATIONS EVENT",
      "Vacation 2",
      "2027-07-01T18:30:00.000Z",
      "2027-07-19T18:30:00.000Z"
  ],
  [
      "VACATIONS EVENT",
      "Vacation 3",
      "2027-09-30T18:30:00.000Z",
      "2027-10-18T18:30:00.000Z"
  ],
  [
      "VACATIONS EVENT",
      "Vacation 4",
      "2027-12-30T18:30:00.000Z",
      "2028-01-17T18:30:00.000Z"
  ],
  [
      "EXAMS EVENT",
      "Exam 2",
      "2027-07-20T18:30:00.000Z",
      "2027-09-29T18:30:00.000Z"
  ],
  [
      "EXAMS EVENT",
      "Exam 3",
      "2027-10-19T18:30:00.000Z",
      "2027-12-22T18:30:00.000Z"
  ],
  [
      "EXAMS EVENT",
      "Exam 4",
      "2028-01-18T18:30:00.000Z",
      "2028-02-06T18:30:00.000Z"
  ],
  [
      "OTHER EVENT",
      "testing",
      "2028-02-07T18:30:00.000Z",
      "2028-03-03T18:30:00.000Z"
  ],
  [
      "OTHER EVENT",
      "annual days",
      "2028-03-04T18:30:00.000Z",
      "2028-03-29T18:30:00.000Z"
  ]
]
let chartData3 = [
  [
      "ACADEMIC EVENT",
      "Term 1",
      "2027-03-31T18:30:00.000Z",
      "2027-06-30T18:30:00.000Z"
  ],
  [
      "ACADEMIC EVENT",
      "Term 2",
      "2027-07-01T18:30:00.000Z",
      "2027-09-29T18:30:00.000Z"
  ],
  [
      "ACADEMIC EVENT",
      "Term 3",
      "2027-09-30T18:30:00.000Z",
      "2027-12-29T18:30:00.000Z"
  ],
  [
      "ACADEMIC EVENT",
      "Term 4",
      "2027-12-30T18:30:00.000Z",
      "2028-03-29T18:30:00.000Z"
  ],
  [
      "VACATIONS EVENT",
      "Vacation 1",
      "2027-03-31T18:30:00.000Z",
      "2027-06-30T18:30:00.000Z"
  ],
  [
      "VACATIONS EVENT",
      "Vacation 2",
      "2027-07-01T18:30:00.000Z",
      "2027-07-19T18:30:00.000Z"
  ],
  [
      "VACATIONS EVENT",
      "Vacation 3",
      "2027-09-30T18:30:00.000Z",
      "2027-10-18T18:30:00.000Z"
  ],
  [
      "VACATIONS EVENT",
      "Vacation 4",
      "2027-12-30T18:30:00.000Z",
      "2028-01-17T18:30:00.000Z"
  ],
  [
      "EXAMS EVENT",
      "Exam 2",
      "2027-07-20T18:30:00.000Z",
      "2027-09-29T18:30:00.000Z"
  ],
  [
      "EXAMS EVENT",
      "Exam 3",
      "2027-10-19T18:30:00.000Z",
      "2027-12-22T18:30:00.000Z"
  ],
  [
      "EXAMS EVENT",
      "Exam 4",
      "2028-01-18T18:30:00.000Z",
      "2028-02-06T18:30:00.000Z"
  ],
  [
      "OTHER EVENT",
      "testing",
      "2028-02-07T18:30:00.000Z",
      "2028-03-03T18:30:00.000Z"
  ],
  [
      "OTHER EVENT",
      "caro can eve",
      "2028-02-08T18:30:00.000Z",
      "2028-03-12T18:30:00.000Z"
  ],
  [
      "OTHER EVENT",
      "annual days",
      "2028-03-04T18:30:00.000Z",
      "2028-03-29T18:30:00.000Z"
  ],
  [
      "OTHER EVENT",
      "extra ",
      "2028-03-26T18:30:00.000Z",
      "2028-03-29T18:30:00.000Z"
  ]
]

let chartData4 = [
  [
      "ACADEMIC EVENT",
      "Term 1",
      "2027-03-31T18:30:00.000Z",
      "2027-06-30T18:30:00.000Z"
  ],
  [
      "ACADEMIC EVENT",
      "Term 2",
      "2027-07-01T18:30:00.000Z",
      "2027-09-29T18:30:00.000Z"
  ],
  [
      "ACADEMIC EVENT",
      "Term 3",
      "2027-09-30T18:30:00.000Z",
      "2027-12-29T18:30:00.000Z"
  ],
  [
      "ACADEMIC EVENT",
      "Term 4",
      "2027-12-30T18:30:00.000Z",
      "2028-03-29T18:30:00.000Z"
  ],
  [
      "VACATIONS EVENT",
      "Vacation 1",
      "2027-03-31T18:30:00.000Z",
      "2027-04-19T18:30:00.000Z"
  ],
  [
      "VACATIONS EVENT",
      "Vacation 2",
      "2027-07-01T18:30:00.000Z",
      "2027-07-19T18:30:00.000Z"
  ],
  [
      "VACATIONS EVENT",
      "Vacation 3",
      "2027-09-30T18:30:00.000Z",
      "2027-10-18T18:30:00.000Z"
  ],
  [
      "VACATIONS EVENT",
      "Vacation 4",
      "2027-12-30T18:30:00.000Z",
      "2028-01-17T18:30:00.000Z"
  ],
  [
      "EXAMS EVENT",
      "Exam 1",
      "2027-04-20T18:30:00.000Z",
      "2027-05-09T18:30:00.000Z"
  ],
  [
      "EXAMS EVENT",
      "Exam 2",
      "2027-07-20T18:30:00.000Z",
      "2027-08-08T18:30:00.000Z"
  ],
  [
      "EXAMS EVENT",
      "exam 3.1",
      "2027-10-19T18:30:00.000Z",
      "2027-11-05T18:30:00.000Z"
  ],
  [
      "EXAMS EVENT",
      "exam 3.2",
      "2027-11-07T18:30:00.000Z",
      "2027-11-29T18:30:00.000Z"
  ],
  [
      "EXAMS EVENT",
      "exam 3.3",
      "2027-12-01T18:30:00.000Z",
      "2027-12-29T18:30:00.000Z"
  ],
  [
      "EXAMS EVENT",
      "Exam 4",
      "2028-01-18T18:30:00.000Z",
      "2028-02-06T18:30:00.000Z"
  ]
]

@Component({
  selector: 'app-google-timeline-demo',
  templateUrl: './google-timeline-demo.component.html',
  styleUrls: ['./google-timeline-demo.component.css']
})
export class GoogleTimelineDemoComponent implements OnInit {
  constructor() { }

  ngOnInit(): void {
    this.renderChart()
  }

renderChart()
{

  google.charts.load("current", {packages:["timeline"]});
google.charts.setOnLoadCallback(drawChart);

var options = {
  width: '100%',
  height: 250,
  timeline: { colorByRowLabel: true },
   colors: ['#e5f4ff', '#ffebcd', '#edbcbc', 'bfbfbf'],
   alternatingRowStyle: false,
   hAxis: {
    format: ' ',
    gridlines: { count: 0 },
  },
  vAxis: {
    gridlines: { count: 0 },
  },
};
function drawChart() {

  
  // let colorMap: { [key in AcademicCalendarEventTypeEnum]: string } = {
  //   // should contain a map of category -> color for every category
  //   ACADEMIC: '#e5f4ff',
  //   VACATIONS: '#ffebcd',
  //   EXAMS: '#edbcbc',
  //   OTHER: 'bfbfbf',
  // };
  // for (let i = 0; i < this.myData.length; i++) {
  //   colors.push(colorMap[this.myData[i][0]]);
  // }
  // colors = [...new Set(colors)];
  chartData.forEach(arr => {
    arr?.forEach((el, i) => {
      if(i >1)
         {
          let x1 = arr.pop()
          let x2 = arr.pop()
          if(x1)
             {x1 = new Date(x1);
              arr.push(x1)
            }
          if(x2)
           {x2 = new Date(x2)
            arr.push(x2)
          }
          
        }
    })
  })

  var container = document.getElementById('example3.1');
  var chart = new google.visualization.Timeline(container);

  const data = google.visualization.arrayToDataTable([
    ['labelId', 'name', 'Start Time', 'End Time'],
    ...chartData,
  ]);
  var dataTable = new google.visualization.DataTable();
  dataTable.addColumn({ type: 'string', id: 'EventType' });
  dataTable.addColumn({ type: 'string', id: 'Name' });
  // dataTable.addColumn({ type: 'string', role: 'tooltip' });
  dataTable.addColumn({ type: 'date', id: 'Start' });
  dataTable.addColumn({ type: 'date', id: 'End' });
  dataTable.addRows([
    // [ 'ACADEMIC', 'Term 1', new Date(1789, 3, 30), new Date(1797, 2, 4) ],
    // [ 'ACADEMIC', 'Term 2', new Date(1797, 2, 4), new Date(1801, 2, 4) ],
    // [ 'ACADEMIC', 'Term 3', new Date(1801, 2, 4), new Date(1809, 2, 4) ],
    // [ 'VACATION', 'John Adams', new Date(1789, 3, 21), new Date(1797, 2, 4)],
    // [ 'VACATION', 'Thomas Jefferson', new Date(1797, 2, 4), new Date(1801, 2, 4)],
    // [ 'VACATION', 'Aaron Burr', new Date(1801, 2, 4), new Date(1805, 2, 4)],
    // [ 'VACATION', 'George Clinton', new Date(1805, 2, 4), new Date(1812, 3, 20)],
    // [ 'EXAM', 'John Jay', new Date(1789, 8, 25), new Date(1790, 2, 22)],
    // [ 'EXAM', 'Thomas Jefferson', new Date(1790, 2, 22), new Date(1793, 11, 31)],
    // [ 'EXAM', 'Edmund Randolph', new Date(1794, 0, 2), new Date(1795, 7, 20)],
    // [ 'EXAM', 'Timothy Pickering', new Date(1795, 7, 20), new Date(1800, 4, 12)],
    // [ 'EXAM', 'Charles Lee', new Date(1800, 4, 13), new Date(1800, 5, 5)],
    // [ 'EXAM', 'John Marshall', new Date(1800, 5, 13), new Date(1801, 2, 4)],
    // [ 'EXAM', 'Levi Lincoln', new Date(1801, 2, 5), new Date(1801, 4, 1)],
    // [ 'EXAM', 'James Madison', new Date(1801, 4, 2), new Date(1809, 2, 3)],
    // [ 'OTHER', 'Levi Lincoln', new Date(1801, 2, 5), new Date(1801, 4, 1)],
    // [ 'OTHER', 'James Madison', new Date(1801, 4, 2), new Date(1809, 2, 3)]
    ...chartData
  ]);

  chart.draw(dataTable, options);
  
}

}

change(){
  chartData = chartData2;
  this.renderChart();
}
change3(){
  chartData = chartData3;
  this.renderChart();
}
change4(){
  chartData = chartData4;
  this.renderChart();
}
}
