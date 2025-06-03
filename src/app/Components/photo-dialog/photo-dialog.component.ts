import { Component } from '@angular/core';

import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { WebcamComponent } from '../webcam/webcam.component';
@Component({
  selector: 'app-photo-dialog',
  templateUrl: './photo-dialog.component.html',
  styleUrls: ['./photo-dialog.component.css']
})
export class PhotoDialogComponent {
 constructor(
    public dialogRef: MatDialogRef<PhotoDialogComponent>,
    private dialog: MatDialog
  ) {}

  takePhoto() {
    this.dialogRef.close();
    this.dialog.open(WebcamComponent);
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
}
