import { Injectable } from '@angular/core';
import { ProjectEmployee } from './Model/ProjectEmployee';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from './Model/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {

 

  //private employeeSubject = new BehaviorSubject<Employee[]>([]);

  // Expose it as an observable
 // Employee$: Observable<Employee[]> = this.employeeSubject.asObservable();
 private employeeSubject = new BehaviorSubject<Partial<Employee>>({
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  phoneNumber: '',
  gender: '',
  date: new Date(),
  roleId: '',
  departmentId: ''
});

// Expose an observable for components to subscribe to
employee$: Observable<Partial<Employee>> = this.employeeSubject.asObservable();
  // Method to update employees
  updateEmployees(newEmployees: Employee) {
    this.employeeSubject.next(newEmployees);
  }
}

