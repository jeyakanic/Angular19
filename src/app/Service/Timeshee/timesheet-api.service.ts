import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Timesheet } from '../../Model/Timesheet';

@Injectable({
  providedIn: 'root'
})
export class TimesheetApiService {
ApiURl ="https://localhost:7079/api/Timesheet/";


  constructor() { }

  http = inject(HttpClient);

  getTimesheet():Observable<any[]>
  {
    return this.http.get<any[]>(`${this.ApiURl}GetTimesheet`);
  }
  getIdTimesheet(id:number):Observable<Timesheet[]>
  {
    debugger
    const url =`${this.ApiURl}GetTimesheet/${id}`;
    return this.http.get<any>(url);
  }
  getTimesheetwithEmpName(): Observable<Timesheet[]> {
    return this.http.get<any>(`${this.ApiURl}GetTimesheetsWithEmployeeName`).pipe(
      map(response => response.value || []) // Extract `value` array
    );
  }
 
  postTimesheet(data :Timesheet)
  {
    return this.http.post<any[]>(`${this.ApiURl}CreateTimeSheet`, data);
  }
}
