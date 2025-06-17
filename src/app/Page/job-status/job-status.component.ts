import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TrackingService } from 'src/app/Services/Tracking/tracking.service';

@Component({
  selector: 'app-job-status',
  templateUrl: './job-status.component.html',
  styleUrls: ['./job-status.component.css']
})
export class JobStatusComponent implements OnInit {
  jobStatusForm!: FormGroup;

  jobStatusOptions = [
    'Job Completely Finished',
    'Job Ongoing - Dates Confirmed with Client (RSA)',
    'Dry Job',
    'Becoming Dry Hire (handover completed)',
    'Job Ongoing - Dates TBC'
  ];

  cancellationStatusOptions = [
    'Job Cancelled While You Were At Base (RSA)',
    'Job Cancelled After Left Base'
  ];

  calloutStatusOptions = [
    'Was this a Call Out Job? (RSA)'
  ];

  jobs: any;
  jobDetails: any;
  jobDate: any;
  currentUser: any;

  constructor(
    private fb: FormBuilder,
    public route: Router,
    public trackingService: TrackingService
  ) {
    const navigation = this.route.getCurrentNavigation();
    this.jobs = navigation?.extras.state?.['data'] || {};
    this.jobDetails = navigation?.extras.state?.['jobDetails'] || {};
    this.jobDate = navigation?.extras.state?.['jobDate'] || {};
  }

  ngOnInit(): void {
 this.jobStatusForm = this.fb.group({
  jobStatus: new FormControl<string | null>(null),
  confirmedInvoice: new FormControl<boolean>(false),
  cancellationStatus: new FormControl<string | null>(null),
  cancellationActioned: new FormControl<boolean>(false),
  calloutStatus: new FormControl<string | null>(null),
  calloutActioned: new FormControl<boolean>(false),
});

    // Reset confirmedInvoice if jobStatus changes
    this.jobStatusForm.get('jobStatus')?.valueChanges.subscribe(val => {
      if (val !== 'Job Ongoing - Dates Confirmed with Client (RSA)') {
        this.jobStatusForm.patchValue({
          confirmedInvoice: false
        });
      }
    });
  }

  resetJobStatus() {
    this.jobStatusForm.patchValue({
      jobStatus: '',
      confirmedInvoice: false
    });
  }

  resetCancellationStatus() {
    this.jobStatusForm.patchValue({
      cancellationStatus: '',
      cancellationActioned: false
    });
  }

  resetCalloutStatus() {
    this.jobStatusForm.patchValue({
      calloutStatus: '',
      calloutActioned: false
    });
  }
}
