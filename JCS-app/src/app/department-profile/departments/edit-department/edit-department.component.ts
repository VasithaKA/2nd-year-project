import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DepartmentService } from 'src/app/Auth-services/department.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.css']
})
export class EditDepartmentComponent implements OnInit {

  id: any;
  departmentDetails: any;

  constructor(
    private route: ActivatedRoute,
    private departmentService: DepartmentService,
    private location: Location,
    private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    this.departmentService.getDepartmentDetails(this.id).subscribe(data => {
      this.departmentDetails = data.departmentDetails
      this.fillDepartmentDetails()
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

  fillDepartmentDetails() {
    this.department.controls['departmentName'].setValue(this.departmentDetails.departmentName)
  }

  updateDepartmentName(event) {
    event.preventDefault()
    const department = event.target.querySelector('#departmentName').value
    const departmentName = department.trim() ? department.trim().charAt(0).toUpperCase() + department.trim().substr(1).toLowerCase() : '';
    if (this.departmentName.errors === null) {
      this.departmentService.updateDepartment(this.id, departmentName).subscribe(data => {
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
