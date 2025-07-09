import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JobsService } from 'src/app/Services/Jobs/jobs.service';
import { OsrService } from 'src/app/Services/OSR/osr.service';
import { WebcamImage, WebcamModule } from 'ngx-webcam';
import { every, Observable, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-vehicle-check',
  templateUrl: './vehicle-check.component.html',
  styleUrls: ['./vehicle-check.component.css'],
})
export class VehicleCheckComponent {
  vehicleCheckForm: FormGroup;
  mode: any = 'add';
  GUID: string = '';
  job: any[] = [];
  selectedJobDetailId: any;
  currentDate: Date = new Date();
  clientList: any[] = [];
  vehicleChecklist: any[] = [];
  checklist: string[] = [
    'X2 Sign Cover Bags are in the Cab',
    'Head Lights',
    'Arrow Board if applicable',
    'Beacons (roof & rear)',
    'Brake Lights & Indicators',
    'Handbrake Alarm (Report immediately to manager if not working)',
    'Rear sign present & chevron clean',
    'Mirrors adjusted to suit driver',
    'Vehicle free of visible damage',
  ];

  failedItems: boolean[] = [];
  User: any;
 stream: any = null;
  status: any = null;
  trigger: Subject<void> = new Subject();
  previewImage: string = '';
  buttonLabel: string = 'Capture Image';
  cameraOpen: boolean = false;
  constructor(
    private fb: FormBuilder,
    private osrService: OsrService,
    private jobService: JobsService,
    private route: Router
  ) {
    this.vehicleCheckForm = this.fb.group({
      plateNumber: [''],
      vehicleName: [''],
      comments: [''],
    });
    const navigation = this.route.getCurrentNavigation();
    this.mode = navigation?.extras.state?.['mode'] || {};
    console.log('mode', this.mode);
    this.getJobsByDateRange();
    this.GUID = this.generateGUID();
    console.log(this.GUID);
    if (localStorage.getItem('ClientList')) {
      const clientData = localStorage.getItem('ClientList');
      this.clientList = clientData ? JSON.parse(clientData) : null;
      console.log('Client List:', this.clientList);
    }
     if (localStorage.getItem('User')) {
      const userData = localStorage.getItem('User');
      this.User = userData ? JSON.parse(userData) : null;
      console.log('User:', this.User);
    }
    // Default: all failed
    this.failedItems = Array(this.checklist.length).fill(true);
  }

  toggleFail(index: number) {
    this.failedItems[index] = !this.failedItems[index];
  }

  isFail(index: number): boolean {
    return this.failedItems[index];
  }

  onSubmit() {
    if (this.vehicleCheckForm.invalid) {
      alert('Please fill required fields!');
      return;
    }

    const checklistResponses = this.checklist.map((item, index) => ({
      Guid:this.GUID,
      item: item,
      status: this.failedItems[index] ? 'FAIL' : 'PASS',
    }));
    
    const payload = {
      Guid: this.GUID,
      UserId: this.User?.id,
      Recorded: this.currentDate,
      VehicleRego: this.vehicleCheckForm.value.plateNumber,
      VehicleName: this.vehicleCheckForm.value.vehicleName,
      Comment: this.vehicleCheckForm.value.comments,
      Checks: checklistResponses
    };
    console.log('Submitting payload:', payload);
    // Call your API here:
     this.osrService.syncVehicleCheck(payload).subscribe({
          next: (res) => {
            alert('✅ Vehicle Check Updated successfully!' + res);
            this.vehicleCheckForm.reset();

            const result = {
              success: true,
              message: 'Vehicle Check saved successfully',
            };
          },
          error: (err) => {
            alert('❌ Vehicle Check submission failed!');
            console.error(err);
          },
        });
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
    this.vehicleChecklist = [];
    this.vehicleCheckForm.reset();
    if (this.mode == 'View') {
      // this.fetchSiteTSL(this.selectedJobDetailId);
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
  
}
