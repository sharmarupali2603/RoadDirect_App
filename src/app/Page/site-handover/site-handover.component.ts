import { Component, ElementRef, ViewChild } from '@angular/core';
import { JobsService } from 'src/app/Services/Jobs/jobs.service';
import { OsrService } from 'src/app/Services/OSR/osr.service';

import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-site-handover',
  templateUrl: './site-handover.component.html',
  styleUrls: ['./site-handover.component.css'],
})
export class SiteHandoverComponent {
  isSignatureEmpty = true;
  delegationForm: FormGroup;
  handoverTypes = ['STMS', 'STMS-NP', 'TC', 'N/A', 'Working Space']; // Add more as needed
  mode: any = 'add';
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
  job: any[] = [];
  selectedJobDetailId: any;
  currentDate: Date = new Date();
  clientList: any[] = [];
  siteDelegation: any[] = [];
  User: any;
  constructor(
    private fb: FormBuilder,
    public route: Router,
    private osrService: OsrService,
    private jobService: JobsService
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
      signature: [''], // Hook signature pad input here if needed
    });
    this.GUID = this.generateGUID();
    console.log(this.GUID);
    this.getJobsByDateRange()
    if (localStorage.getItem('User')) {
      const userData = localStorage.getItem('User');
      this.User = userData ? JSON.parse(userData) : null;
      console.log('User:', this.User);
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

  generateGUID(): string {
    return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, () => {
      return Math.floor(Math.random() * 16).toString(16);
    });
  }

  submitForm(): void {
    if (this.delegationForm.valid) {
      const formData = this.delegationForm.value;
      const payload = {
        Guid: this.GUID,
        JobDetailsId: this.selectedJobDetailId,
        UserId: this.User.id,
        Name: formData.name,
        Phone: formData.phone,
        HandedToRole: formData.handoverType,
        CoPTTMId: formData.idNumber,
        CoPTTMIdExpiry: formData.warrantExpiryDate,
        IsSTMSInCharge: formData.briefingConfirmed,
        HandoverSignature: formData.signature, // Assuming signature is a base64 string
        Recorded: this.currentDate,
      };
      console.log('Form Submitted:', payload);
      this.osrService.syncSiteHandover(payload).subscribe({
        next: (res) => {
          alert('✅ Site Handover Updated successfully!' + res);
          this.delegationForm.reset();

          const result = {
            success: true,
            message: 'Site Handover saved successfully',
          };
        },
        error: (err) => {
          alert('❌ Site Handover submission failed!');
          console.error(err);
        },
      });
    }
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
    this.siteDelegation = [];
    this.delegationForm.reset();
    if (this.mode == 'View') {
      this.fetchSiteDelegation(this.selectedJobDetailId);
    }
  }

  fetchSiteDelegation(jobDetailsId: any) {
    const payload = {
      jobDetailsId: jobDetailsId,
      pageNumber: 1,
      pageSize: 100,
    };
    console.log('Form Submitted:', payload);
    this.osrService.getSiteHandovers(payload).subscribe({
      next: (res) => {
        const siteDelegation = res;
        console.log('Site Delegation Data:', siteDelegation);
        for (let i = 0; i < siteDelegation.item1.length; i++) {
          this.getSiteDelegationById(siteDelegation.item1[i].guid);
        }
        // this.getSiteDelegationById(siteDelegation.item1[0].guid);
      },
      error: (err) => {
        // alert('❌ Task submission failed!');
        console.error(err);
      },
    });
  }

  getSiteDelegationById(GUID: string) {
    const queryParams = {
      guid: GUID,
    };

    this.osrService.getSiteHandoverById(queryParams).subscribe(
      (response) => {
        //  this.myResponses.push(response);
        this.siteDelegation.push(response);
        console.log('siteTSL>>>>>', this.siteDelegation);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
}
