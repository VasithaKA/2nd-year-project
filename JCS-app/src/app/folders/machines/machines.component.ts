import { Component, OnInit } from '@angular/core';
import { MachineService } from '../../services/machine.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-machines',
  templateUrl: './machines.component.html',
  styleUrls: ['./machines.component.css']
})
export class MachinesComponent implements OnInit {
  
  machines:any;

  constructor(private machineService: MachineService, private appRoutes: Router) { }

  ngOnInit() {
    this.machineService.getMachines()
    .subscribe(
      res => {
        this.machines = res,
        console.log(res)
      },
      err => console.log(err)
    )
  }


 /* public gotoMachines(url, id) {
    this.appRoutes.navigate([url, id]).then( (e) => {
      if (e) {
        console.log("Navigation is successful!");
      } else {
        console.log("Navigation has failed!");
      }
    });
}*/

  /*onSelect(item){
    this.appRoutes.navigate(['/machines',item._id]);
  }*/
}
