import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { ImageCropperModule } from 'ngx-image-cropper';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';

import { AppComponent } from './app.component';
import { LoginComponent } from './home-page/login/login.component';
import { AdminComponent } from './employee-profile/admin/admin.component';
import { HomeComponent } from './home-page/home/home.component';
import { AppRoutingModule } from './/app-routing.module';
import { RegisterEmployeeComponent } from './employee-profile/employees/register-employee/register-employee.component';
import { UserProfileComponent } from './employee-profile/user-profile/user-profile.component';
import { ViewMachinesComponent } from './machine-profile/machines/view-machines/view-machines.component';
import { AddMachineComponent } from './machine-profile/machines/add-machine/add-machine.component';
import { ViewEmployeesComponent } from './employee-profile/employees/view-employees/view-employees.component';
import { LogoutComponent } from './home-page/logout/logout.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EditEmployeeComponent } from './employee-profile/employees/edit-employee/edit-employee.component';
import { CreateUserTypeComponent } from './employee-profile/employee-types/create-user-type/create-user-type.component';
import { EditUserTypeComponent } from './employee-profile/employee-types/edit-user-type/edit-user-type.component';
import { CreateFaultCategoryComponent } from './machine-profile/machine-faults-categories/create-fault-category/create-fault-category.component';
import { EditFaultCategoryComponent } from './machine-profile/machine-faults-categories/edit-fault-category/edit-fault-category.component';
import { AddFaultComponent } from './machine-profile/machine-faults/add-fault/add-fault.component';
import { EditFaultComponent } from './machine-profile/machine-faults/edit-fault/edit-fault.component';
import { AddDepartmentComponent } from './department-profile/departments/add-department/add-department.component';
import { EditDepartmentComponent } from './department-profile/departments/edit-department/edit-department.component';
import { SetRolesComponent } from './employee-profile/employee-types/set-roles/set-roles.component';
import { EditMachineComponent } from './machine-profile/machines/edit-machine/edit-machine.component';

import { NavComponent } from "./folders/nav/nav.component";
import { appRoutes } from './routes';
import { EmployeesComponent } from './folders/employees/employees.component';
import { MachinesComponent } from './folders/machines/machines.component';
import { JobCardsComponent } from './folders/job-cards/job-cards.component';
import { TechDetailReportComponent } from './folders/tech-detail-report/tech-detail-report.component';
import { EmpDetailsComponent } from './folders/emp-details/emp-details.component';
import { TechniciansComponent } from './folders/technicians/technicians.component';
import { MachineService } from './services/machine.service';
import { CommonModule } from '@angular/common';
import { MachineDetailsComponent } from './folders/machine-details/machine-details.component';
import { TechnicianService } from './services/technician.service';
import { JobService } from './services/job.service';
import { JobCardDetailsComponent } from './folders/job-card-details/job-card-details.component';
import { EmployeesService } from './services/employees.service';
import { RankingReportComponent } from './folders/ranking-report/ranking-report.component';
import { RankingService } from './services/ranking.service';
import { RankComponent } from './folders/rank/rank.component';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ImageCropperModule,
    RouterModule.forRoot(appRoutes),
    CommonModule,
    ChartsModule
  ],

  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    HomeComponent,
    RegisterEmployeeComponent,
    UserProfileComponent,
    ViewMachinesComponent,
    AddMachineComponent,
    ViewEmployeesComponent,
    LogoutComponent,
    NavbarComponent,
    EditEmployeeComponent,
    CreateUserTypeComponent,
    EditUserTypeComponent,
    CreateFaultCategoryComponent,
    EditFaultCategoryComponent,
    AddFaultComponent,
    EditFaultComponent,
    AddDepartmentComponent,
    EditDepartmentComponent,
    SetRolesComponent,
    EditMachineComponent,

    EmployeesComponent,
    MachinesComponent,
    JobCardsComponent,
    TechDetailReportComponent,
    EmpDetailsComponent,
    TechniciansComponent,
    MachineDetailsComponent,
    JobCardDetailsComponent,
    RankingReportComponent,
    RankComponent,
    NavComponent
  ],
  providers: [MachineService, TechnicianService, JobService, EmployeesService, RankingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
