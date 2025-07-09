import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { WebcamImage, WebcamModule } from 'ngx-webcam';
import { every, Observable, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';

// import { MatDialog } from '@angular/material/dialog';
import { PhotoDialogComponent } from 'src/app/Components/photo-dialog/photo-dialog.component';
import { OsrService } from 'src/app/Services/OSR/osr.service';
import { log } from 'console';
import { JobsService } from 'src/app/Services/Jobs/jobs.service';
@Component({
  selector: 'app-site-inspection',
  templateUrl: './site-inspection.component.html',
  styleUrls: ['./site-inspection.component.css'],
})
export class SiteInspectionComponent {
  formData = {
    role: 'STMS',
    comment: '',
    hazards: '',
  };
  stream: any = null;
  status: any = null;
  trigger: Subject<void> = new Subject();
  previewImage: string = '';
  buttonLabel: string = 'Capture Image';
  cameraOpen: boolean = false;
  // formData = {
  //     role: 'STMS',
  //     comment: '',
  //   };
  GUID: string = '';
  siteInspection: any[] = [];
  currentDate: Date = new Date();
  checklist: {
    criterion: string;
    description: 'YES' | 'NO' | 'N/A';
    value: number | null;
  }[] = [
    {
      criterion: 'High-visibility garments worn by all?',
      description: 'NO',
      value: 0,
    },
    { criterion: 'Signs positioned as per TMP?', description: 'NO', value: 0 },
    { criterion: 'Conflicting signs covered?', description: 'NO', value: 0 },
    {
      criterion: 'Correct delineation as per TMP?',
      description: 'NO',
      value: 0,
    },
    { criterion: 'Lane widths appropriate?', description: 'NO', value: 0 },
    {
      criterion: 'Appropriate positive TTM used?',
      description: 'NO',
      value: 0,
    },
    { criterion: 'Footpath standards met?', description: 'NO', value: 0 },
    { criterion: 'Cycle lane standards met?', description: 'NO', value: 0 },
    { criterion: 'Traffic flows OK?', description: 'NO', value: 0 },
    { criterion: 'Adequate property access?', description: 'NO', value: 0 },
    {
      criterion: 'Briefed and inducted into HS Hazard ID?',
      description: 'NO',
      value: 0,
    },
    {
      criterion:
        'Barrier deflection area is clear? (Refer to Barrier design statement)',
      description: 'NO',
      value: 0,
    },
  ];
  mode: any = 'add';
  latitude: number | null = null;
  longitude: number | null = null;
  error: string | null = null;
  jobs: any;
  jobDetails: any;
  jobDate: any;
  clientId: any;
  lastDate: any;
  job: any[] = [];
  clientList: any[] = [];
  toggleCheck(index: number): void {
    const current = this.checklist[index].description;
    let nextStatus: 'YES' | 'NO' | 'N/A';
    let mappedValue: number | null;

    if (current === 'NO') {
      nextStatus = 'YES';
      mappedValue = 1;
    } else if (current === 'YES') {
      nextStatus = 'N/A';
      mappedValue = null;
    } else {
      nextStatus = 'NO';
      mappedValue = 0;
    }

    this.checklist[index].description = nextStatus;
    this.checklist[index].value = mappedValue;
  }
  selectedJobDetailId: any;
  constructor(
    public osrService: OsrService,
    public route: Router,
    public jobService: JobsService
  ) {
    const navigation = this.route.getCurrentNavigation();
    this.mode = navigation?.extras.state?.['mode'] || {};
    this.jobs = navigation?.extras.state?.['data'] || {};
    console.log('Job>>>>>>>>>>>', this.jobs);
    this.currentDate = navigation?.extras.state?.['date'] || {};
    this.lastDate = navigation?.extras.state?.['lastdate'] || {};
    this.jobDetails = navigation?.extras.state?.['jobDetails'] || {};
    this.jobDate = navigation?.extras.state?.['jobDate'] || {};
    this.clientId = navigation?.extras.state?.['clientID'] || {};
    console.log('mode', this.mode);

    if (localStorage.getItem('ClientList')) {
      const clientData = localStorage.getItem('ClientList');
      this.clientList = clientData ? JSON.parse(clientData) : null;
      console.log('Client List:', this.clientList);
    }
    if (this.mode == 'View') {
      this.fetchSiteInspectionData();
    }
    this.getJobsByDateRange();
    this.getCurrentLocation();
    this.GUID = this.generateGUID();
    console.log(this.GUID);
  }

  submitForm(): void {
    if (this.formData.comment || this.formData.hazards || this.checklist) {
      const Checks = this.checklist.map((item) => ({
        Guid: this.GUID,
        Criterion: item.criterion,
        Value: item.value, // 1, 0, or null
      }));
      console.log('this.formData.role', this.formData.role);
      const payload = {
        Guid: this.GUID,
        JobDetailsId: this.selectedJobDetailId,
        Checks: Checks,
        InspectionType: 0,
        Comment: this.formData.comment,
        Hazards: this.formData.hazards,
        RoadName: 'Test Street',
        HouseNumbers: '1a - 9z',
        Suburb: 'Fakesville',
        IsUserInCharge: 0,
        Recorded: this.currentDate,
        Position: {
          latitude: -35.40591562860775,
          longitude: 173.80351316165394,
        },
      };
      console.log('Form Submitted:', payload);
      this.osrService.syncSiteInspection(payload).subscribe({
        next: (res) => {
          alert('✅ Task Updated successfully!' + res);
          // this.taskForm.reset();

          const result = {
            success: true,
            message: 'Task saved successfully',
          };
          // localStorage.setItem('TaskId', res);
          // this.route.navigate(['/job-expand'], {
          //   state: {
          //     data: this.jobs,
          //     date: this.currentDate,
          //     lastdate: this.lastDate,
          //     jobDetails: this.jobDetails,
          //     jobDate: this.jobDate,
          //   },
          // });
        },
        error: (err) => {
          alert('❌ Task submission failed!');
          console.error(err);
        },
      });
    }
  }

  openCamera() {
    // const dialogRef = this.dialog.open(PhotoDialogComponent);
  }

  get $trigger(): Observable<void> {
    return this.trigger.asObservable();
  }

  snapshot(event: WebcamImage) {
    console.log(event);
    this.previewImage = event.imageAsDataUrl;
    this.buttonLabel = 'Re Capture Image';
  }
  
  checkPermission() {
    console.log('Checking camera permission...');

    navigator.mediaDevices
      .getUserMedia({
        video: {
          width: 500,
          height: 400,
        },
      })
      .then((res) => {
        console.log('response,', res);
        this.stream = res;
        this.status = 'Camera is accessing';
        this.buttonLabel = 'Capture Image';
      })
      .catch((err) => {
        console.log('error,', err);
        this.status = err;
        if (err?.message == 'Permission denied') {
          this.status =
            'Permission denied please try again by approving the camera access.';
        } else {
          this.status =
            'You may not having camera in your device. Please try again....';
        }
      });
  }

  captureImage() {
    this.trigger.next();
  }

  takePhoto() {
    console.log('Taking photo...');

    this.checkPermission();
    this.cameraOpen = true;
    // this.dialogRef.close();
    // this.dialog.open(WebcamComponent);
  }

  uploadPhoto() {
    document.querySelector<HTMLInputElement>('input[type="file"]')?.click();
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      localStorage.setItem('photo', reader.result as string);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  closeCamera() {
    this.cameraOpen = false;
    this.stream?.getTracks().forEach((track: any) => {
      track.stop();
    });
    this.stream = null;
    this.status = null;
    this.previewImage = '';
    this.buttonLabel = 'Capture Image';
  }

  generateGUID(): string {
    return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, () => {
      return Math.floor(Math.random() * 16).toString(16);
    });
  }

  fetchSiteInspectionData() {
    const payload = {
      jobDetailsId: this.selectedJobDetailId,
      pageNumber: 1,
      pageSize: 100,
    };
    console.log('Form Submitted:', payload);
    this.osrService.getSiteInspections(payload).subscribe({
      next: (res) => {
        const siteInspection = res;
        console.log('Site Inspection Data:', siteInspection);
        this.getSiteInspectionById(siteInspection.item1[0].guid);
      },
      error: (err) => {
        // alert('❌ Task submission failed!');
        console.error(err);
      },
    });
  }

  getSiteInspectionById(GUID: string) {
    const queryParams = {
      guid: GUID,
    };

    this.osrService.getSiteInspectionById(queryParams).subscribe(
      (response) => {
        this.siteInspection = response;

        console.log('siteInspection>>>>>', this.siteInspection);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.latitude = position.coords.latitude;
          this.longitude = position.coords.longitude;

          console.log('Current Position:', this.latitude, this.longitude);
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              this.error = 'Permission Denied';
              break;
            case error.POSITION_UNAVAILABLE:
              this.error = 'Position Unavailable';
              break;
            case error.TIMEOUT:
              this.error = 'Request Timeout';
              break;
            default:
              this.error = 'Unknown Error';
              break;
          }
        }
      );
    } else {
      this.error = 'Geolocation is not supported by this browser.';
    }
  }

  back() {
    this.route.navigate(['/job-expand'], {
      state: {
        data: this.jobs,
        date: this.currentDate,
        lastdate: this.lastDate,
        jobDetails: this.jobDetails,
        jobDate: this.jobDate,
      },
    });
    console.log('Back to job expand');
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
    if (this.mode == 'View') {
      this.fetchSiteInspectionData();
    }
  }
}
