import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebcamImage, WebcamModule } from 'ngx-webcam';
import { every, Observable, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';

// import { MatDialog } from '@angular/material/dialog';
import { PhotoDialogComponent } from 'src/app/Components/photo-dialog/photo-dialog.component';
@Component({
  selector: 'app-site-inspection',
  templateUrl: './site-inspection.component.html',
  styleUrls: ['./site-inspection.component.css'],
})
export class SiteInspectionComponent {
  formData = {
    role: 'STMS',
    comment: '',
  };
  stream: any = null;
  status: any = null;
  trigger: Subject<void> = new Subject();
  previewImage: string = '';
  buttonLabel: string = 'Capture Image';
  cameraOpen:boolean= false;
  checklist = [
    { label: 'High-visibility garments worn by all?', checked: false },
    { label: 'Signs positioned as per TMP?', checked: false },
    { label: 'Conflicting signs covered?', checked: false },
    { label: 'Correct delineation as per TMP?', checked: false },
    { label: 'Lane widths appropriate?', checked: false },
    { label: 'Appropriate positive TTM used?', checked: false },
    { label: 'Footpath standards met?', checked: false },
    { label: 'Cycle lane standards met?', checked: false },
    { label: 'Traffic flows OK?', checked: false },
    { label: 'Adequate property access?', checked: false },
    { label: 'Briefed and inducted into HS Hazard ID?', checked: false },
    {
      label:
        'Barrier deflection area is clear? (Refer to Barrier design statement)',
      checked: false,
    },
  ];

  constructor() {}

  toggleCheck(index: number): void {
    this.checklist[index].checked = !this.checklist[index].checked;
  }

  submitForm(): void {
    const payload = {
      ...this.formData,
      checklist: this.checklist,
    };
    console.log('Form Submitted:', payload);
    // Add API or service logic here
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
     this.cameraOpen=true;
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

  closeCamera(){
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
