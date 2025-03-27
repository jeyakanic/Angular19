import { Injectable } from '@angular/core';
import { ProjectEmployee } from '../../Model/ProjectEmployee';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectEmployeeServiceService {

  private projectEmployeeSubject = new BehaviorSubject<ProjectEmployee>(new ProjectEmployee());
    // Expose as observable
  projectEmployee$: Observable<ProjectEmployee> = this.projectEmployeeSubject.asObservable();
  // Call this method to update the value (e.g., when you have a new id or new data)
  updateProjectEmployee(newEmployee: ProjectEmployee) {
    this.projectEmployeeSubject.next(newEmployee);
  }
}
