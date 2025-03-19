import { ChangeDetectorRef, Component, ElementRef, Inject, inject, NgZone, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProjectEmployee } from '../../Model/ProjectEmployee';
import { ApiService } from '../../api.service';
import { Observable, startWith } from 'rxjs';
import { Employee } from '../../Model/Employee';
import { HttpClient } from '@angular/common/http';
import { Project } from '../../Model/Project';
import { ProjectEmployeeServiceService } from '../../project-employee-service.service';
import { EmployeeServiceService } from '../../employee-service.service';
import { __values } from 'tslib';
import { CommonModule } from '@angular/common';
import { Role } from '../../Model/role';
import { PaginationComponent } from "../../pagination/pagination.component";

@Component({
  selector: 'app-projects',
  imports: [CommonModule, ReactiveFormsModule, PaginationComponent],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  totalItems:  number | null = null; // Ensure default value is assigned
  itemsPerPage: number = 2; // This is working
  currentPage: number = 1; 

  @ViewChild("mymodal") employeeModal: ElementRef | undefined;
  currentView: string = 'List';
  projectForm: FormGroup = new FormGroup({});
  private  employeeData= inject(EmployeeServiceService);
  private  projectEmployee= inject(ProjectEmployeeServiceService);

  projectEmployee$ = this.projectEmployee.projectEmployee$;
  employeeData$=this.employeeData.employee$;

  //employee$: Observable<Partial<Employee>> = this.employeeData.employee$;

  projectList: Project[] = [];
  projectEmployeeList: ProjectEmployee[] = [];
  EmployeeList :Employee[]=[];
  selectedEmployeeId: string = '';
  masterService = inject(ApiService);
  role!: Observable<Role[]>;
  http = inject(HttpClient);
  ngZone= inject(NgZone);
  cdr=Inject(ChangeDetectorRef);
  constructor() {
    debugger;
    this.initializeForm();
    this.getAllProject() ;
 //   this.employeeData$ = this.masterService.getEmployee();
  //  this.loadEmployees();
  
  }

  loadEmployees(): void {
    this.masterService.getEmployee().subscribe((res:any) => {
           
      this.EmployeeList = res;
      console.log(res);
      this.itemsPerPage = Math.ceil(this.projectEmployeeList.length / this.itemsPerPage);
    
      
    }
    );
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.getAllProject();
    this.cdr.detectChanges(); 
  }
    // When you want to update the employee data, call updateEmployee()

  ngOnInit(): void {
    //this.getAllProject();
    this.currentView = 'List';
    this.role = this.masterService.getRole().pipe(startWith([]));
   /* this.masterService.getRole().subscribe({
      next: (data) => {
        this.role=data;getAllProject
        console.log('Role Data:', data);
      },
      error: (err) => {
        console.error('Error fetching roles:', err);
      }
    });*/
      // Observable for employees list (assuming Employee[] is returned)
  }

  onEmployeeChange() {
    console.log('Selected Employee ID:', this.selectedEmployeeId);
    // If you want to update your service:
    // this.projectEmployeeService.updateProjectEmployee(...);
  }

  initializeForm(project?: Project) {

    this.projectForm = new FormGroup({
      projectId: new FormControl(project ? project.id : 0),
      projectName: new FormControl(project ? project.projectName : ""),

      leadByEmployee: new FormControl(project ? project.leadByEmail : ""),
  
      startDate: new FormControl(project ? project.startDate : ""),
      endDate: new FormControl(project ? project.endDate : ""),
      isActive: new FormControl(project ? project.isActive : false),

    })
  }
  // When you want to update the employee data, call updateEmployee()
  updateEmployeeData(newData: Partial<Employee>) {
    this.masterService.createEmployee(newData);
  }
  CreateNew() {
    this.initializeForm();
    this.currentView = "Create";
  }

  OnSaveProject() {
    debugger

    const formValue = this.projectForm.value;

    if (formValue.projectId == 0) {
      this.masterService.PostProjects(formValue).subscribe((res: Project) => {
        alert('Created successfully')
        this.CreateNew();
      }
        , error => {

        })

    }
    else {
      this.masterService.UpdateProjects(formValue).subscribe((res: Project) => {
        alert('Updated successfully')
        this.getAllProject();
        this.currentView = 'List';
      }
        , error => {

        })
    }
  }
  getAllProject() {
    debugger
    const formValue = this.projectForm.value;
    this.masterService.getAllProjects().subscribe((res: Project[]) => {
      this.projectList = res;
      this.totalItems =  res.length;
    //  this.ngZone.run(() => {
   //     this.totalItems =  res.length;
   //     this.cdr.detectChanges(); 
   //     // other assignments
   //   });
     
    //  alert(this.totalItems);
         // this.totalItems = Math.ceil(this.projectList.length / this.itemsPerPage);
         console.log('Updated Total Items:', this.totalItems);
    }
    )
  }
  getAllProjectEmployees(id: string) {
    debugger
    const formValue = this.projectForm.value;
    this.masterService.getallProjectEmployees(id).subscribe((res: ProjectEmployee[]) => {
      const record = res.filter(m => m.projectId == id)
      this.projectEmployeeList = record;
    }
    )
  }

  onEdit(projectData: Project) {
    this.initializeForm(projectData);
    this.currentView = "Create";
  }
  onDelete(id: string) {
    const result = confirm("Are u sure want to Delete");
    if (result) {
      this.masterService.DeleteProject(id).subscribe((res: Project) => {
        alert('Deleted Successfully')
        this.getAllProject();
      }, error => {
        alert('Error from API')
      })
    }
  }

  onAddEmployee(id: string) {
    
    this.getAllProjectEmployees(id);
    this.projectEmployee$.subscribe((id:any )=>{
      id=id;
    });
    if (this.employeeModal) {

      this.employeeModal.nativeElement.style.display = 'block';
    }
  }
  closeModal() {
    debugger
    if (this.employeeModal) {
      
      this.employeeModal.nativeElement.style.display = 'none';         
    }
  }
  
  onAddEmpPrj() {
    debugger
    const formValue = this.projectForm.value;
        this.masterService.PostProjectEmployee(formValue).subscribe((res: ProjectEmployee) => {

      alert('Employee added to Project successfully')
      this.getAllProjectEmployees(formValue.FormControl.Id);

    }
      , error => {
        alert('Error from API');
      })
  }

  get paginatedData(){ 
  
    const start=(this.currentPage-1)*(this.itemsPerPage)
    const end=start+this.itemsPerPage; 
    return this.projectList?.slice(start,end);
  }
}
