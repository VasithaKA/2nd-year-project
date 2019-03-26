import { Component, OnInit } from '@angular/core';
import { DepartmentService } from 'src/app/Auth-services/department.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Location } from '@angular/common';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css']
})
export class AddDepartmentComponent implements OnInit {

  departments: any;

  constructor(private departmentService: DepartmentService,
    private location: Location,
    private router: Router) { }

  ngOnInit() {
    this.departmentService.getdepartmentName().subscribe(data => {
      this.departments = data.details
    })
  }

  goBack(): void {
    this.location.back();
  }

  department = new FormGroup({
    departmentName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.pattern("[a-zA-Z ]*")
    ], this.shouldBeUnique(this.departmentService))
  })

  get departmentName() {
    return this.department.get('departmentName')
  }

  shouldBeUnique(departmentService: DepartmentService){
    return (control: AbstractControl) => {
      control = control.value.trim() ? control.value.trim().charAt(0).toUpperCase() + control.value.trim().substr(1).toLowerCase() : '';
      return departmentService.isdepartmentName(control).pipe(map(res => {
        return res.unique ? { shouldBeUnique: true } : null;
      }));
    }
  }

  addDepartmentName(event) {
    event.preventDefault()
    const department = event.target.querySelector('#departmentName').value
    const departmentName = department.trim() ? department.trim().charAt(0).toUpperCase() + department.trim().substr(1).toLowerCase() : '';
    if (this.departmentName.errors === null) {
      this.departmentService.addDepartment(departmentName).subscribe(data => {
        if (data.success) {
          this.router.navigate(['department'])
          window.alert(data.message)
          this.ngOnInit()
        } else {
          window.alert(data.message)
        }
      })
    } else {
      window.alert(this.departmentName)
    }
  }

}
