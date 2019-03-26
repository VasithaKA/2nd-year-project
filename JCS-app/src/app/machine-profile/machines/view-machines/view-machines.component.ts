import { Component, OnInit } from '@angular/core';
import { MachineService } from '../../../Auth-services/machine.service';
import { AuthService } from 'src/app/Auth-services/auth.service';

@Component({
  selector: 'app-view-machines',
  templateUrl: './view-machines.component.html',
  styleUrls: ['./view-machines.component.css']
})
export class ViewMachinesComponent implements OnInit {

  machines: any;
  userRoles: any;

  constructor(
    private machineService: MachineService,
    private authService: AuthService) { }

  ngOnInit() {
    this.userRoles = this.authService.setuserRole

    this.machineService.getMachine().subscribe(data => {
      this.machines = data.details
    })
  }

}
