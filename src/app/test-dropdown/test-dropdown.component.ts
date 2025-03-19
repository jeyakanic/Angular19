import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
declare global {
  interface Window {
    bootstrap: any;
  }
}
@Component({
  selector: 'app-test-dropdown',
  imports: [CommonModule,RouterModule],
  templateUrl: './test-dropdown.component.html',
  styleUrl: './test-dropdown.component.css'
})

export class TestDropdownComponent implements AfterViewInit {

  ngAfterViewInit(): void {    
    console.log(window.bootstrap);
  }

}