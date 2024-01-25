import { Component, Input,OnInit } from '@angular/core';
import { TimelineService } from '../timeline.service';
import { FormBuilder, FormControl, FormGroup,Validators } from '@angular/forms';
@Component({
  selector: 'app-editchart',
  templateUrl: './editchart.component.html',
  styleUrls: ['./editchart.component.scss']
})
export class EditchartComponent implements OnInit {
  // @Input() data;
  form: FormGroup;
  dataJson: any;
  typesOfBlock :any;
  termsList :any;
  termMinDate:any;
  termMaxDate:any;
  term1_MinDate:any;
  term1_MaxDate:any;
  term2_MinDate:any;
  term2_MaxDate:any;
  endMinDate:any;
  isStartDateSelected = true;
  academicType ="";
  academicTerm ="";
  eventLabel ="";
  startDate= new Date();
  endDate =new Date();
  myFormData:any;
  id:any;
  index:any;
  isEditedData = false;

  constructor(private timelineService: TimelineService,
    private fb: FormBuilder,) { 
      this.form = this.fb.group({
          typeName: ['', [Validators.required]],
          startDate: ['', [Validators.required]],
          endDate: ['', [Validators.required]]
      })
    }

  ngOnInit(): void {
  this.typesOfBlock = this.timelineService.typesOfEvents;
  this.termsList  =this.timelineService.termsList;
  this.form.controls["endDate"].disable();
  this.term1_MinDate=this.timelineService.term1_minDate;
  this.term1_MaxDate=this.timelineService.term1_maxDate;
  this.term2_MinDate=this.timelineService.term2_minDate;
  this.term2_MaxDate=this.timelineService.term2_maxDate;

 
    this.timelineService.editRowNumber$.subscribe(rowNumber => {
      if(rowNumber !== -1){
     this.isEditedData = true;
     this.form.controls["endDate"].enable(); 
       this.index = rowNumber;
        if(this.timelineService.myJsonData){
         this.myFormData = this.timelineService.myJsonData[rowNumber];
         this.academicTerm = this.myFormData.term;
         this.setCalenderRange(this.academicTerm)
         this.academicType = this.myFormData.type;
         this.id =  this.myFormData.id;
         if(this.myFormData){
           if(this.myFormData.typeName){
           this.form.controls["typeName"].setValue(this.myFormData.typeName);}
           if(this.myFormData["startDate"]){
           this.form.controls["startDate"].setValue(this.myFormData.startDate);}
           if(this.myFormData["endDate"]){
           this.form.controls["endDate"].setValue(this.myFormData.endDate);}
         }
        }
      }
    });
    this.timelineService.chartDataAdded$.subscribe(flag =>{
        this.isEditedData = false;
        this.academicTerm = '';
         this.academicType = '';
           this.form.controls["typeName"].setValue('');
           this.form.controls["startDate"].setValue('');
           this.form.controls["endDate"].setValue('');
           
    })
  }
  clickToSelectTypes(type: any) {
    console.log("type",type);
    this.academicType = type;
  }
  clickToSelectTerm(term: any) {
    this.academicTerm = term;
    this.setCalenderRange(term);
   
  }
  setCalenderRange(term:any) {
    if(term===this.termsList[0]){
      this.termMinDate= this.term1_MinDate;
      this.termMaxDate=this.term1_MaxDate;     
      this.endMinDate =this.term1_MinDate;
      this.form.controls["startDate"].setValue('');
      this.form.controls["endDate"].setValue('');
    }else if(term===this.termsList[1]){
      this.termMinDate=this.term2_MinDate;
      this.termMaxDate=this.term2_MaxDate;
      this.endMinDate =this.term1_MinDate;
      this.form.controls["startDate"].setValue('');
      this.form.controls["endDate"].setValue('');
    }
  }
  
  setStartDate(evt: any) {
    this.startDate =evt.target.value;
    this.form.controls["endDate"].enable(); 
    const nextDay = new Date(this.startDate);
    nextDay.setDate(new Date(this.startDate).getDate() + 1);
    this.endMinDate =this.calculateNextDay(nextDay);
console.log("this.startDate",this.endMinDate);

  }
  calculateNextDay(date:any){
    let dd = date.getDate();
    let mm = date.getMonth() + 1;
    let yyyy = date.getFullYear();
    let day:any;
    let month:any;
    if (dd < 10) {
      day = '0' + dd;
    }else{
      day = dd;
    }
    
    if (mm < 10) {
      month = '0' + mm;
    }else{
      month =  mm;
    }
    return yyyy + '-' + month + '-' + day;
  }
  setEndDate(evt: any){
   this.endDate = evt.target.value;
   console.log("this.setEndDate",evt.target.value);
  }
  onSubmit(){
    
    if(this.isEditedData){
      const upadteData = {
        id:this.id,
        type:this.academicType,
        typeName:this.form.controls["typeName"].value,
        startDate: this.form.controls["startDate"].value,
        endDate: this.form.controls["endDate"].value,
        term: this.academicTerm
    }
    console.log("id");
    // this.timelineService.myJsonData.splice(this.index,1);
    // this.timelineService.myJsonData.push(upadteData);
    this.timelineService.myJsonData[this.index] = upadteData;
    }else{
      const newData = {
        id:this.timelineService.myJsonData.length,
        type:this.academicType,
        typeName:this.form.controls["typeName"].value,
        startDate: this.form.controls["startDate"].value,
        endDate: this.form.controls["endDate"].value,
        term: this.academicTerm
    }
    this.timelineService.myJsonData.push(newData);
    console.log("newData",newData);
    
    // this.timelineService.create(newData).subscribe((response)=>{},(error=>{}));
    }
    this.timelineService.isChartDataSend.next(null);
    this.timelineService.isChartClose.next(null);
  }
  closeForm(){
    this.academicTerm = '';
    this.academicType = '';
    this.form.controls["typeName"].setValue('');
    this.form.controls["startDate"].setValue('');
    this.form.controls["endDate"].setValue('');
    this.timelineService.isChartClose.next(null);
  }

}
