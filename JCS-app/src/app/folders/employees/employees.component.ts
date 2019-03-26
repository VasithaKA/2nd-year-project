import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { EmployeesService } from '../../services/employees.service';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  
  employeeTypes:any;

  constructor(private technicianService:EmployeesService,  private appRoutes: Router) { }

  ngOnInit() {
    this.technicianService.getEmpTypes()
    .subscribe(
      res => this. employeeTypes = res,
      err => console.log(err)
    )
  }


}
