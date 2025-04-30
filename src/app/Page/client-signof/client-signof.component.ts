import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, HostListener, Inject, OnInit, ViewChild } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import SignaturePad from 'signature_pad';
import { TrackingService } from 'src/app/Services/Tracking/tracking.service';

@Component({
  selector: 'app-client-signof',
  templateUrl: './client-signof.component.html',
  styleUrls: ['./client-signof.component.css']
})
export class ClientSignofComponent {
  signOffForm: FormGroup;
  isSignatureEmpty = true;
  resources: string[] = ['Truck 1', 'Truck 2', 'Driver A'];
  selectedResource: string = '';
  notes: string = '';

  jobs: any;
  jobDetails: any;
  jobDate: any;
  clientId: any;
  productList: any[] = [];
  vehicleRates: any[] = [];
  taskForm!: FormGroup;
  user: any;
  userId: any;
  currentDate: Date = new Date();
  lastDate: any;
  today: Date = new Date();
  taskId:any;
  title: string = 'Create Record Task';
  task:any;
  @ViewChild('canvas', { static: false })
  signatureCanvas!: ElementRef<HTMLCanvasElement>;
  canvas!: HTMLCanvasElement;
  signaturePad!: SignaturePad;
  // @ViewChild('signaturePad') signaturePad!: SignaturePad;

  signaturePadOptions: Object = {
    minWidth: 1,
    canvasWidth: 300,
    canvasHeight: 100
  };

  equipmentList = [
    { name: 'No Parking Cones', quantity: 1 },
    { name: 'Directional Signs (MTC & Lane Closures)', quantity: 2 },
    { name: 'Stop Go Paddle', quantity: 1 },
    { name: 'Safety Fence 2m (PLASTIC)', quantity: 1 }
  ];
  timeLog = {
    started: '', // e.g., '2024-04-22 08:00 AM'
    finished: '', // e.g., '2024-04-22 12:00 PM'
    totalHours: 0
  };
  private getSignatureCanvas() {
    //set up signature stuff
    this.canvas = this.signatureCanvas.nativeElement;
    this.signaturePad = new SignaturePad(this.canvas, {
      // It's Necessary to use an opaque color when saving image as JPEG;
      // this option can be omitted if only saving as PNG or SVG
      backgroundColor: 'rgb(255, 255, 255)'
    });
  }
 constructor(
     private fb: FormBuilder,
     private http: HttpClient,
     public route: Router,
     public trackingService: TrackingService
   ) {
   
     const navigation = this.route.getCurrentNavigation();
     this.jobs = navigation?.extras.state?.['data'] || {};
     console.log('Job>>>>>>>>>>>', this.jobs);
     this.currentDate = navigation?.extras.state?.['date'] || {};
     this.lastDate = navigation?.extras.state?.['lastdate'] || {};
     this.jobDetails = navigation?.extras.state?.['jobDetails'] || {};
     this.jobDate = navigation?.extras.state?.['jobDate'] || {};
     this.clientId = navigation?.extras.state?.['clientID'] || {};
     this.taskId = navigation?.extras.state?.['taskId'] || {};
     if( navigation?.extras.state?.['title']){
       this.title = navigation?.extras.state?.['title'] || {};
      
     }
    
    this.signOffForm = this.fb.group({
      company: ['', Validators.required],
      name: ['', Validators.required],
      contactNumber: ['', Validators.required],
      signingEquipment: [false],
      signingTime: [false],
      notes: ['', Validators.required]
    });
  }

  ngAfterViewInit() {
    // this.signaturePad.clear();
    this.getSignatureCanvas();
      // this.signaturePad is now available
      this.signaturePadOptions = { ...this.signaturePadOptions, minWidth: 5 }; // update options at runtime
      // this.signaturePad.clear(); // invoke functions from szimek/signature_pad API
    
  }

  drawComplete() {
    this.isSignatureEmpty = this.signaturePad.isEmpty();
  }

  clearSignature() {
    this.signaturePad.clear();
    this.isSignatureEmpty = true;
  }

  onCancel() {
    this.signOffForm.reset();
    this.clearSignature();
     
    this.route.navigate(['/job-expand'], {
      state: {
        data: this.jobs,
        date: this.currentDate,
        lastdate: this.lastDate,
        jobDetails: this.jobDetails,
        jobDate: this.jobDate,
      },
    });
  }

  signOff(){
    // const today = new Date();
      const postData = {
        jobId: this.jobDetails.jobId,
        SigningForEquipment:this.signOffForm.value.signingEquipment,
        SigningForTime:this.signOffForm.value.signingTime,
        Notes: this.signOffForm.value.notes
    }
    console.log("postData", postData);
    
      this.trackingService.addClientSignOff(postData).subscribe({
        next: (res) => {
         
          this.route.navigate(['/job-expand'], {
            state: {
              data: this.jobs,
              date: this.currentDate,
              lastdate: this.lastDate,
              jobDetails: this.jobDetails,
              jobDate: this.jobDate,
            },
          });
          // this.finishTime = postData.TaskTime;
          // localStorage.setItem('finishTime', JSON.stringify(this.finishTime));
          alert('✅' + 'Sign off successfully!' + res);
        },
        error: (err) => {
          alert('❌ Sign off submission failed!');
          console.error(err);
        },
      });
  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }

  loadContactFromJob(){ // Simulated job contact data
    const contact = {
      company: 'Bergnaum, Stracke and Kuphal',
      name: 'Jane Doe',
      contactNumber: '123-456-7890'
    };
  
    this.signOffForm.patchValue(contact);
  
  }
}
