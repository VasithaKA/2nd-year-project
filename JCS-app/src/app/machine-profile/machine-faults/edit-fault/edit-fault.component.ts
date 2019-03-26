import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MachineFaultService } from 'src/app/Auth-services/machine-fault.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { MachineFaultCategoryService } from 'src/app/Auth-services/machine-fault-category.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-fault',
  templateUrl: './edit-fault.component.html',
  styleUrls: ['./edit-fault.component.css']
})
export class EditFaultComponent implements OnInit {

  id: any
  fault: any
  categories: any

  constructor(
    private location: Location,
    private machineFaultService: MachineFaultService,
    private machineFaultCategoryService: MachineFaultCategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id')
    this.machineFaultService.getFaultDetails(this.id).subscribe(data => {
      this.fault = data.faultDetails;
      this.fillFaultDetails();
      this.machineFaultCategoryService.getFaultCategory().subscribe(data => {
        this.categories = data.details;
        for (let i = 0; i < this.categories.length; i++) {
          if (this.categories[i]._id == this.fault.faultCategoryId._id) {
            this.categories.splice(i, 1);
          }
        }
        this.categories.splice(0, 0, this.fault.faultCategoryId);
      })
    })
  }

  goBack(): void {
    this.location.back();
  }

  formFault = new FormGroup({
    faultName: new FormControl('', Validators.required, this.shouldBeUnique(this.machineFaultService)),
    faultDescription: new FormControl('')
  })

  get faultName() {
    return this.formFault.get('faultName')
  }

  get faultDescription() {
    return this.formFault.get('faultDescription')
  }

  shouldBeUnique(machineFaultService: MachineFaultService) {
    return (control: AbstractControl) => {
      return machineFaultService.isFaultNameUnique(control.value).pipe(map(res => {
        return (res.unique && this.fault.faultName != control.value) ? { shouldBeUnique: true } : null;
      }));
    }
  }

  fillFaultDetails(){
    this.formFault.controls['faultName'].setValue(this.fault.faultName)
    this.formFault.controls['faultDescription'].setValue(this.fault.faultDescription)
  }

  updateFault(event) {
    const errors = []
    event.preventDefault()
    const faultName = event.target.querySelector('#faultName').value
    const faultDescription = event.target.querySelector('#faultDescription').value
    const faultCategoryId = event.target.querySelector('#faultCategoryId').value

    if (faultName.length === 0) {
      errors.push("Fault Name is Required")
    }

    if (errors.length === 0) {
      this.machineFaultService.updateFault(this.id,faultName, faultDescription, faultCategoryId).subscribe(data => {
        if (data.success) {
          this.router.navigate(['fault'])
          window.alert(data.message)
        } else {
          window.alert(data.message)
        }
      })
    } else {
      window.alert(errors)
    }
  }

  deleteFault() {
    this.machineFaultService.deleteFault(this.id).subscribe(data => {
      if (data.success) {
        this.router.navigate(['fault'])
        window.alert("Fault has been deleted")
      } else {
        window.alert(data.message)
      }
    })
  }

}
