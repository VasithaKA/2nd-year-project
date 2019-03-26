import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MachineService } from 'src/app/Auth-services/machine.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { map } from 'rxjs/operators';
import { SetRoleService } from 'src/app/Auth-services/set-role.service';
import { DepartmentService } from 'src/app/Auth-services/department.service';

@Component({
  selector: 'app-edit-machine',
  templateUrl: './edit-machine.component.html',
  styleUrls: ['./edit-machine.component.css']
})
export class EditMachineComponent implements OnInit {

  id: any;
  machineDetails: any;
  departments: any;
  supervisors: any;

  constructor(
    private route: ActivatedRoute,
    private machineService: MachineService,
    private setRoleService: SetRoleService,
    private router: Router,
    private departmentService: DepartmentService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.machineService.getMachineDetails(this.id).subscribe(data => {
      this.machineDetails = data.details
      this.fillEmployeeDetails()
      this.departmentService.getdepartmentName().subscribe(data => {
        this.departments = data.details
        for (let i = 0; i < this.departments.length; i++) {
          if (this.departments[i]._id == this.machineDetails.departmentId._id) {
            this.departments.splice(i, 1);
          }
        }
        this.departments.splice(0, 0, this.machineDetails.departmentId);
      })

      this.setRoleService.getSupervisors().subscribe(data => {
        this.supervisors = data.supervisors
        for (let i = 0; i < this.supervisors.length; i++) {
          if (this.supervisors[i]._id == this.machineDetails.supervisorId._id) {
            this.supervisors.splice(i, 1);
          }
        }
        this.supervisors.splice(0, 0, this.machineDetails.supervisorId);
      })
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

  fillEmployeeDetails() {
    this.form.controls['serialNumber'].setValue(this.machineDetails.serialNumber);
    this.form.controls['location'].setValue(this.machineDetails.location);
  }

  updateMachine(event) {
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
      this.machineService.updateMachine(this.id, serialNumber, location, departmentId, supervisorId).subscribe(data => {
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
