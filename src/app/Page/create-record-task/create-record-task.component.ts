import { Component, OnInit, Input } from '@angular/core';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TrackingService } from 'src/app/Services/Tracking/tracking.service';

@Component({
  selector: 'app-create-record-task',
  templateUrl: './create-record-task.component.html',
  styleUrls: ['./create-record-task.component.css'],
})
export class CreateRecordTaskComponent implements OnInit {
  // @Input() data: any =[];
  // @Input() jobDetails: any = [];
  // @Input() jobDate: any = [];
  // @Input() clientID: string = '';

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
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    public route: Router,
    public trackingService: TrackingService
  ) {
    this.fetchAllProducts();
    this.fetchVehicleRates();
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
      // console.log(' this.clientId>>>>>>>>>>>', this.clientId);
      this.fetchTrackingTaskById(this.taskId);
    }
   
  }

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      client: this.clientId,
      address: this.jobDetails.location,
      resources: ['', Validators.required],
      notes: ['', Validators.required],
    });
  }

  fetchVehicleRates() {
    this.trackingService.getVehicleRates().subscribe(
      (response) => {
        this.vehicleRates = response;
        console.log('Vehicle Rates:', this.vehicleRates);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  fetchAllProducts() {
    const queryParams = {
      includeIcons: true,
    };

    this.trackingService.getAllProducts(queryParams).subscribe(
      (response) => {
        this.productList = response;
        // localStorage.setItem('VehicleList', JSON.stringify(this.vehicles));
        console.log('productList:', this.productList);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  fetchTrackingTaskById(taskId: any) {
    const queryParams = {
      taskId: taskId,
      withTmps: false,
    };
  
    this.trackingService.getTrackingTaskById(queryParams).subscribe(
      (response) => {
        this.task = response;
        // Patch the form with task data once loaded
        debugger;
        if (this.title === 'Edit Record Task' && this.taskForm) {
          debugger;
          this.taskForm.patchValue({
            notes: this.task.notes,
            resources: this.task.vehicleRate?.id,
            // Add other fields as needed
          });
        }
        console.log('Task :', this.task);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  // fetchTrackingTaskById(taskId: any) {
  //   const queryParams = {
  //     taskId: taskId,
  //     withTmps: false,
  //   };

  //   this.trackingService.getTrackingTaskById(queryParams).subscribe(
  //     (response) => {
  //       this.task = response;
  //       // localStorage.setItem('VehicleList', JSON.stringify(this.vehicles));
  //       console.log('Task :', this.task);
  //     },
  //     (error) => {
  //       console.error('Error fetching data:', error);
  //     }
  //   );
  // }
  // onSubmit() {}

  onSubmit(): void {
    console.log('Form Submitted!', this.taskForm.value);
    if (this.taskForm.valid) {
      console.log('Form Submitted!', this.taskForm.value);
      if (localStorage.getItem('User')) {
        const user = localStorage.getItem('User');
        this.user = user ? JSON.parse(user) : null;
      }
      this.userId = this.user.userId;

      // const apiUrl = 'https://your-api.com/tasks'; // 🔁 Change to real endpoint
      const postData = {
        jobId: this.jobDetails.jobId,
        dateId: this.jobDate.dateId,
        userId: this.userId,
        created: this.today,
        scheduledTime: this.today,
        type: 1,
        transport: 1,
        labourRateId: null,
        vehicleRateId: this.taskForm.value.resources,
        notes: this.taskForm.value.notes,
        recordAllSteps: false,
        status: 1,
      };
      this.trackingService.addTrackingRecord(postData).subscribe({
        next: (res) => {
          alert('✅ Task Updated successfully!' + res);
          this.taskForm.reset();

          const result = {
            success: true,
            message: 'Task saved successfully',
          };
          localStorage.setItem('TaskId', res);
          this.route.navigate(['/job-expand'], {
            state: {
              data: this.jobs,
              date: this.currentDate,
              lastdate: this.lastDate,
              jobDetails: this.jobDetails,
              jobDate: this.jobDate,
            },
          });
        },
        error: (err) => {
          alert('❌ Task submission failed!');
          console.error(err);
        },
      });
    }
  }
  edit(){
    console.log('Form Submitted!', this.taskForm.value);
    if (this.taskForm.valid) {
      console.log('Form Submitted!', this.taskForm.value);
      if (localStorage.getItem('User')) {
        const user = localStorage.getItem('User');
        this.user = user ? JSON.parse(user) : null;
      }
      this.userId = this.user.userId;

      // const apiUrl = 'https://your-api.com/tasks'; // 🔁 Change to real endpoint
      const postData = {
        id:this.task.id,
        jobId:this.task.jobId,
        dateId:this.task.dateId,
        userId: this.userId,
        created:this.today,
        scheduledTime:this.today,
        type:this.task.type,
        transport:this.task.transport,
        recordAllSteps:this.task.recordAllSteps,
        vehicleRateId: this.taskForm.value.resources,
        labourRateId:this.task.labourRateId,
        labourRate:this.task.labourRate        ,
        trackingNotes:this.task.trackingNotes,
        notes: this.taskForm.value.notes,
        status:this.task.status,
        leftDepot:this.task.leftDepot,
        arrivedSite:this.task.arrivedSite,
        leftSite:this.task.leftDepot,
        arrivedDepot:this.task.arrivedDepot,
        complete:this.task.complete,
        gearCount:this.task.gearCount,
        gearUpdated:this.today,
        leftNPOnsite:this.task.leftNPOnsite,
        invoiceId:this.task.invoiceId,
        invoice:this.task.invoice,
        taskStatusDescription:"Submitted",
        $id:this.task.$id,
      };
      this.trackingService.updateTrackingRecord(postData).subscribe({
        next: (res) => {
          alert('✅ Task Updated successfully!' + this.task.id);
          this.taskForm.reset();

          const result = {
            success: true,
            message: 'Task saved successfully',
          };
          localStorage.setItem('TaskId', this.task.id);
          this.route.navigate(['/job-expand'], {
            state: {
              data: this.jobs,
              date: this.currentDate,
              lastdate: this.lastDate,
              jobDetails: this.jobDetails,
              jobDate: this.jobDate,
            },
          });
        },
        error: (err) => {
          alert('❌ Task submission failed!');
          console.error(err);
        },
      });
    }
  }
}
