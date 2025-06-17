import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { JobsService } from 'src/app/Services/Jobs/jobs.service';
import { TrackingService } from 'src/app/Services/Tracking/tracking.service';

@Component({
  selector: 'app-jobstatus',
  templateUrl: './jobstatus.component.html',
  styleUrls: ['./jobstatus.component.css'],
})
export class JobstatusComponent {
  jobs: any;
  jobDetails: any;
  jobDate: any;
  currentUser: any;
  jobStatusForm: FormGroup;
    User: any;
    userId:string ='';
      currentDate: Date = new Date();
  lastDate: any;
  constructor(
    public route: Router,
    public trackingService: TrackingService,
    private fb: FormBuilder,
    private jobService: JobsService
  ) {
    const navigation = this.route.getCurrentNavigation();
    this.jobs = navigation?.extras.state?.['data'] || {};
    this.jobDetails = navigation?.extras.state?.['jobDetails'] || {};
    this.jobDate = navigation?.extras.state?.['jobDate'] || {};
  this.currentDate = navigation?.extras.state?.['date'] || {};
     this.lastDate = navigation?.extras.state?.['lastdate'] || {};
     if (localStorage.getItem('User')) {
      const userData = localStorage.getItem('User');
      this.User = userData ? JSON.parse(userData) : null;
      console.log('User:', this.User);
this.userId = this.User.userId;
     }
    this.jobStatusForm = this.fb.group({
      jobStatus: ['', Validators.required],
      confirmedInvoice: [false, Validators.required],
      cancellationStatus: ['', Validators.required],
      actionedInvoice: [false, Validators.required],
      calloutStatus: ['', Validators.required],
      actionedcallout: [false, Validators.required],
      notes: ['', Validators.required],
    });
  }

  resetJobStatus() {
    this.jobStatusForm.patchValue({
      jobStatus: '',
      confirmedInvoice: false,
    });
  }

  resetCancellationStatus() {
    this.jobStatusForm.patchValue({
      cancellationStatus: '',
      actionedInvoice: false,
    });
  }

  resetCalloutStatus() {
    this.jobStatusForm.patchValue({
      calloutStatus: '',
      actionedcallout: false,
    });
  }

  submit() {
    const postData = {
      UpdatedJobStatusSignOff: {
        dateId: 1,
        callOutActioned: this.jobStatusForm.value.actionedcallout,
        callOutAfterHours: this.jobStatusForm.value.calloutStatus,
        cancellationStatus: this.jobStatusForm.value.cancellationStatus,
        cancellationStatusActioned: this.jobStatusForm.value.actionedInvoice,
        jobStatus: this.jobStatusForm.value.jobStatus,
        jobStatusActioned: this.jobStatusForm.value.confirmedInvoice,
        note: this.jobStatusForm.value.notes,
        userIdCallOut: this.User.userId,
        userIdCallOutActioned: this.User.userId,
        userIdCancellationStatus: this.User.userId,
        userIdCancellationStatusActioned: this.User.userId,
        userIdJobStatus: this.User.userId,
        userIdJobStatusActioned: this.User.userId,
      },
    };
    this.jobService.updateJobStatusSignOff(postData).subscribe((data) => {
      alert('✅' + 'Sign off successfully!' + data);
      console.log('Event Details', data);
     this.route.navigate(['/job-expand'], {
            state: {
              data: this.jobs,
              date: this.currentDate,
              lastdate: this.lastDate,
              jobDetails: this.jobDetails,
              jobDate: this.jobDate,
            },
          });
    });
  }
}
