import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './Page/dashboard/dashboard.component';
import { JobExpandComponent } from './Page/job-expand/job-expand.component';
import { TasksComponent } from './Page/tasks/tasks.component';
import { LocationComponent } from './Page/location/location.component';
import { CreateRecordTaskComponent } from './Page/create-record-task/create-record-task.component';
const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Default route
  { path: 'dashboard', component: DashboardComponent },
  { path: 'job-expand', component: JobExpandComponent },
  { path: 'tasks', component: TasksComponent },
  { path: 'location', component: LocationComponent },
  {path: 'create-record-task', component: CreateRecordTaskComponent},
  // { path: '',   redirectTo: '/dashboard', pathMatch: 'full' }, // redirect to `first-component`
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
