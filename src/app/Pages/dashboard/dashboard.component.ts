import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../api.service';
import { Employee } from '../../Model/Employee';
import { pipe } from 'rxjs';
import { CommonModule, DatePipe } from '@angular/common';
import { ProjectEmployee } from '../../Model/ProjectEmployee';

@Component({
  selector: 'app-dashbord',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  projectEmployeeList: ProjectEmployee[] = [];
  paginatedEmployees: ProjectEmployee[] = []; // Employees displayed on the current page

  pageSize = 2; // Number of items per page
  currentPage = 1; // Current page number
  totalPages = 0; // Total number of pages

  ngOnInit(): void {
    this.getallProjectEmployees();
   }
 
     masterService = inject(ApiService);
   getallProjectEmployees()
   {
    debugger
    this.masterService.getEmployeeproject().subscribe((res: ProjectEmployee[]) => {
           
          this.projectEmployeeList = res;
          console.log(res);
          this.totalPages = Math.ceil(this.projectEmployeeList.length / this.pageSize);
          this.updatePagination();
          
        }
        );

   }

   updatePagination(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedEmployees = this.projectEmployeeList.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }
  }