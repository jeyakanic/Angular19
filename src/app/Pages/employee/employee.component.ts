import { Component, inject, OnInit, signal } from '@angular/core';
import { Employee  } from '../../Model/Employee';
import { ApiService } from '../../api.service';
import { HttpClient } from '@angular/common/http';
import { Observable, startWith, take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Role } from '../../Model/role';
import { PagedResult } from '../../Model/IPagedResult';

@Component({
  selector: 'app-employee',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {


  employeeObj: Employee = {
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phoneNumber: '',
    gender : '',
    date: new Date(), // Initializes the date to the current date
    roleId: '', // Initializes roleId as an empty string
    departmentId: '', // Initializes departmentId as an empty string
    department: {
      id: '',
      department1: '',
   //   employees: [], // Initializes as an empty array
    },
    role: {
      id: '',
      role1: '',
    //  employees: [],
    },
  };
  masterService = inject(ApiService);
  role!: Observable<Role[]>;
  shouldShowId=false;
  employees:Employee[]=[];
  apiServices = inject(ApiService);
  http =inject(HttpClient);
  isAddnewopen=signal<boolean>(true);

  pageSize = 2; // Number of records per page
  currentPage = 1; // Current page number
  totalRecords = 0; 
 /* employeeData = {
    Id: '', // Generate a unique GUID for Id
    FirstName: this.employeeObj.FirstName!,
    LastName: this.employeeObj.LastName!,
    Email: this.employeeObj.Email!,
    PhoneNumber: this.employeeObj.PhoneNumber!,//Number(this.myForm.value.PhoneNumber),
    Gender: this.employeeObj.Gender!,
   // confirmPassword:this.myForm.value.password!,
    Role:this.employeeObj.role?.role1! || "",
    Department:this.employeeObj.department?.department1 || "",
    Password:this.employeeObj.Password,
    Date:  new Date().toISOString().split('T')[0]// new Date().toISOString() // Already converted to string in FormControl
  };
*/
  ngOnInit(): void {
debugger;
   //this.getAllEmployees();
   this.getAllEmployeesWithPage();

       this.role = this.masterService.getRole().pipe(startWith([]));
  }
  getAllEmployees()
  {
    debugger;
  this.apiServices.getEmployee().subscribe((res:any) =>
    {
    console.log(res);
    this.employees=res;
    },
   error=>{
   console.log("Error from API");
   })
  }
  
  addNew()
  {
    this.Clear();
    this.isAddnewopen.set(true);
  }
  Close()
  {
    this.isAddnewopen.set(false);
  }
  
 
    onFormSubmit() {
      if (!this.employeeObj || !this.employeeObj.firstName || !this.employeeObj.email) {
        alert('Please fill in all required fields.');
        return;
      }
     const payload = {
        Id: this.employeeObj.id, // from your component's employeeObj
        FirstName: this.employeeObj.firstName,
        LastName: this.employeeObj.lastName,
        PhoneNumber: this.employeeObj.phoneNumber,
        Gender: this.employeeObj.gender,
        Email: this.employeeObj.email,
        Password: this.employeeObj.password,
        Date: new Date().toISOString(), // convert Date to ISO string
        Role: this.employeeObj.roleId?.toString() ?? ""    ,       // ensure this is set to "1" or appropriate value
        Department: this.employeeObj.departmentId?.toString() ?? "",  // ensure this is set to "1" or appropriate value
      };
     
      this.apiServices.EditEmployees(payload).subscribe({
        next: (value) => {
          alert('Created successfully');
          this.Clear();
          this.employeeObj=value;
          this.getAllEmployees();
        },
        error: (err) => {
          console.error('Error creating employee:', err);
          alert('Failed to create employee.');
        },
      });
    }
    
    Clear() {
      this.employeeObj = {
        id: '',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        gender: '',
       password: '',
        date: new Date,
      //  role '',
      //  department: ''
      }; // ✅ Create a new empty employee object
    }
  
  
  onEdit(obj:Employee)
  {
    this.employeeObj=obj;    
    this.isAddnewopen.set(true);
  }
    

  onDelete(id: string) {
    alert('Deleting Employee...');
    debugger;
  
    const result = confirm("Are you sure you want to delete?");
    if (result) {
      debugger;
  
      this.apiServices.deleteEmployee(id).pipe(take(1)).subscribe({
        next: (res: any) => {  // ✅ Accepts 'any' instead of 'Employee'
          alert('Deleted Successfully');
          this.getAllEmployees(); // Refresh list
        },
        error: (error: any) => {
          console.error("Error from API:", error);
          alert("Failed to delete. Please try again.");
        }
      });
    }
  }
  onUpdate()
  {
    debugger
    if (!this.employeeObj || !this.employeeObj.firstName || !this.employeeObj.email) {
      alert('Please fill in all required fields.');
      return;
    }
   const payload = {
      Id: this.employeeObj.id, // from your component's employeeObj
      FirstName: this.employeeObj.firstName,
      LastName: this.employeeObj.lastName,
      PhoneNumber: this.employeeObj.phoneNumber,
      Gender: this.employeeObj.gender,
      Email: this.employeeObj.email,
      Password: this.employeeObj.password,
      Date: new Date().toISOString(), // convert Date to ISO string
      Role: this.employeeObj.roleId?.toString() ?? ""    ,       // ensure this is set to "1" or appropriate value
      Department: this.employeeObj.departmentId?.toString() ?? "",  // ensure this is set to "1" or appropriate value
    };
   
    this.apiServices.EditEmployees(payload).subscribe((res:Employee)=>{            
      alert('Updated Successfully')
      this.getAllEmployees();     
      this.Clear();
    }, error=>{
      alert("Error from API")
    }) 
  }


// Pagination Controls 
  getAllEmployeesWithPage(): void 
  {
    debugger;
  this.apiServices.getEmployeesWithPage(this.currentPage, this.pageSize).subscribe({
    next: (response: PagedResult<Employee>) => {
      this.employees = response.data;
      this.totalRecords = response.totalRecords;
    },
    error: (err) => {
      console.error('Error fetching employees:', err);
    },
  });
  }
  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage = page;
      this.getAllEmployeesWithPage();
    }
  }

  totalPages(): number {
    return Math.ceil(this.totalRecords / this.pageSize);
  }
}