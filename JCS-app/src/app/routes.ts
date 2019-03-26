import { Routes } from '@angular/router';
import { MachinesComponent } from './folders/machines/machines.component';
import { JobCardsComponent } from './folders/job-cards/job-cards.component';
import { TechniciansComponent } from './folders/technicians/technicians.component';
import { EmpDetailsComponent } from './folders/emp-details/emp-details.component';
import { TechDetailReportComponent } from './folders/tech-detail-report/tech-detail-report.component';
import { MachineDetailsComponent } from './folders/machine-details/machine-details.component';
import { JobCardDetailsComponent } from './folders/job-card-details/job-card-details.component';
import { RankingReportComponent } from './folders/ranking-report/ranking-report.component';
import { NavComponent } from "./folders/nav/nav.component";
import { AuthGuard } from './Auth-guards/auth.guard';

export const appRoutes: Routes = [
    {
        path:"nav",
        component: NavComponent, canActivate: [AuthGuard]
    },
    {
        path:"machines",
        component: MachinesComponent, canActivate: [AuthGuard]
    },
    {
        path:"machines/:id/:year",
        component: MachineDetailsComponent, canActivate: [AuthGuard]
    },
    {
        path:"jobCards",
        component: JobCardsComponent, canActivate: [AuthGuard]
    },
    {
        path:"jobCards/:id",
        component: JobCardDetailsComponent, canActivate: [AuthGuard]
    },
    {
        path:"Technician",
        component: TechniciansComponent, canActivate: [AuthGuard]
    },
    {
        path: "Employee/:id",
        component: EmpDetailsComponent, canActivate: [AuthGuard]
    },
    {
        path: 'Technician/:id/:year',
        component: TechDetailReportComponent, canActivate: [AuthGuard]
    },
    {
        path:'ranking',
        component: RankingReportComponent, canActivate: [AuthGuard]
    },

];