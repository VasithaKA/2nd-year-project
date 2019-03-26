import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Auth-guards/auth.guard';
import { AdminGuard } from './Auth-guards/admin.guard';
import { MachineEdit } from './Auth-guards/machine-edit.guard';

import { AdminComponent } from './employee-profile/admin/admin.component';
import { HomeComponent } from './home-page/home/home.component';
import { LoginComponent } from './home-page/login/login.component';
import { RegisterEmployeeComponent } from './employee-profile/employees/register-employee/register-employee.component';
import { UserProfileComponent } from "./employee-profile/user-profile/user-profile.component";
import { AddMachineComponent } from './machine-profile/machines/add-machine/add-machine.component';
import { ViewMachinesComponent } from './machine-profile/machines/view-machines/view-machines.component';
import { ViewEmployeesComponent } from './employee-profile/employees/view-employees/view-employees.component';
import { LogoutComponent } from './home-page/logout/logout.component';
import { EditEmployeeComponent } from './employee-profile/employees/edit-employee/edit-employee.component';
import { CreateUserTypeComponent } from './employee-profile/employee-types/create-user-type/create-user-type.component';
import { EditUserTypeComponent } from './employee-profile/employee-types/edit-user-type/edit-user-type.component';
import { CreateFaultCategoryComponent } from './machine-profile/machine-faults-categories/create-fault-category/create-fault-category.component';
import { EditFaultCategoryComponent } from './machine-profile/machine-faults-categories/edit-fault-category/edit-fault-category.component';
import { AddFaultComponent } from './machine-profile/machine-faults/add-fault/add-fault.component';
import { EditFaultComponent } from './machine-profile/machine-faults/edit-fault/edit-fault.component';
import { RegisterEmployeeGuard } from './Auth-guards/register-employee.guard';
import { RegisterMachineGuard } from './Auth-guards/register-machine.guard';
import { EmployeesEditGuard } from './Auth-guards/employees-edit.guard';
import { EmployeeTypeAddEditGuard } from './Auth-guards/employee-type-add-edit.guard';
import { DepartmentAddEditGuard } from './Auth-guards/department-add-edit.guard';
import { AddDepartmentComponent } from './department-profile/departments/add-department/add-department.component';
import { EditDepartmentComponent } from './department-profile/departments/edit-department/edit-department.component';
import { SetRolesComponent } from './employee-profile/employee-types/set-roles/set-roles.component';
import { SetRoleGuard } from './Auth-guards/set-role.guard';
import { EditMachineComponent } from './machine-profile/machines/edit-machine/edit-machine.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'homepage', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'profile/:id', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'registerEmployee', component: RegisterEmployeeComponent, canActivate: [RegisterEmployeeGuard] },
  { path: 'registerMachine', component: AddMachineComponent, canActivate: [RegisterMachineGuard] },
  { path: 'employees/edit/:id', component: EditEmployeeComponent, canActivate: [AuthGuard] },
  { path: 'employeess', component: ViewEmployeesComponent, canActivate: [AuthGuard] },
  { path: 'machiness', component: ViewMachinesComponent, canActivate: [AuthGuard] },
  { path: 'machines/edit/:id', component: EditMachineComponent, canActivate: [MachineEdit] },
  { path: 'userType', component: CreateUserTypeComponent, canActivate: [EmployeeTypeAddEditGuard] },
  { path: 'userType/edit/:id', component: EditUserTypeComponent, canActivate: [EmployeeTypeAddEditGuard] },
  { path: 'faultTypeCategory', component: CreateFaultCategoryComponent, canActivate: [AuthGuard] },
  { path: 'faultTypeCategory/edit/:id', component: EditFaultCategoryComponent, canActivate: [AuthGuard] },
  { path: 'fault', component: AddFaultComponent, canActivate: [AuthGuard] },
  { path: 'fault/edit/:id', component: EditFaultComponent, canActivate: [AuthGuard] },
  { path: 'department', component: AddDepartmentComponent, canActivate: [DepartmentAddEditGuard] },
  { path: 'department/edit/:id', component: EditDepartmentComponent, canActivate: [DepartmentAddEditGuard] },
  { path: 'setRoles/:id', component: SetRolesComponent, canActivate: [SetRoleGuard] },
  { path: 'logout', component: LogoutComponent }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
