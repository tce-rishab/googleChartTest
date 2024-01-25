import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TimelineService {
  constructor(private http: HttpClient) { }
  myJsonData = [
      {   id:0,
          type:"Acadamic",
          typeName:"Term1",
          startDate:"2022-04-01",
          endDate:"2022-09-30",
          term:"Term 1"
      },
      {
          id:1,
          type:"Acadamic",
          typeName:"Term2",
          startDate:"2022-10-01",
          endDate:"2023-03-31",
          term:"Term 2"
      },
      {
          id:2,
          type:"Vacation",
          typeName:"Summer",
          startDate:"2022-05-03",
          endDate:"2022-05-18",
          term:"Term 1"
      },
      {
          id:3,
      type:"Vacation",
      typeName:"Winter",
      startDate:"2023-03-04",
      endDate:"2023-03-30",
      term:"Term 2"
      },
      {
          id:4,
      type:"Exam",
      typeName:"Mid term 1",
      startDate:"2022-08-01",
      endDate:"2022-08-28",
      term:"Term 1"
      }
    ]
  
  public term1_minDate = "2022-04-01";
  public term1_maxDate = "2022-09-30";
  public term2_minDate = "2022-10-01";
  public term2_maxDate = "2023-03-31";

  apiUrl: string = 'http://localhost:3000/data';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  public chartDataAdded = new Subject();
  public chartDataAdded$ = this.chartDataAdded.asObservable();
  public isChartDataSend = new Subject();
  public isChartDataSend$ = this.isChartDataSend.asObservable();
  public isChartClose = new Subject();
  public isChartClose$ = this.isChartClose.asObservable();

  public editRowNumber = new BehaviorSubject(-1);
  public editRowNumber$ = this.editRowNumber.asObservable();
  
  public typesOfEvents = ["Acadamic","Vacation","Exam","Other"];
  public termsList = ["Term 1","Term 2"];


  
  getChartData(dataJson: any){
    if(dataJson){
      let chartdata: any= [];
      dataJson.forEach((data: any) => {
        console.log("data",data);
        const toolTip =  '<div style="width: fit-content;background: #eeeeee;border-radius: 12px;padding: 10px;"><div style="font-size: 14px;font-weight: 700;text-align: center;">'+ data.typeName +' '+data.type+'</div><br><div style="font-size: 12px;">'+ new Date(data.startDate).toDateString()+' - '+ new Date(data.endDate).toDateString()+'</div></div>';
        // const barLabel = "<div style='font-weight: 800'>" + data.typeName+"<div><div style='font-weight: 100;opacity: 0.8;'>"+data.type+"</div>"
        // let row = [data.type + " Event", data.typeName ,toolTip,new Date(data.startDate) , new Date(data.endDate)];
        let row = [data.type + " Event", String(data.id) ,new Date(data.startDate) , new Date(data.endDate)];
        chartdata.push(row);
      });
      return chartdata;
    } 
    
  }
  getData(){
    return this.myJsonData;
  }
  getData_backup() {
    // console.log(" IN --> 4 service");

    const headers = new HttpHeaders({
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET',
      'Access-Control-Allow-Origin': '*',
    });
    headers.set('Content-Type', 'text/json');
    return this.http.get(`assets/data.json`, {
      headers,
      responseType: 'text',

    }).pipe(
      catchError((err) => {
        // alert("data is not available please Try after someTime")
        // console.log('error caught in service')
        // console.error(err);
        //Handle the error here
        return throwError(err);    //Rethrow it back to component
      }));
    }
    updateData(upadtedData:any) {
      // console.log(" IN --> 4 service");
      const body = {
        data:upadtedData
      }
      const headers = new HttpHeaders({
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'PUT',
        'Access-Control-Allow-Origin': '*',
      });
      headers.set('Content-Type', 'text/json');
      return this.http.put(`assets/data.json`, body , {
        headers,
        responseType: 'text',
  
      }).pipe(
        catchError((err) => {
          // alert("data is not available please Try after someTime")
          // console.log('error caught in service')
          // console.error(err);
          //Handle the error here
          return throwError(err);    //Rethrow it back to component
        }));
      }

       // Create
  create(data: any): Observable<any> {
    let API_URL = `${this.apiUrl}`;
    return this.http.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Read
  list() {
    return this.http.get(`${this.apiUrl}`);
  }

  // Update
  update(id: any, data: any): Observable<any> {
    let API_URL = `${this.apiUrl}/${id}`;
    return this.http.put(API_URL, data, { headers: this.headers }).pipe(
      catchError(this.handleError)
    )
  }

  // Delete
  delete(id: any): Observable<any> {
    var API_URL = `${this.apiUrl}/${id}`;
    return this.http.delete(API_URL).pipe(
      catchError(this.handleError)
    )
  }

  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };

}
