import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { LayoutComponent } from './Pages/layout/layout.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { EmployeeComponent } from './Pages/employee/employee.component';
import { TimesheetComponent } from './Pages/timesheet/timesheet.component';
import { AccountCreationComponent } from './Pages/account-creation/account-creation.component';
import { TestDropdownComponent } from './test-dropdown/test-dropdown.component';
import { ProjectEmployee } from './Model/ProjectEmployee';
import { ProjectsComponent } from './Pages/projects/projects.component';

export const routes: Routes = [

    {
        path:'',
        redirectTo:'login',
        pathMatch:'full'
    },
    {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'accountCreation',
    component: AccountCreationComponent
  },
    {
        path:'',
        component:LayoutComponent,
        children:[
           
            {
                path:'employee',
                component:EmployeeComponent
            },
            {
                path:'dashboard',
                component:DashboardComponent
            },
            {
                path:'project',
                component:ProjectsComponent
            },
            {
                path:'timeSheets',
                component:TimesheetComponent
            }, {
                path: 'accountCreations',
                component: AccountCreationComponent
              }
         
        ]
    }
];
