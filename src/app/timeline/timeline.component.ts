import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';


import { TimelineService } from '../timeline.service';
declare let google: { visualization: { arrayToDataTable: (arg0: any[]) => any; Timeline: new (arg0: any) => any; events: { addListener: (arg0: any, arg1: string, arg2: { (event: any): void; (event: any): void; }) => void; }; }; charts: { load: (arg0: string, arg1: { packages: string[]; }) => void; setOnLoadCallback: (arg0: () => void) => void; }; }

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent {
  @ViewChild('mychartContainer') mychartContainer!: ElementRef
   openEditForm = false;
   title = 'Academic-timeline';
  // type = ChartType.Timeline;
  // colNames = ["Event", "Event-Name", { role: 'tooltip', type: 'string', p: {html: true} }, "Start", "End"];
   myData:any;
   data = [];
   isLabelSet = false;
   barYvalues = [0];
   options:any;
   barheight = 0;
  
   width = window.innerWidth * 0.99;
   height = 500;
   isChart = false;
  constructor(private timelineService: TimelineService) { }
  ngOnInit() {
   
    this.isLabelSet = true;
    this.myData = this.data;
    this.updateChartData();
    this.timelineService.isChartDataSend$.subscribe(res =>{
      this.updateChartData();
    })
    this.timelineService.isChartClose$.subscribe(res =>{
      this.openEditForm = false;
      this.updateChartData();
    })
  
    window.addEventListener('resize', this.onResizeWindow.bind(this));
  }
  drawChart = () => {
    
    const data = google.visualization.arrayToDataTable([['id','name', 'Start Time', 'End Time'],...this.myData]);
  
    const options = this.options
    const chart = new google.visualization.Timeline(this.mychartContainer.nativeElement);
  
   
    google.visualization.events.addListener(chart, 'select', this.onSelectRowData.bind(this));
    google.visualization.events.addListener(chart, 'ready', this.setChart.bind(this));
    chart.draw(data, options);

  }
  updateChartData(){
    
    const dataJson  = this.timelineService.getData();
    // this.myData = null;
    console.log("dataJson",dataJson);
    this.myData = this.timelineService.getChartData(dataJson);
      this.isChart = true;
     this.options={
      width:500,
      height:this.height,
      responsive: true,
      barWidth: 1,
      enableInteractivity: false,
      timeline:{
            colorByRowLabel:true,
            showBarLabels: true,
            barLabelStyle: {
              opacity:0,
              fontSize: 20,        
          },
          rowLabelStyle: {
              fontSize: 20,        
          },
      },
        hAxis: {
          format:" ",
          gridlines: {count: 0},
        }, 
        vAxis: {
          gridlines: {count: 0},
        }, 
        tooltip:{
          isHtml:true,
          // trigger:'select'
        },
        colors: ['#e5f4ff', '#ffebcd', '#edbcbc','#bfbfbf']
     }

     google.charts.load('current', { 'packages': ['corechart','timeline'] })
    google.charts.setOnLoadCallback(this.drawChart);
    
    //  setTimeout(() => {
    //   this.setBorderRadius();
    //  }, 100);
  }
  onResizeWindow(evt: any){
    this.width = window.innerWidth * 0.99;
  }
  onSelectRowData(event: any) {
    this.openEditForm = true;
    const { row, column } = event.selection[0];
    console.log("onSelectRowData", row, column);
    this.timelineService.editRowNumber.next(row);
   
   

  }
  addEntry() {
    this.openEditForm = true;
    this.timelineService.editRowNumber.next(-1);
    this.timelineService.chartDataAdded.next(true);
    
  }

  setChart(event:any) {
    console.log("setChart",);
    
    let that = this;
    const container = document.getElementById("charView");
    if(document.getElementById("labelDiv")){
      document.getElementById("labelDiv")?.remove();
    }
    let containerdiv = document.createElement("div");
    containerdiv.id = "labelDiv";
    // containerdiv.style.pointerEvents= 'none';
    
    if(container){
    
      var adjustY = 91;
      var adjustX = 15;
      that.barYvalues = [];
    Array.prototype.forEach.call(container.getElementsByTagName('g'), function (g,index) {
     
      console.log("rect",g,index);
      if(index===0){
      
        Array.prototype.forEach.call(g.getElementsByTagName('path'), function (path) {
          path.setAttribute('stroke','transparent');
        });
        Array.prototype.forEach.call(g.getElementsByTagName('rect'), function (rect) {
          if(that.barheight===0){
            that.barheight = rect.getAttribute("height")
          }
          rect.setAttribute('fill','transparent');
          rect.setAttribute('stroke','#e6e6e6');
          rect.setAttribute('stroke-width','1');
        });
       
      }else if(index===3){
        Array.prototype.forEach.call(g.getElementsByTagName('rect'), function (rect,i) {
          rect.setAttribute("height",that.barheight);
          let yValues = rect.getAttribute("y");
          rect.setAttribute("y",yValues-15);
          that.barYvalues.push(yValues-15);
          console.log("that.barYvalues",that.barYvalues);
          
          if(i===0){
            rect.setAttribute("rx","5");
            rect.setAttribute("ry","5");
            // rect.setAttribute("height","20");

          }
          if(i===1){
            rect.setAttribute("rx","5");
            rect.setAttribute("ry","5");
            // rect.setAttribute("height","10");
          }
        
      
        if (rect.getAttribute('x') !== '0') {
         let rectLabel = '';
         let toolTips = '';
          let label = parseInt(rect.nextElementSibling.innerHTML);
          // rect.nextElementSibling.setAttribute("style","opacity:0");
          console.log("label",label,);
          that.timelineService.myJsonData.forEach(row =>{
            if(row.id === label){
              rectLabel = '<div name='+label+' style="font-weight: 800;width: 100%;height: 100%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">'+ row.typeName+'<div><div style="font-weight: 100;opacity: 0.8;">'+row.type+'</div>';
             
              toolTips = '<div style="width: fit-content;background: #eeeeee;border-radius: 12px;padding: 10px;"><div style="font-size: 14px;font-weight: 700;text-align: center;">'+ row.typeName +' '+row.type+'</div><br><div style="font-size: 12px;">'+ new Date(row.startDate).toDateString()+' - '+ new Date(row.endDate).toDateString()+'</div></div>';
            }
          })
          container.appendChild(containerdiv);
          let barLabel = containerdiv.appendChild(document.createElement('div'));
          barLabel.innerHTML =rectLabel;
          barLabel.className = "tooltip";
         
          // element.previousElementSibling
          barLabel.style.color = '#000';
          barLabel.style.position = 'absolute';
          
          barLabel.style.textAlign = 'center'
          // barLabel.style.pointerEvents= 'none';
          // barLabel.style.userSelect = 'none';
          barLabel.style.fontSize = '13px';
          barLabel.style.width = (parseInt(rect.getAttribute('width'))- adjustX) + 'px';
          barLabel.style.height = (parseInt(rect.getAttribute('height'))-10) + 'px';
          // barLabel.style.height ="auto";
          barLabel.style.top = (parseInt(rect.getAttribute('y'))+ adjustY ) + 'px';
          barLabel.style.left = (parseInt(rect.getAttribute('x')) + adjustX) + 'px';
          barLabel.setAttribute("name",(label.toString()));
         let toolTip = document.createElement('div')
         toolTip.className = "tooltiptext";
         toolTip.innerHTML = toolTips;
         toolTip.style.pointerEvents= 'none';
         toolTip.style.userSelect = 'none';
         barLabel.appendChild(toolTip);
         barLabel.addEventListener('click',that.onSelectBar.bind(that))
      }
    });
  
  }
      
    });
   
    
    Array.prototype.forEach.call(container.getElementsByTagName('text'), function (text) {
      text.setAttribute('font-size', "12px");
    });
  }
  }
  onSelectBar(e:any){
  
   let row = e.target;
   let id = parseInt(row.getAttribute("name"));

   if(id!==undefined && id!==null){
    this.openEditForm = true;
    this.timelineService.editRowNumber.next(id)
    console.log("onSelectBar",id);
   }
  }
      
    }

