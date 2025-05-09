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
const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', redirectTo: '' },
  { path: 'job-expand', component: JobExpandComponent },
  { path: 'location', component: LocationComponent },
  {path: 'create-record-task', component: CreateRecordTaskComponent},
  {path: 'edit-time', component: EditTimeComponent},
  {path: 'edit-equipment', component: EditEquipmentComponent},
  {path: 'client-signof', component: ClientSignofComponent},
  {path: 'tasks', component: TasksComponent},
  // { path: '',   redirectTo: '/dashboard', pathMatch: 'full' }, // redirect to `first-component`
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
