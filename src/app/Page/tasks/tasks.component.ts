import { Component } from '@angular/core';
import { JobsService } from 'src/app/Services/Jobs/jobs.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {
  taskList: any[] = [];
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

  constructor(public jobsService: JobsService) {
    this.fetchMyTasks();
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
}
