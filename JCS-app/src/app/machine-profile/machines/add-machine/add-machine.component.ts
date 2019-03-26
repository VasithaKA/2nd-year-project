import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl } from "@angular/forms";
import { MachineService } from '../../../Auth-services/machine.service';
import { map } from 'rxjs/operators';
import { DepartmentService } from 'src/app/Auth-services/department.service';
import { SetRoleService } from 'src/app/Auth-services/set-role.service';

@Component({
  selector: 'app-add-machine',
  templateUrl: './add-machine.component.html',
  styleUrls: ['./add-machine.component.css']
})
export class AddMachineComponent implements OnInit {

  departments: any;
  supervisors: any;

  constructor(
    private setRoleService: SetRoleService,
    private machineService: MachineService,
    private router: Router,
    private departmentService: DepartmentService) { }

  ngOnInit() { 
    this.departmentService.getdepartmentName().subscribe(data => {
      this.departments = data.details
    })
    this.setRoleService.getSupervisors().subscribe(data => {
      this.supervisors = data.supervisors
    })
  }

  form = new FormGroup({
    serialNumber: new FormControl('', Validators.required, this.shouldBeUnique(this.machineService)),
    location: new FormControl('', [
      Validators.required,
      Validators.pattern("[0-9-. ]*")
    ])
  });

  get serialNumber() {
    return this.form.get('serialNumber')
  }

  get location() {
    return this.form.get('location')
  }

  shouldBeUnique(machineService: MachineService) {
    return (control: AbstractControl) => {
      control = control.value.trim()
      return machineService.isUserIdUnique(control).pipe(map(res => {
        return res.unique ? { shouldBeUnique: true } : null;
      }));
    }
  }

  registerMachine(event) {
    event.preventDefault()
    const errors = []
    //const target = event.target
    const serial = event.target.querySelector('#serialNumber').value
    const locate = event.target.querySelector('#location').value
    const departmentId = event.target.querySelector('#departmentId').value
    const supervisorId = event.target.querySelector('#supervisorId').value
    
    const serialNumber = serial.trim()
    const location = locate.trim()

    if (serialNumber.length === 0) {
      errors.push("MachineId is empty")
    }

    if (location.length === 0) {
      errors.push("Department Name is empty")
    }

    if (errors.length > 0) {
      window.alert(errors)
    } else {
      this.machineService.registerMachine(serialNumber, location, departmentId, supervisorId).subscribe(data => {
        if (data.success) {
          this.router.navigate(['machiness'])
          window.alert(data.message)
        } else {
          window.alert(data.message)
        }
        //console.log(data)
      })
    }

  }

}
