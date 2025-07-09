import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JobsService } from 'src/app/Services/Jobs/jobs.service';
// interface City {
//   id: number;
//   name: string;
// }

interface JobDetail {
  jobDetailId: number;
  location: string;
  jobDates: Date[];
}

interface Job {
  id: number;
  clientId: string;
  jobDetails: JobDetail[];
}

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.css']
})
export class TimesheetComponent implements OnInit {
  locationForm: FormGroup;
  job: Job[] = []; // Populate with your data
  selectedJob: Job | undefined;
  selectedJobDetail: JobDetail | undefined;
  // jobs:any
  // client: any;

  constructor(private fb: FormBuilder, private jobService: JobsService) {
    this.locationForm = this.fb.group({
      client: [''],
      location: [''],
      // city: ['']
    });
  }

  ngOnInit(): void {
    // Load your countries data here
    this.getJobsByDateRange();
  }

  getJobsByDateRange() {
    // let currentDate = this.currentDate.toISOString();
    // let lastDate = this.lastDate;
    const dateRange = {
      StartDate: '2025-02-11T11:00:00.000Z',
      EndDate: '2025-06-18T11:00:00.000Z',
    };
    this.jobService.getJobsByDateRange(dateRange).subscribe((data) => {
      this.job = data;
      console.log('Jobs Details', data);
      this.job = data;
    });
  }

  onClientChange(): void {
    this.selectedJob = this.locationForm.get('client')?.value;
    this.locationForm.get('location')?.setValue(''); // Clear location when client changes
    this.selectedJobDetail = undefined;
  }

  onLocationChange(): void {
    this.selectedJobDetail = this.locationForm.get('location')?.value;
    // this.locationForm.get('city')?.setValue(''); // Clear city when state changes
  }
}
