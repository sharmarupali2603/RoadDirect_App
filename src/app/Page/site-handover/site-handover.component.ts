import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import SignaturePad from 'signature_pad';
@Component({
  selector: 'app-site-handover',
  templateUrl: './site-handover.component.html',
  styleUrls: ['./site-handover.component.css']
})
export class SiteHandoverComponent {
isSignatureEmpty = true;
  delegationForm: FormGroup;
  handoverTypes = ['TC', 'Supervisor', 'Inspector']; // Add more as needed
 mode: any = 'add';
   @ViewChild('canvas', { static: false })
   signatureCanvas!: ElementRef<HTMLCanvasElement>;
   canvas!: HTMLCanvasElement;
   signaturePad!: SignaturePad;
    signaturePadOptions: Object = {
    minWidth: 1,
    canvasWidth: 300,
    canvasHeight: 100
  };
  constructor(private fb: FormBuilder, public route: Router
    ) {
        const navigation = this.route.getCurrentNavigation();
        this.mode = navigation?.extras.state?.['mode'] || {};
        console.log('mode', this.mode);
    this.delegationForm = this.fb.group({
      handoverType: ['TC'],
      name: [''],
      phone: [''],
      idNumber: [''],
      warrantExpiryDate: [''],
      briefingConfirmed: [false],
      signature: [''] // Hook signature pad input here if needed
    });
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
        backgroundColor: 'rgb(255, 255, 255)'
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
}
