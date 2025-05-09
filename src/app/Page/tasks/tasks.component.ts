import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/Services/Jobs/jobs.service';
import { forkJoin } from 'rxjs';
// import { retrocycle } from 'json-cycle';
import { ClientService } from 'src/app/Services/Client/client.service';
import moment from 'moment';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  taskList: any[] = [];
  tasksAssigned:  any[] = [];
  tasksOpen: any[] = [];
  // timeTrackingOptions = TasksService.TimeTrackingOptions;
  loaded: boolean = false;
  // VID_BASIC_USER: string;
  yourTasks = [
    {
      company: "Unison Contracting Services Limited",
      jobId: 20410,
      address: "148 King Edward Street, South Dunedin, Dunedin",
      dateTime: "Thursday 23rd January, 11:08AM",
      taskDetail: "Letter Drop - Oxley Cres - Unison"
    }
  ];

  unassignedTasks = [
    {
      company: "Unison Contracting Services Limited",
      jobId: 20410,
      address: "148 King Edward Street, South Dunedin, Dunedin",
      dateTime: "Thursday 23rd January, 11:08AM",
      taskDetail: "Letter Drop - Oxley Cres - Unison"
    },
    {
      company: "Unison Contracting Services Limited",
      jobId: 20410,
      address: "148 King Edward Street, South Dunedin, Dunedin",
      dateTime: "Thursday 23rd January, 11:08AM",
      taskDetail: "Letter Drop - Oxley Cres - Unison"
    }
  ];

  constructor(public jobsService: JobsService, public clientService: ClientService) {
    this.fetchMyTasks();
  }

  ngOnInit(): void {
    
    forkJoin([
      this.jobsService.getCurrentUser(),
      this.jobsService.getMyTasks(),
    ]).subscribe(([user, tasks]) => {
      // tasks = retrocycle(tasks);

      const orgId = user.organisation.id;
      this.clientService.getAllClients().subscribe((allClients) => {
        // const clientHashTable = this.clientsService.getClientsHashTable(allClients);
        tasks.forEach((task:any) => {
          const clientId = task.job.clientId;
          const principalId = task.job.principalId;
          const entityToBillId = task.job.entityToBillId;
          // task.job.client = this.clientsService.getClientFromHashTable(clientHashTable, clientId);
          // task.job.principal = this.clientsService.getClientFromHashTable(clientHashTable, principalId);
          // task.job.entityToBill = this.clientsService.getClientFromHashTable(clientHashTable, entityToBillId);
        });
        this.tasksAssigned = tasks.filter((t:any) => t.userId);
        this.tasksOpen = tasks.filter((t:any) => !t.userId && moment(t.scheduledTime).isSameOrBefore(moment(), 'day'));
        this.loaded = true;
        console.log("Tasks Assigned:", this.tasksAssigned);
        console.log("Tasks Open:", this.tasksOpen);
        console.log("Tasks:", tasks);
        
      });
    });
  }
  fetchMyTasks() {
    this.jobsService.getMyTasks().subscribe(
      (data) => {
        this.taskList = data;
        // localStorage.setItem ('User', JSON.stringify(this.User));
        console.log('Task List:', this.taskList);
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }

  getTaskLocation(task: any): string {
    if (task.job.jobDetails.length > 0) {
      if (task.date) {
        const jd = task.job.jobDetails.find((jd:any) => jd.jobDetailsId === task.date.jobDetailsId);
        return jd.location || '';
      } else {
        return task.job.jobDetails[0].location || '';
      }
    }
    return '';
  }
}
