import { Component, ElementRef, inject, OnInit, Signal, ViewChild, viewChild } from '@angular/core';
import { Timesheet } from '../../Model/Timesheet';
import { TimesheetApiService } from '../../Service/Timeshee/timesheet-api.service';
import { CalculateHoursPipe } from "../../calculate-hours.pipe";
import { CalculateTotalHoursPipe } from '../../calculate-total-hours.pipe';
import bootstrap, { Modal } from 'bootstrap'; // ✅ Import Bootstrap Modal
@Component({
  selector: 'app-timesheet',
  standalone: true,
  imports: [CalculateHoursPipe],
  templateUrl: './timesheet.component.html',
  styleUrl: './timesheet.component.css'
})
export class TimesheetComponent implements OnInit {
  @ViewChild('addTimesheet', { static: false }) modalElement!: ElementRef;
  @ViewChild('showTimesheet', { static: false }) modalElementShow!: ElementRef;
  private modalInstance: Modal | null = null; // Initialize as null
  private modalInstanceShow: Modal | null = null; // Initialize as null
  selectedEmployeeName: string | null = null;
  date: string;

  constructor()
  {
    const today = new Date();
    this.date = `${today.getMonth() + 1}/${today.getDate()}/${today.getFullYear()}`; // MM/DD/YYYY format
 
  }

apirequest=inject(TimesheetApiService)
  timesheets : Timesheet [] =[] ;
  timesheetsEmpId : Timesheet [] =[] ;
  times: any;

  ngOnInit(): void {
    //this.modalInstanceShow = new bootstrap.Modal(document.getElementById('showTimesheet')); 
  
  this.getTimeseetwithEmpName();
  }
  getTimeseetwithEmpName()
  {

    this.apirequest.getTimesheetwithEmpName().subscribe((resp:any)=>{
   //   this.timesheets=resp;
   this.timesheets=resp;
      console.log(resp);
     
    })
  }
  getempIdwithTimeseet(id:any)
  {
    debugger
    this.apirequest.getIdTimesheet(id).subscribe((resp:any)=>{
    this.timesheetsEmpId=resp;
    console.log(resp);
     
    })
     
  }
  ngAfterViewInit(): void {
    if (this.modalElement?.nativeElement) {
      this.modalInstance = new Modal(this.modalElement.nativeElement);
      console.log('Modal initialized:', this.modalInstance); // Debugging log
    } else {
      console.error('Modal element not found');
    }
    if (this.modalElementShow?.nativeElement) {
      this.modalInstanceShow = new Modal(this.modalElementShow.nativeElement);
      console.log('Modal initialized:', this.modalElementShow); // Debugging log
    } else {
      console.error('Modal element not found');
    }
  }

  openShowModal(): void {
    if (this.modalInstanceShow) {

      this.modalInstanceShow.show();
      console.log('Modal opened'); // Debugging log
    } else {
      console.error('Modal instance is undefined');
    }
  }

  openModal(): void {
    if (this.modalInstance) {
      this.modalInstance.show();
      console.log('Modal opened'); // Debugging log
    } else {
      console.error('Modal instance is undefined');
    }
  }


  addTimeSheet()
  {

  }
  openTimesheetModal(empid:any,employeeName:any)
  {
    alert(empid)
    this.getempIdwithTimeseet(empid);
    this.selectedEmployeeName = employeeName;
    setTimeout(() => { // Ensure modal opens after data fetch
    if (this.modalInstanceShow) {
      this.modalInstanceShow.show();
 
      console.log('Modal opened'); // Debugging log
    } else {
      console.error('Modal instance is undefined');
    }
  }, 500); // Small delay to ensure data is ready
  }
  
  closeModal(): void {
    if (this.modalInstance) {
      this.modalInstance.hide();
      console.log('Modal closed'); // Debugging log
    } else {
      console.error('Modal instance is undefined');
    }
  }
  
  closeShowModal(): void {
    if (this.modalInstanceShow) {
      this.modalInstanceShow.hide();
      console.log('Modal closed'); // Debugging log
    } else {
      console.error('Modal instance is undefined');
    }
  }

  


  getTotalTime(resps:any) {

    let totalHours = 0;
    let totalMinutes = 0;

    for (let time of resps) {
      const timeResult: any = new CalculateTotalHoursPipe().transform(time.startTime, time.endTime, true);
      totalHours += timeResult.hours;
      totalMinutes += timeResult.minutes;
    }

    // Convert extra minutes into hours
    totalHours += Math.floor(totalMinutes / 60);
    totalMinutes = totalMinutes % 60;

    return totalHours > 0 && totalMinutes > 0 ? `${totalHours}h ${totalMinutes}m` :
           totalHours > 0 ? `${totalHours}h` :
           `${totalMinutes}m`;
  }
}


 