import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { TrackingService } from 'src/app/Services/Tracking/tracking.service';

@Component({
  selector: 'app-job-status',
  templateUrl: './job-status.component.html',
    styleUrls: ['./job-status.component.css'],
})
export class JobStatusComponent {
  jobStatusOptions: string[] = [
    'Job Completely Finished',
    'Job Ongoing - Dates Confirmed with Client',
    'Dry Job Becoming Dry Hire (handover completed)',
    'Job Ongoing - Dates TBC'
  ];

  cancellationStatusOptions: string[] = [
    'Job Cancelled While You Were At Base',
    'Job Cancelled After Left Base'
  ];

  selectedJobStatus: string = '';
  selectedCancelStatus: string = '';
  wasCalloutJob: boolean = false;

  jobs: any;
  jobDetails: any;
  jobDate: any;
constructor(
     private fb: FormBuilder,
     private http: HttpClient,
     public route: Router,
     public trackingService: TrackingService
   ) {
   
     const navigation = this.route.getCurrentNavigation();
     this.jobs = navigation?.extras.state?.['data'] || {};
     console.log('Job>>>>>>>>>>>', this.jobs);
    //  this.currentDate = navigation?.extras.state?.['date'] || {};
    //  this.lastDate = navigation?.extras.state?.['lastdate'] || {};
     this.jobDetails = navigation?.extras.state?.['jobDetails'] || {};
      console.log('jobDetails>>>>>>>>>>>', this.jobDetails);
     this.jobDate = navigation?.extras.state?.['jobDate'] || {};
     console.log('jobDate>>>>>>>>>>>', this.jobDate);
   }
  resetJobStatus() {
    this.selectedJobStatus = '';
  }

  resetCancelStatus() {
    this.selectedCancelStatus = '';
  }
onSubmit(){}
  cancel(){}
}
