import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { JobsService } from 'src/app/Services/Jobs/jobs.service';
@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css']
})
export class JobCardComponent {
  jobDetails: any[] = [];
  cachedjobData: any[] = [];

  
constructor(private jobService: JobsService, public router:Router){
  this.getJobsByDateRange();
}

getJobsByDateRange() {
  const dateRange = {
   "StartDate": "2025-02-11T11:00:00.000Z",
  "EndDate": "2025-02-18T11:00:00.000Z"
  };
  this.jobService.getJobsByDateRange(dateRange).subscribe((data) => {
    this.jobDetails.unshift(data);
    console.log('Jobs Details', data);
    this.jobDetails = data;
  });

  this.jobService.getCachedData().subscribe((cached) => {
    this.cachedjobData = cached;
    console.log('Cached Job Data:', this.cachedjobData);
    
  });
}

expandJobs(jobs:string){
  console.log("Navigate to Job Expand Page");
  console.log("Job Details..........",jobs)

  this.router.navigate(['/job-expand'], { state: { data: jobs } });
}
}
