import { Component, OnInit } from '@angular/core';
import { MachineFaultCategoryService } from 'src/app/Auth-services/machine-fault-category.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-fault-category',
  templateUrl: './edit-fault-category.component.html',
  styleUrls: ['./edit-fault-category.component.css']
})
export class EditFaultCategoryComponent implements OnInit {

  id: any
  faultCategory: any

  constructor(
    private location: Location,
    private machineFaultCategoryService: MachineFaultCategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    this.machineFaultCategoryService.getFaultCategoryDetails(this.id).subscribe(data => {
      this.faultCategory = data.faultCategoryDetails
      this.fillFaultCategoryDetails()
    })
  }

  goBack(): void {
    this.location.back();
  }

  formFaultCategory = new FormGroup({
    faultCategoryName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern("[a-zA-Z ]*")
    ], this.shouldBeUnique(this.machineFaultCategoryService))
  })

  get faultCategoryName() {
    return this.formFaultCategory.get('faultCategoryName')
  }

  shouldBeUnique(machineFaultCategoryService: MachineFaultCategoryService){
    return (control: AbstractControl) => {
      control = control.value.trim() ? control.value.trim().charAt(0).toUpperCase() + control.value.trim().substr(1).toLowerCase() : '';
      return machineFaultCategoryService.isFaultCategoryNameUnique(control).pipe(map(res => {
        return (res.unique) ? { shouldBeUnique: true } : null;
      }));
    }
  }

  fillFaultCategoryDetails() {
    this.formFaultCategory.controls['faultCategoryName'].setValue(this.faultCategory.faultCategoryName)
  }

  updateFaultCategory(event) {
    const errors = []
    event.preventDefault()
    const faultCategory= event.target.querySelector('#faultCategoryName').value
    const faultCategoryName = faultCategory.trim() ? faultCategory.trim().charAt(0).toUpperCase() + faultCategory.trim().substr(1).toLowerCase() : '';

    if (faultCategoryName.length === 0) {
      errors.push("Fault Category Name is Required")
    }

    if (errors.length === 0 && this.faultCategoryName.errors === null) {
      this.machineFaultCategoryService.updateFaultCategory(this.id, faultCategoryName).subscribe(data => {
        if (data.success) {
          this.router.navigate(['faultTypeCategory'])
          window.alert(data.message)
        } else {
          window.alert(data.message)
        }
      })
    } else {
      window.alert(errors)
    }
  }

  deleteFaultCategory() {
    this.machineFaultCategoryService.deleteFaultCategory(this.id).subscribe(data => {
      if (data.success) {
        this.router.navigate(['faultTypeCategory'])
        window.alert("Category has been deleted")
      } else {
        window.alert(data.message)
      }
    })
  }

}
