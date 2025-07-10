import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import SignaturePad from 'signature_pad';
@Component({
  selector: 'app-toolbox-briefings',
  templateUrl: './toolbox-briefings.component.html',
  styleUrls: ['./toolbox-briefings.component.css'],
})
export class ToolboxBriefingsComponent implements AfterViewInit {
  selectedTab = 'hazards';
  hazard: string = '';
  controls: string = '';
  selectedHazard: string = '';
  attendeeName: string = '';
  attendeePhone: string = '';
  @ViewChild('canvas', { static: false })
  signatureCanvas!: ElementRef<HTMLCanvasElement>;
  canvas!: HTMLCanvasElement;
  signaturePad!: SignaturePad;
  signaturePadOptions: Object = {
    minWidth: 1,
    canvasWidth: 300,
    canvasHeight: 100,
  };
  GUID: string = '';
  private ctx!: CanvasRenderingContext2D;
  private drawing = false;
  isSignatureEmpty = true;

  selectTab(event: Event, tab: string) {
    event.preventDefault(); // Prevent the default anchor behavior
    this.selectedTab = tab;
  }

  saveHazard() {
    console.log('Hazard:', this.hazard);
    console.log('Controls:', this.controls);
    // Save logic here

    // Close the modal programmatically if needed
    const modal = document.getElementById('addHazardModal');
    if (modal) {
      // @ts-ignore
      const modalInstance = (window as any).bootstrap?.Modal.getInstance(modal);
      modalInstance?.hide();
    }

    // Clear form
    this.hazard = '';
    this.controls = '';
  }
  loadSelectedHazard() {
    console.log('Loading Hazard:', this.selectedHazard);

    // Do something with the selected hazard...

    // Close modal programmatically (optional)
    const modalEl = document.getElementById('loadHazardModal');
    if (modalEl) {
      // @ts-ignore
      const modalInstance = (window as any).bootstrap?.Modal.getInstance(
        modalEl
      );
      modalInstance?.hide();
    }
  }

  ngAfterViewInit() {
    // this.signaturePad.clear();
    this.getSignatureCanvas();
    // this.signaturePad is now available
    this.signaturePadOptions = { ...this.signaturePadOptions, minWidth: 5 }; // update options at runtime
  }

  private getSignatureCanvas() {
    //set up signature stuff
    this.canvas = this.signatureCanvas.nativeElement;
    this.signaturePad = new SignaturePad(this.canvas, {
      // It's Necessary to use an opaque color when saving image as JPEG;
      // this option can be omitted if only saving as PNG or SVG
      backgroundColor: 'rgb(255, 255, 255)',
    });
  }

  drawComplete() {
    this.isSignatureEmpty = this.signaturePad.isEmpty();
  }

  clearSignature() {
    this.signaturePad.clear();
    this.isSignatureEmpty = true;
  }

  onCancel() {
    this.clearSignature();
  }

  saveAttendee() {
    // const signatureData = this.signaturePad.nativeElement.toDataURL();
    console.log('Name:', this.attendeeName);
    console.log('Phone:', this.attendeePhone);
    // console.log('Signature Data URL:', signatureData);

    // Save logic here...

    this.clearFields();
    this.closeModal();
  }

  clearFields() {
    this.attendeeName = '';
    this.attendeePhone = '';
    this.clearSignature();
  }

  closeModal() {
    const modalEl = document.getElementById('addAttendeeModal');
    if (modalEl) {
      // @ts-ignore
      const modalInstance = (window as any).bootstrap?.Modal.getInstance(
        modalEl
      );
      modalInstance?.hide();
    }
  }

  ngOnInit() {
    // this.attachSignatureEvents();
  }

  // attachSignatureEvents() {
  //   const canvas = this.signaturePad.nativeElement;

  //   canvas.addEventListener('mousedown', (e) => {
  //     this.drawing = true;
  //     this.ctx.beginPath();
  //     this.ctx.moveTo(e.offsetX, e.offsetY);
  //   });

  //   canvas.addEventListener('mousemove', (e) => {
  //     if (this.drawing) {
  //       this.ctx.lineTo(e.offsetX, e.offsetY);
  //       this.ctx.stroke();
  //     }
  //   });

  //   window.addEventListener('mouseup', () => {
  //     this.drawing = false;
  //   });
  // }
}
