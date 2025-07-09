import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRecordTaskComponent } from './Page/create-record-task/create-record-task.component';
import { DashboardComponent } from './Page/dashboard/dashboard.component';
import { EditEquipmentComponent } from './Page/edit-equipment/edit-equipment.component';
import { EditTimeComponent } from './Page/edit-time/edit-time.component';
import { JobExpandComponent } from './Page/job-expand/job-expand.component';
import { LocationComponent } from './Page/location/location.component';
import { ClientSignofComponent } from './Page/client-signof/client-signof.component';
import { TasksComponent } from './Page/tasks/tasks.component';
import { JobStatusComponent } from './Page/job-status/job-status.component';
import { MenuComponent } from './Components/menu/menu.component';
import { SiteInspectionComponent } from './Page/site-inspection/site-inspection.component';
import { TSLComponent } from './Page/tsl/tsl.component';
import { SiteHandoverComponent } from './Page/site-handover/site-handover.component';
import { JobstatusComponent } from './Page/jobstatus/jobstatus.component';
import { TimesheetComponent } from './Page/timesheet/timesheet.component';
import { VehicleCheckComponent } from './Page/vehicle-check/vehicle-check.component';
import { ToolboxBriefingsComponent } from './Page/toolbox-briefings/toolbox-briefings.component';
const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', redirectTo: '' },
  { path: 'job-expand', component: JobExpandComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'location', component: LocationComponent },
  { path: 'create-record-task', component: CreateRecordTaskComponent },
  { path: 'edit-time', component: EditTimeComponent },
  { path: 'edit-equipment', component: EditEquipmentComponent },
  { path: 'client-signof', component: ClientSignofComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'job-status', component: JobStatusComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'site-inspection', component: SiteInspectionComponent },
  { path: 'tsl', component: TSLComponent },
  { path: 'site-handover', component: SiteHandoverComponent },
  { path: 'jobstatus', component: JobstatusComponent },
  { path: 'timesheet', component: TimesheetComponent },
  { path: 'vehicle-check', component: VehicleCheckComponent },
  { path: 'toolbox-briefings', component: ToolboxBriefingsComponent },
  // { path: '',   redirectTo: '/dashboard', pathMatch: 'full' }, // redirect to `first-component`
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
