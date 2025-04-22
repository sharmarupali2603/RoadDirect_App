import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { TrackingService } from 'src/app/Services/Tracking/tracking.service';
@Component({
  selector: 'app-edit-equipment',
  templateUrl: './edit-equipment.component.html',
  styleUrls: ['./edit-equipment.component.css']
})
export class EditEquipmentComponent implements OnInit{
  jobForm!: FormGroup;
  productList:any[]=[];
  
 
  jobs: any;
  jobDetails: any;
  jobDate: any;
  clientId: any;
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
  // equipmentList = [
  //   { name: 'Advance Warning', quantity: 0, image: 'assets/icons/warning.png' },
  //   { name: 'Directional Signs (MTC & Lane Closures)', quantity: 0, image: 'assets/icons/directional.png' },
  //   { name: 'Speed & Temps signs', quantity: 0, image: 'assets/icons/speed.png' },
  //   { name: 'Road Closure Signs', quantity: 0, image: 'assets/icons/closure.png' },
  //   { name: 'Stop Go Paddle', quantity: 0, image: 'assets/icons/paddle.png' }
  // ];

  constructor(private fb: FormBuilder, public trackingService: TrackingService, public route: Router,) {
    this.fetchAllProducts();
    const navigation = this.route.getCurrentNavigation();
    this.jobs = navigation?.extras.state?.['data'] || {};
    console.log('Job>>>>>>>>>>>', this.jobs);
    this.currentDate = navigation?.extras.state?.['date'] || {};
    this.lastDate = navigation?.extras.state?.['lastdate'] || {};
    this.jobDetails = navigation?.extras.state?.['jobDetails'] || {};
    this.jobDate = navigation?.extras.state?.['jobDate'] || {};
    this.taskId = navigation?.extras.state?.['taskId'] || {};
  }

  ngOnInit(): void {
    this.jobForm = this.fb.group({
      notes: [''],
      quantity:['0'],
      equipment: [this.productList]
    });
  }
  fetchAllProducts() {
    const queryParams = {
      includeIcons: true,
    };

    this.trackingService.getAllProducts(queryParams).subscribe(
      (response) => {
        this.productList = response;
        this.productList = response.map((item: any) => ({ ...item, quantity: 0 }));

        // Push a new custom item
        this.productList.push({
          name: 'Stop Go Paddle',
          image: 'assets/icons/paddle.png',
          quantity: 0
        });
        // localStorage.setItem('VehicleList', JSON.stringify(this.vehicles));
        console.log('productList:', this.productList);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }

  
  increment(item: any) {
    item.quantity++;
  }

  decrement(item: any) {
    if (item.quantity > 0) item.quantity--;
  }


  onSubmit() {
    const notes = this.jobForm.value.notes;

    // Filter only items with quantity > 0
    const filteredEquipment = this.productList.filter(item => item.quantity > 0);
  
    const formData = {
      notes: notes,
      equipment: filteredEquipment
    };
    console.log('Form Submitted:', formData);
    if (this.jobForm.valid) {
      console.log('Form Submitted!', this.jobForm.value); 
      const taskId = this.taskId ; // or get from elsewhere
      const jobId = this.jobDetails.jobId;  // probably same as TaskId or another selected value
    
      // Assume equipmentList has quantity + original API data
      const filtered = this.productList.filter(item => item.quantity > 0);
    
      const jobItems = filtered.map(item => ({
        JobId: jobId,
        ProductId: item.id,        // or item.productId depending on your API response
        Quantity: item.quantity
      }));
    
      const postData = {
        TaskId: taskId,
        JobItems: jobItems
      };
    
      console.log('POST data:', postData);
    
    //   const postData = {
    //     "TaskId": 1,
    //     "JobItems": [
    //       filteredEquipment
    //     ]
    // }
    this.trackingService.updateEquipment(postData).subscribe({
      next: (res) => {
        alert('✅ Equipment Updated successfully!' + res);
        this.jobForm.reset();

        const result = {
          success: true,
          message: 'Task saved successfully',
        };
        // localStorage.setItem('TaskId', res);
        this.route.navigate(['/job-expand'], {
          state: {
            data: this.jobs,
            date: this.currentDate,
            lastdate: this.lastDate,
            jobDetails: this.jobDetails,
            jobDate: this.jobDate,
            editEquipment:true
          },
        });
      },
      error: (err) => {
        alert('❌ Task submission failed!');
        console.error(err);
      },
    });
  }
    // Example: You could send `formData` to an API here
  }
  // equipmentList = [
  //   { name: 'No Parking Cones', quantity: 0, image: 'assets/icons/cone.png' },
  //   { name: 'Advance Warning', quantity: 2, image: 'assets/icons/warning.png' },
  //   { name: 'Directional Signs (MTC & Lane Closures)', quantity: 0, image: 'assets/icons/directional.png' },
  //   { name: 'Speed & Temps signs', quantity: 0, image: 'assets/icons/speed.png' },
  //   { name: 'Road Closure Signs', quantity: 2, image: 'assets/icons/closure.png' },
  //   { name: 'Stop Go Paddle', quantity: 1, image: 'assets/icons/paddle.png' }
  // ];

  // increment(item: any) {
  //   item.quantity++;
  // }

  // decrement(item: any) {
  //   if (item.quantity > 0) {
  //     item.quantity--;
  //   }
  // }
}
