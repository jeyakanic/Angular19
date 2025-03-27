import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TestDropdownComponent } from "./test-dropdown/test-dropdown.component";
import { EmployeeComponent } from './Pages/employee/employee.component';
import { Modal } from 'bootstrap';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'EmployeeAngular19';

    // Declaration area for properties
    @ViewChild('myModal', { read: ElementRef }) modalElement!: ElementRef;
    private modalInstance!: Modal;
}
