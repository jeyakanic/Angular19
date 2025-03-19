import { Component } from '@angular/core';
import { User } from '../../Model/user';
import { FormsModule } from '@angular/forms';
import {  RouterLink, RouterOutlet } from '@angular/router';
import { EmployeeComponent } from '../employee/employee.component';
import { Employee } from '../../Model/Employee';

@Component({
  selector: 'app-layout',
  imports: [FormsModule,RouterOutlet,RouterLink],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {


}
