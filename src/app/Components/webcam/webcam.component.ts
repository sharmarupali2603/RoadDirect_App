import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { WebcamImage, WebcamInitError } from 'ngx-webcam';
import { MatDialogRef } from '@angular/material/dialog';
import { WebcamModule } from 'ngx-webcam';
@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.css'],
})
export class WebcamComponent {
  private trigger: Subject<void> = new Subject<void>();
  stream: any = null;
  status: any = null;
  // trigger:Subject<void>=new Subject();
  previewImage: string = '';
  buttonLabel: string = 'Capture Image';
  public triggerObservable: Observable<void> = this.trigger.asObservable();

  constructor(private dialogRef: MatDialogRef<WebcamComponent>) {}

  triggerSnapshot(): void {
    this.trigger.next();
  }

  handleImage(webcamImage: WebcamImage): void {
    localStorage.setItem('photo', webcamImage.imageAsDataUrl);
    this.dialogRef.close();
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
}
