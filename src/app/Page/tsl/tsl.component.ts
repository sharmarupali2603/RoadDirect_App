import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JobsService } from 'src/app/Services/Jobs/jobs.service';
import { OsrService } from 'src/app/Services/OSR/osr.service';

@Component({
  selector: 'app-tsl',
  templateUrl: './tsl.component.html',
  styleUrls: ['./tsl.component.css'],
})
export class TSLComponent {
  tslForm: FormGroup;
  mode: any = 'add';
  GUID: string = '';
  job: any[] = [];
  selectedJobDetailId: any;
  currentDate: Date = new Date();
  clientList: any[] = [];
  siteTSL: any[] = [];
  constructor(
    private fb: FormBuilder,
    public route: Router,
    private osrService: OsrService,
    private jobService: JobsService
  ) {
    const navigation = this.route.getCurrentNavigation();
    this.mode = navigation?.extras.state?.['mode'] || {};
    console.log('mode', this.mode);
    this.tslForm = this.fb.group({
      installedDate: [''],
      installedTime: [''],
      speed: [''],
      roadName: [''],
      from: [''],
      to: [''],
      length: [''],
      isRemoved: [false],
      removedDate: [''],
      removedTime: [''],
    });
    this.getJobsByDateRange();
    this.GUID = this.generateGUID();
    console.log(this.GUID);
    if (localStorage.getItem('ClientList')) {
      const clientData = localStorage.getItem('ClientList');
      this.clientList = clientData ? JSON.parse(clientData) : null;
      console.log('Client List:', this.clientList);
    }
  }

  submitForm(): void {
    if (this.tslForm.valid) {
      const formData = this.tslForm.value;
      const payload = {
        Guid: this.GUID,
        JobDetailsId: this.selectedJobDetailId,
        PlacementFrom: formData.from,
        PlacementTo: formData.to,
        Speed: formData.speed,
        Length: formData.length,
        RoadName: formData.roadName,
        Recorded: this.currentDate,
        Installed: this.currentDate,
        Removed: null,
      };
      console.log('Form Submitted:', payload);
      this.osrService.syncSiteTSL(payload).subscribe({
        next: (res) => {
          alert('✅ TSL Updated successfully!' + res);
          this.tslForm.reset();

          const result = {
            success: true,
            message: 'TSL saved successfully',
          };
        },
        error: (err) => {
          alert('❌ TSL submission failed!');
          console.error(err);
        },
      });
    }
  }

  generateGUID(): string {
    return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, () => {
      return Math.floor(Math.random() * 16).toString(16);
    });
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

  getClientNamebyID(clientId: any) {
    const client = this.clientList.find((c) => c.clientId == clientId); // Find vehicle by ID
    return client ? client.clientName : String(clientId); // Return ShortName if found, otherwise return the vehicleId as a string
  }

  onSelectionChange(event: any) {
    console.log('Selected value:', this.selectedJobDetailId);
    this.siteTSL = [];
    this.tslForm.reset();
    if (this.mode == 'View') {
      this.fetchSiteTSL(this.selectedJobDetailId);
    }
  }

  fetchSiteTSL(jobDetailsId: any) {
    const payload = {
      jobDetailsId: jobDetailsId,
      pageNumber: 1,
      pageSize: 100,
    };
    console.log('Form Submitted:', payload);
    this.osrService.getSiteTSLs(payload).subscribe({
      next: (res) => {
        const siteTSL = res;
        console.log('Site Inspection Data:', siteTSL);
        for (let i = 0; i < siteTSL.item1.length; i++) {
          this.getSiteTSLById(siteTSL.item1[i].guid);
        }
        // this.getSiteTSLById(siteTSL.item1[0].guid);
      },
      error: (err) => {
        // alert('❌ Task submission failed!');
        console.error(err);
      },
    });
  }

  getSiteTSLById(GUID: string) {
    const queryParams = {
      guid: GUID,
    };

    this.osrService.getSiteTSLById(queryParams).subscribe(
      (response) => {
        //  this.myResponses.push(response);
        this.siteTSL.push(response);
        console.log('siteTSL>>>>>', this.siteTSL);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
