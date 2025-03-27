import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../Model/Employee';
import { Project } from '../Model/Project';
import { ProjectEmployee } from '../Model/ProjectEmployee';
import { Role } from '../Model/role';
import { PagedResult } from '../Model/IPagedResult';
//import { Employee, IEmployee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  url ="https://localhost:7079/api/ApiProjectEmployee/" ;
apiUrl="https://localhost:7079/api/curd/LoginEmp";
getURL="https://localhost:7079/api/curd/getuser";
GetEmp="https://localhost:7079/api/curd/GetEmployees";
CreateEmp="https://localhost:7079/api/curd/CreateEmployee";
UpdateEmployeeURL="https://localhost:7079/api/curd/UpdateEmployee";
AllProjectEmployeeURL="https://localhost:7079/api/ApiProjectEmployee/GetProjectEmployee";
RoleUrl="https://localhost:7079/api/ApiProjectEmployee/Role";
GetEmpWithPage="https://localhost:7079/api/ApiProjectEmployee/GetEmployeesWithPage"
projectUrl="GetProject";
projectDeleteUrl="";
  LoginEmployee(userCredentials: { PassWord: string; Email: string; }){

    return this.http.post(this.apiUrl,userCredentials,{headers: { "Content-Type": "application/json" }});
  }
  getuser():Observable<any[]> {
    {
debugger
    return this.http.get<any[]>(this.getURL);
  }
}

getEmployeeproject():Observable<any[]>
{
  return this.http.get<any[]>(this.AllProjectEmployeeURL);
}
getRole():Observable<Role[]>
{
  return this.http.get<Role[]>(this.RoleUrl);
}
getEmployee():Observable<Partial<any>>
{
  debugger;
  return this.http.get(this.GetEmp,{ headers: {
    "Authorization":  ` Bearer ${localStorage.getItem('employeeApp')}` }});
}
accountCreation(emp: {
  Id: string;
  Email: string;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  Date: string;
  Gender:string;
  Password: string;
}): Observable<any> {
  return this.http.post(this.CreateEmp, emp,{
    headers: { "Content-Type": "application/json" ,} // Ensure JSON format
  });
  }
  // DELETE request method
  deleteEmployee(employeeId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${employeeId}`);  // Append the employee ID to the URL
  }
  EditEmployees(emp: {
    Id: string;
    Email: string;
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
    Date: string;
    Gender:string;
    Password: string;
    Role: string;
    Department: string;
  }): Observable<any> 
  {
    return this.http.put(this.UpdateEmployeeURL,emp, {
      headers: { "Content-Type": "application/json", "Authorization":  ` Bearer ${localStorage.getItem('employeeApp')}` }
    });
  }
  createEmployee1(emp: {
    Id: string;
    Email: string;
    FirstName: string;
    LastName: string;
    PhoneNumber: string;
    Date: string;
    Gender:string;
    Password: string;
    Role: string;
    Department: string;
  }): Observable<any> {
    return this.http.post(this.CreateEmp, emp,{
      headers: { "Content-Type": "application/json" } // Ensure JSON format
    });
    }
    createEmployee(newData: Partial<Employee>)
    {
      return this.http.post<Employee>(this.CreateEmp, newData, {
        headers: { "Content-Type": "application/json", "Authorization":  ` Bearer ${localStorage.getItem('employeeApp')}` }
      });
    }
    createEmployee2(emp: { Id: string;
      FirstName: string;
      LastName: string;
      PhoneNumber: string;
      Gender: string;
      Email: string;
      Password: string;
      Date: string;
      Role: string;
      Department: string;}): Observable<Employee> {
      return this.http.post<Employee>(this.CreateEmp, emp, {
        headers: { "Content-Type": "application/json", "Authorization":  ` Bearer ${localStorage.getItem('employeeApp')}` }
      });
    }
    PostProjects(project?: Project):Observable<any>
    {
      return this.http.post(this.projectUrl,project,{ headers:{ "Content-Type" :"application/json"
      }  });
    
    }
    UpdateProjects(project?: Project):Observable<any>
    {
      return this.http.post(this.projectUrl,project,{ headers:{ "Content-Type" :"application/json"
      }  });
    
    }
    getAllProjects(): Observable<any>
    {
      return this.http.get(`${this.url}${this.projectUrl}` ,{ headers:{ "Content-Type" :"application/json"
    }});
}
    getallProjectEmployees(id:String):Observable<any>
    {
      return this.http.get(this.projectUrl,{ headers:{ "Content-Type" :"application/json"
      }});
    }

    DeleteProject(id:string):Observable<any>
    {
       return this.http.delete<void>(`projectDeleteUrl\id`)
}
PostProjectEmployee(projectEmployee : ProjectEmployee):Observable<any>
{
  return this.http.get(this.projectUrl,{ headers:{ "Content-Type" :"application/json"   }});
}

getEmployeesWithPage(page: number, pageSize: number): Observable<PagedResult<Employee>> {
  const params = new HttpParams()
    .set('page', page.toString())
    .set('pageSize', pageSize.toString());

  return this.http.get<PagedResult<Employee>>(this.GetEmpWithPage, { params });
}
}