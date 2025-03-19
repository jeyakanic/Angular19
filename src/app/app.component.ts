import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestDropdownComponent } from "./test-dropdown/test-dropdown.component";
import { EmployeeComponent } from './Pages/employee/employee.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EmployeeAngular19';
}
