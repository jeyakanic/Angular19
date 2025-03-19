import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule ,NgForm,ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-account-creation',
  imports: [FormsModule,CommonModule,RouterModule,ReactiveFormsModule],
  templateUrl: './account-creation.component.html',
  styleUrl: './account-creation.component.css'
})
export class AccountCreationComponent {
  @ViewChild('myForm') myForm1!: NgForm;

  http=inject(HttpClient);
  service=inject(ApiService)
  Message!:string;
  myForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    PhoneNumber: new FormControl('',  Validators.required),//new FormControl(0, [Validators.required, Validators.pattern("^[0-9]*$")]),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
    gender: new FormControl('Female'), // Extra field, but NOT needed in API

  });


  CreateEmployee1() {
    // Check if the form is valid
    if (!this.myForm.valid) {
      console.log('❌ Form is invalid');
      this.Message = 'Please fill all required fields correctly.';
      return; // Prevent further execution if the form is invalid
    }
  
    // Check if passwords match
    if (this.myForm.value.password !== this.myForm.value.confirmPassword) {
      console.log('❌ Password mismatch');
      this.Message = 'Please enter correct password';
      return; // Prevent further execution if passwords don't match
    }
  
    // Map form values to the format expected by the API
    const employeeData = {
      Id: '', // Auto-generate ID
      FirstName: this.myForm.value.firstName!,
      LastName: this.myForm.value.lastName!,
      Email: this.myForm.value.email!,
      PhoneNumber:this.myForm.value.PhoneNumber!,// Number(this.myForm.value.PhoneNumber),
      Password: this.myForm.value.password!,
      confirmPassword:this.myForm.value.password!,
      Gender:this.myForm.value.gender!,
      Date: new Date().toISOString() ,  // Ensure correct date format
    };
  
    // Proceed to API call if all validations are passed
    this.service.accountCreation(employeeData).subscribe(
      (response) => {
        this.Message =response.Message;
        console.log('✅ Employee created successfully:', response);
      },
      (error) => {
        console.error('❌ Error creating employee:', error);
      }
    );
  }
  
  CreateEmployee()
  {
    debugger;
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched(); // 🔥 This ensures validation messages appear if fields are empty
    }
    if (this.myForm.valid) {
      // **Manually map form values to match the API request format**
      if(this.myForm.value.password != this.myForm.value.confirmPassword)
      {
        this.Message="PLease enter correct password";
       console.log("Error");
      }
      const employeeData = {
        Id: '', // Generate a unique GUID for Id
        FirstName: this.myForm.value.firstName!,
        LastName: this.myForm.value.lastName!,
        Email: this.myForm.value.email!,
        PhoneNumber: this.myForm.value.PhoneNumber!,//Number(this.myForm.value.PhoneNumber),
        Password: this.myForm.value.password!,
       // confirmPassword:this.myForm.value.password!,
        Gender:this.myForm.value.gender!,
        Date:  new Date().toISOString().split('T')[0]// new Date().toISOString() // Already converted to string in FormControl
      };

      
    // Call the service to send the request
    this.service.accountCreation(employeeData).subscribe(
      (response) => {
        this.Message = response.message;
        console.log('Employee created successfully:', response);
        resetForm();
      },
      (error) => {
        console.error('Error creating employee:', error);
        resetForm();
      }
    );
 } else {
   console.log('Form is invalid');
 }

}

getControl(controlName: string) {
  return this.myForm.get(controlName);
}


}
function resetForm(this: any) {
  if (this.myForm1) {
 // Resets form values & validation
    this.myForm.reset()
  }
}