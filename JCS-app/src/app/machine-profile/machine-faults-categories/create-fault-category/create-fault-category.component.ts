import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { MachineFaultCategoryService } from 'src/app/Auth-services/machine-fault-category.service';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-fault-category',
  templateUrl: './create-fault-category.component.html',
  styleUrls: ['./create-fault-category.component.css']
})
export class CreateFaultCategoryComponent implements OnInit {

  categories: any

  constructor(
    private machineFaultCategoryService: MachineFaultCategoryService,
    private location: Location,
    private router: Router) { }

  ngOnInit() {
    this.machineFaultCategoryService.getFaultCategory().subscribe(data => {
      this.categories = data.details
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

  addFaultCategory(event) {
    const errors = []
    event.preventDefault()
    const faultCategory = event.target.querySelector('#faultCategoryName').value
    const faultCategoryName = faultCategory.trim() ? faultCategory.trim().charAt(0).toUpperCase() + faultCategory.trim().substr(1).toLowerCase() : '';
    if(faultCategoryName.length === 0){
      errors.push("Fault Category Name is Required")
    }
    if (errors.length === 0 && this.faultCategoryName.errors === null) {
      this.machineFaultCategoryService.addFaultCategory(faultCategoryName).subscribe(data => {
        if (data.success) {
          this.router.navigate(['faultTypeCategory'])
          window.alert(data.message)
          this.ngOnInit()
        } else {
          window.alert(data.message)
        }
      })
    } else {
      window.alert(errors)
    }
  }

}
