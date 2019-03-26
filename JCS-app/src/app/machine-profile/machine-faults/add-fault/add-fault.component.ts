import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MachineFaultService } from 'src/app/Auth-services/machine-fault.service';
import { MachineFaultCategoryService } from 'src/app/Auth-services/machine-fault-category.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-fault',
  templateUrl: './add-fault.component.html',
  styleUrls: ['./add-fault.component.css']
})
export class AddFaultComponent implements OnInit {

  faults: any
  categories: any

  constructor(
    private machineFaultService: MachineFaultService,
    private machineFaultCategoryService: MachineFaultCategoryService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    this.machineFaultService.getFault().subscribe(data => {
      this.faults = data.details
    })

    this.machineFaultCategoryService.getFaultCategory().subscribe(data => {
      this.categories = data.details
    })
  }

  goBack(): void {
    this.location.back();
  }

  formFault = new FormGroup({
    faultName: new FormControl('', Validators.required, this.shouldBeUnique(this.machineFaultService))
  })

  get faultName() {
    return this.formFault.get('faultName')
  }

  shouldBeUnique(machineFaultService: MachineFaultService) {
    return (control: AbstractControl) => {
      control = control.value.trim() ? control.value.trim().charAt(0).toUpperCase() + control.value.trim().substr(1).toLowerCase() : '';
      return machineFaultService.isFaultNameUnique(control).pipe(map(res => {
        return (res.unique) ? { shouldBeUnique: true } : null;
      }));
    }
  }

  addFault(event) {
    const errors = []
    event.preventDefault()
    const ftName = event.target.querySelector('#faultName').value
    const faultDescription = event.target.querySelector('#faultDescription').value
    const faultCategoryId = event.target.querySelector('#faultCategoryId').value

    if (ftName.length === 0) {
      errors.push("Fault Name is Required")
    }

    const faultName = ftName.trim() ? ftName.trim().charAt(0).toUpperCase() + ftName.trim().substr(1).toLowerCase() : '';

    if (errors.length === 0) {
      this.machineFaultService.addFault(faultName, faultDescription, faultCategoryId).subscribe(data => {
        if (data.success) {
          this.router.navigate(['fault'])
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