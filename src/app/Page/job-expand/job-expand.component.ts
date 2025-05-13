import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import moment from 'moment';
import { JobsService } from 'src/app/Services/Jobs/jobs.service';
import { PdfService } from 'src/app/Services/pdf/pdf.service';
// import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateRecordTaskComponent } from '../create-record-task/create-record-task.component';
import { TrackingService } from 'src/app/Services/Tracking/tracking.service';
import { modalConfigDefaults } from 'ngx-bootstrap/modal/modal-options.class';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-job-expand',
  templateUrl: './job-expand.component.html',
  styleUrls: ['./job-expand.component.css'],
})
export class JobExpandComponent implements OnInit {
  clientList: any[] = [];
  clientListCached: any[] = [];
  vehicleList: any[] = [];
  userList: any[] = [];
  jobs: any;
  jobDetails: any;
  jobDate: any;
  currentDate: Date = new Date();
  lastDate: any;
  noteDetails: any[] = [];
  eventDetails: any[] = [];
  // cachedjobData: any[] = [];
  taskList: any[] = [];
  User: any;
  FirstName: any;
  LastName: any;
  defaultSetting: any;
  jobType: any[] = [];
  labelStartTime1: any;
  labelStartTime2: any;
  matchedDate: boolean = false;
  matchednote: boolean = false;
  matchedEvent: boolean = false;
  clientID: any;
  files: any = {};
  dropdownOpen = false;
  downloadTmp: string = 'https://eboard-alpha-aws.roaddirect.co.nz/tmp/';
  downloadDoc: string = 'https://eboard-alpha-aws.roaddirect.co.nz/document/';
  images: any[] = [];
  task: any;
  taskId: any;
  updatedTime: any;
  finishTime: any;
  submitTime: any;
  userId:any;
  equipments:any[]=[];
  editEquipmentData: any;
  productList:any[]=[];
  equipmentList:any[]=[];
  clientSignOf:any[]=[];
  base64Data: string | null = null;
  imageUrl: string | null = null;
  thumbnail:any;
   showHistory = false;
    notes : any[]=[];
     searchTerm = '';
     attachment:any;
  invoiceOnly = false;
  taskOnly = false;
  constructor(
    private route: Router,
    public jobService: JobsService,
    public pdfService: PdfService,
    public trackingService: TrackingService, // private modalService: NgbModal
    private sanitizer: DomSanitizer
  ) {
  
    if (localStorage.getItem ('User')) {
      const userData = localStorage.getItem('User');
      this.User = userData ? JSON.parse(userData) : null;
      console.log('User:', this.User);
      this.FirstName= this.User.firstName;
      this.LastName= this.User.lastName;
      console.log('FirstName:', this.FirstName);
      console.log('LastName:', this.LastName);
      
  }
    const navigation = this.route.getCurrentNavigation();
    this.jobs = navigation?.extras.state?.['data'] || {};
    console.log('Job>>>>>>>>>>>', this.jobs);

    this.currentDate = navigation?.extras.state?.['date'] || {};
    this.lastDate = navigation?.extras.state?.['lastdate'] || {};
    this.jobDetails = navigation?.extras.state?.['jobDetails'] || {};
    this.jobDate = navigation?.extras.state?.['jobDate'] || {};
    console.log('job details>>>>>>>>>', this.jobDetails);
    console.log('job date>>>>>>>>>', this.jobDate);
    this.fetchAllProducts();
    this.fetchClientSignof();
    this.getDefaultSettings();
    this.getEventsByDateRange();
    // Detect online/offline status
    // window.addEventListener('online', () => (this.isOnline = true));
    // window.addEventListener('offline', () => (this.isOnline = false));
    this.getNotesByDateRange();
    this.getTrackingNotesByJobId();
    if (localStorage.getItem('ClientList')) {
      const clientData = localStorage.getItem('ClientList');
      this.clientList = clientData ? JSON.parse(clientData) : null;
      console.log('Client List:', this.clientList);
    }
    if (localStorage.getItem('VehicleList')) {
      const vehicleData = localStorage.getItem('VehicleList');
      this.vehicleList = vehicleData ? JSON.parse(vehicleData) : null;
    }
    console.log('VehicleList:', this.vehicleList);
    if (localStorage.getItem('UserList')) {
      const userData = localStorage.getItem('UserList');
      this.userList = userData ? JSON.parse(userData) : null;
    }
    console.log('userList:', this.userList);
    if (localStorage.getItem('TaskList')) {
      const taskData = localStorage.getItem('TaskList');
      this.taskList = taskData ? JSON.parse(taskData) : null;
    }
    console.log('taskList:', this.taskList);
    if (localStorage.getItem('User')) {
      const userData = localStorage.getItem('User');
      this.User = userData ? JSON.parse(userData) : null;
      console.log('User:', this.User);
      this.FirstName = this.User.id;
      this.LastName = this.User.lastName;
      console.log('FirstName:', this.FirstName);
      console.log('LastName:', this.LastName);
    }
    
  }

  ngOnInit(): void {
    console.log('Enter in expand job page');
    if (localStorage.getItem('TaskId')) {
      const TaskId = localStorage.getItem('TaskId');
      this.taskId = TaskId ? JSON.parse(TaskId) : null;
      console.log('TaskId:', this.taskId);
      this.fetchTrackingTaskById(this.taskId);
    }
    if (localStorage.getItem('UpdatedTime')) {
      const updatedTime = localStorage.getItem('UpdatedTime');
      this.updatedTime = updatedTime ? JSON.parse(updatedTime) : null;
      console.log('updatedTime:', this.updatedTime);
      // this.fetchTrackingTaskById(this.taskId);
    }
    if (localStorage.getItem('finishTime')) {
      const finishTime = localStorage.getItem('finishTime');
      this.finishTime = finishTime ? JSON.parse(finishTime) : null;
      console.log('finishTime:', this.finishTime);
      // this.fetchTrackingTaskById(this.taskId);
    }
    if (localStorage.getItem('submitTime')) {
      const submitTime = localStorage.getItem('submitTime');
      this.submitTime = submitTime ? JSON.parse(submitTime) : null;
      console.log('submitTime:', this.submitTime);
      // this.fetchTrackingTaskById(this.taskId);
    }
   
  }

  //  filteredNotes() {
  //   return this.notes.filter(note => {
  //     // const matchesSearch = note.content.toLowerCase().includes(this.searchTerm.toLowerCase());
  //     // const matchesInvoice = !this.invoiceOnly || note.type === 'invoice';
  //     // const matchesTask = !this.taskOnly || note.type === 'task';
  //     // return matchesSearch && matchesInvoice && matchesTask;
  //   });
  // }
  getDefaultSettings() {
    this.jobService.getDefaultSettings().subscribe(
      (response) => {
        this.defaultSetting = response;
        console.log('defaultSetting:', this.defaultSetting);
        this.labelStartTime1 = this.defaultSetting.labelStartTime1;
        this.labelStartTime2 = this.defaultSetting.labelStartTime2;
        // localStorage.setItem('TaskList', JSON.stringify(this.tasks));
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
        // localStorage.setItem('VehicleList', JSON.stringify(this.vehicles));
        console.log('Task:', this.task);
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
        this.productList = response.map((item: any) => ({ ...item, quantity: 0 }));

        // localStorage.setItem('VehicleList', JSON.stringify(this.vehicles));
        console.log('productList:', this.productList);
        this.fetchLatestJobItemCounts();
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  getNotesByDateRange() {
    let current = this.currentDate.toISOString();
    let currentDate = current;
    let lastDate = this.lastDate;
    const dateRange = {
      StartDate: currentDate,
      EndDate: lastDate,
    };
    this.jobService.getetNotesByDateRange(dateRange).subscribe((data) => {
      this.noteDetails.unshift(data);
      console.log('Notes Details', data);
      this.noteDetails = data;
    });
  }
  getEventsByDateRange() {
    let currentDate = this.currentDate;
    let lastDate = this.lastDate;
    const dateRange = {
      StartDate: currentDate,
      EndDate: lastDate,
    };
    this.jobService.getEventsByDateRange(dateRange).subscribe((data) => {
      this.eventDetails.unshift(data);
      console.log('Event Details', data);
      this.eventDetails = data;
    });
  }
  getVehicleNameById(vehicleId: any[]) {
    // return this.getVehicleNamebyID(vehicleId);
    var arr = [];
    if (vehicleId != null && vehicleId != undefined) {
      for (let i = 0; i < vehicleId.length; i++) {
        // if (typeof staffId[i] === 'object') {
        let m = vehicleId[i];
        if (m) {
          let response = this.getVehicleNamebyID(m.toString());
          arr.push(response);
        } else {
          arr.push(m);
        }
        // }
      }
    }
    return arr;
  }
  getStaffNameById(staffId: any[]): any[] {
    var arr = [];
    if (staffId != null && staffId != undefined) {
      for (let i = 0; i < staffId.length; i++) {
        // if (typeof staffId[i] === 'object') {
        let m = staffId[i];
        if (m) {
          let response = this.getUserNamebyID(m);
          arr.push(response);
        } else {
          arr.push(m);
        }
        // }
      }
    }
    return arr;
  }

  getClosureOptions(rowData1: any[]): any[] {
    var arr = [];
    if (rowData1 != null && rowData1 != undefined) {
      for (let i = 0; i < rowData1.length; i++) {
        if (typeof rowData1[i] === 'object') {
          let m = rowData1[i];
          if (m && m.option) {
            arr.push(m.option);
          }
        } else {
          arr.push(rowData1[i]);
        }
      }
    }
    return arr; // Ensure a value is always returned
  }
  getVehicleNamebyID(vehicleId: any) {
    if (vehicleId) {
      // const result = vehicleId.map((item, index) => {
      const vehicle = this.vehicleList.find((c) => c.id == vehicleId); // Find vehicle by ID
      return vehicle ? vehicle.shortName : String(vehicleId); // Return ShortName if found, otherwise return the vehicleId as a string
      // });
      // return result;
    }
    return []; // Return an empty array if vehicleId is null or undefined
  }

  getUserNamebyID(userId: any) {
    // const result = userId.map((item, index) => {
    const user = this.userList.find((c) => c.id == userId); // Find vehicle by ID
    return user ? `${user.firstName} ${user.lastName}` : String(userId); // Return ShortName if found, otherwise return the vehicleId as a string
  }
  getClientNamebyID(clientId: any) {
    // const result = clientId.map((item, index) => {
    const clientID = this.clientList.find((c) => c.clientId == clientId); // Find vehicle by ID
    this.clientID = clientID ? this.clientID.clientName : String(clientId);
    // console.log('clientID:',this.clientID);
    return clientID ? this.clientID.clientName : String(clientId); // Return ShortName if found, otherwise return the vehicleId as a string
    // });
    // console.log('clientID:',this.clientID);
    // return result;
  }
  getTypeOfWork(rowData1: any) {
    if (rowData1 != null || rowData1 != undefined) {
      if (typeof rowData1 === 'string') {
        // let result = rowData1.slice(1, -1).split(','); // Remove the brackets and split by commas
        const fixedData = rowData1.replace(/(\w+):/g, '"$1":'); // Fix keys without quotes
        const parsedData = JSON.parse(fixedData);
        return parsedData;
      }
      return rowData1;
    }
  }

  getElements(allocTrucks: any[]) {
    // return allocTrucks.map(item => String(item)).join(', ');
    const nameOnly = allocTrucks.find((item) => typeof item === 'string');
    console.log(nameOnly);

    return nameOnly;
  }
  getNameByID(userId: any[]) {
    const user = this.userList.find((c) => c.id === userId); // Find vehicle by ID
    return user ? `${user.firstName} ${user.lastName}` : String(userId); // Return ShortName if found, otherwise return the vehicleId as a string
  }

  collapseJobs() {
    this.route.navigate(['/dashboard']);
  }

  getClosure(rowData1: any[]): any[] {
    var arr = [];
    if (rowData1 != null && rowData1 != undefined) {
      for (let i = 0; i < rowData1.length; i++) {
        if (typeof rowData1[i] === 'object') {
          let m = rowData1[i];
          if (m && m.fullName) {
            arr.push(m.fullName);
          }
        } else {
          arr.push(rowData1[i]);
        }
      }
    }
    return arr; // Ensure a value is always returned
  }
  getTaskStatus(jobs: any, _userId: any[]) {
    const task = this.taskList.find((c) => c.jobId == jobs.id); // Find vehicle by ID
    const taskStatus = task ? task.status : String(jobs.id);
    if (taskStatus == '2') {
      return '(L)';
    }
    if (taskStatus == '5') {
      return '(B)';
    }
    if (taskStatus == '6') {
      return '(C)';
    } else {
      return '';
    }
  }

  sendEventData(day: any, event: any[]) {
    const dateOnly1 = moment(day, 'YYYY-MM-DD HH:mm:ss').format('M/D/YYYY');
    for (let i = 0; i < event.length; i++) {
      let dateOnly = moment(event, 'YYYY-MM-DD HH:mm:ss').format('M/D/YYYY');
      if (dateOnly == dateOnly1) {
        this.matchedEvent = true;
      } else {
        this.matchedEvent = false;
      }
    }
  }

  // openMap(lat: number, lng: number) {
  //   const url = `https://www.google.com/maps?q=${lat},${lng}`;
  //   window.open(url, '_blank');
  // }

  openMap(location: string) {
    const query = encodeURIComponent(location);
    const geoUrl = `geo:0,0?q=${query}`;
    const webUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;

    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    if (isMobile) {
      // Try geo: URL on mobile
      setTimeout(() => {
        // Fallback to Google Maps in browser if geo fails (e.g. unsupported browser)
        window.location.href = webUrl;
      }, 1000);

      // Try launching the geo: URL
      window.location.href = geoUrl;
    } else {
      // On desktop: just open Google Maps
      window.open(webUrl, '_blank');
    }
    // <!--- open with new tab --->
    // const query = encodeURIComponent(location);
    // const url = `https://www.google.com/maps/search/?api=1&query=${query}`;
    // window.open(url, '_blank');

    // <!--- open with iframe --->
    // this.route.navigate(['/location'], { state: { location: location}});
  }
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
  downloadPdf(jobs: any, jobDetails: any, jobDate: any) {
    const details = {
      jobs: jobs,
      jobDetails: jobDetails,
      jobDate: jobDate,
      clientID: this.clientID
    };
    console.log('clientID:', this.clientID);
    this.pdfService.generatePdf(details);
  }

  loadImages() {
    this.getPhotosByJobDetailsId();
    // this.images = this.jobDetails.photoLookups;

  }

  openImage(photoBlob: Blob) {
    debugger
    const image ='data:image/jpeg;base64,' + photoBlob;
    this.thumbnail = this.sanitizer.bypassSecurityTrustUrl(image)
  }
  addRecordTask(jobs: any, jobDetails: any, jobDate: any) {
    console.log('clientID:', this.clientID);
    this.route.navigate(['/create-record-task'], {
      state: {
        title: 'Create Record Task',
        data: jobs,
        jobDetails: jobDetails,
        jobDate: jobDate,
        clientID: this.clientID,
        date: this.currentDate,
        lastdate: this.lastDate,
      },
    });
  }
  editRecordTask(jobs: any, jobDetails: any, jobDate: any, taskId: any) {
    console.log('clientID:', this.clientID);
    this.route.navigate(['/create-record-task'], {
      state: {
        title: 'Edit Record Task',
        data: jobs,
        jobDetails: jobDetails,
        jobDate: jobDate,
        clientID: this.clientID,
        date: this.currentDate,
        lastdate: this.lastDate,
        taskId: taskId,
      },
    });
  }
  updateTaskTime(jobs: any, jobDetails: any, jobDate: any, taskId: any) {
    const today = new Date();
    const postData = {
      taskId: taskId,
      Status: '6',
      TaskTime: today,
    };

    this.trackingService.updateTaskTime(postData).subscribe({
      next: (res) => {
        this.updatedTime = postData.TaskTime;
        localStorage.setItem('UpdatedTime', JSON.stringify(this.updatedTime));
        alert('✅' + res);
      },
      error: (err) => {
        alert('❌ Task submission failed!');
        console.error(err);
      },
    });
  }

  FinishTaskTime(jobs: any, jobDetails: any, jobDate: any, taskId: any) {
    const today = new Date();
    const postData = {
      taskId: taskId,
      Status: '6',
      TaskTime: today,
    };

    this.trackingService.updateTaskTime(postData).subscribe({
      next: (res) => {
        this.finishTime = postData.TaskTime;
        localStorage.setItem('finishTime', JSON.stringify(this.finishTime));
        alert('✅' + res);
      },
      error: (err) => {
        alert('❌ Task submission failed!');
        console.error(err);
      },
    });
  }

  submitTaskTime(jobs: any, jobDetails: any, jobDate: any, taskId: any) {
    const today = new Date();
    const postData = {
      taskId: taskId,
      Status: '6',
      TaskTime: today,
    };

    this.trackingService.updateTaskTime(postData).subscribe({
      next: (res) => {
        this.submitTime = postData.TaskTime;
        // this.task='';
        localStorage.setItem('submitTime', JSON.stringify(this.submitTime));
        alert('✅' + res);
      },
      error: (err) => {
        alert('❌ Task submission failed!');
        console.error(err);
      },
    });
  }
  AddRecordTask(jobs: any, jobDetails: any, jobDate: any) {
    this.addRecordTask(jobs, jobDetails, jobDate);
    localStorage.setItem('UpdatedTime', '');
    localStorage.setItem('finishTime', '');
    localStorage.setItem('submitTime', '');
  }

  editTime(jobs: any, jobDetails: any, jobDate: any,SubmitTime:any,taskId:any) {
    console.log('clientID:', this.clientID);
    this.route.navigate(['/edit-time'], {
      state: {
        title: 'edit time',
        data: jobs,
        jobDetails: jobDetails,
        jobDate: jobDate,
        clientID: this.clientID,
        date: this.currentDate,
        lastdate: this.lastDate,
        SubmitTime:SubmitTime,
        finishTime:'',
        taskId:taskId
      },
    });
  }
  navigateToFinishTime(jobs: any, jobDetails: any, jobDate: any, SubmitTime: any, finishTimeParam: any,taskId:any) {
    console.log('clientID:', this.clientID);
    this.route.navigate(['/edit-time'], {
      state: {
        title: 'finish time',
        data: jobs,
        jobDetails: jobDetails,
        jobDate: jobDate,
        clientID: this.clientID,
        date: this.currentDate,
        lastdate: this.lastDate,
        SubmitTime:SubmitTime,
        finishTime:finishTimeParam,
        taskId:taskId
      },
    });
  }
  fileName = '';
  file='';
// fileChanged(evt: Event) {
//   debugger
//   const f = (evt.target as HTMLInputElement).files;
//   if (f?.length) this.fileName = f[0].name;
//   // if (f?.length) this.file = f.data;
// }
fileChanged(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (!input.files?.length) return;

  const file = input.files[0];
  const reader = new FileReader();

  reader.onload = () => {
    // This will include the data URI prefix like "data:image/png;base64,..."
    this.base64Data = reader.result as string;
    console.log('Base64:', this.base64Data);
  };

  reader.onerror = (error) => {
    console.error('FileReader error:', error);
  };

  reader.readAsDataURL(file); // reads file as base64
}
onSubmit(val: any) {
  console.log('Form data', val);
  if (localStorage.getItem('User')) {
    const user = localStorage.getItem('User');
    this.userId = user ? JSON.parse(user) : null;
  }
  this.userId = this.userId.userId;
  // if(this.base64Data)
    const postData = [{
      jobId:this.jobDetails.jobId,
      note: val.note,
      noteType: 3,
      userId:'c2562ddb-4225-45a3-8a94-d7f6015e6788',
      attachment: this.base64Data,
      timestamp: this.currentDate,
    }];
 
  

  this.trackingService.addTrackingNotes(postData).subscribe({
    next: (res) => {
      alert('✅ Note added successfully!');
      // val.reset();

    },
    error: (err) => {
      alert('❌ Task submission failed!');
      console.error(err);
    },
  });
}

editEquipment(jobs: any, jobDetails: any, jobDate: any,taskId:any){
  console.log("fbdhsbfuhasdbuyyfbsaduyubfuyshd",taskId);
  
  this.route.navigate(['/edit-equipment'], {
    state: {
      data: jobs,
      jobDetails: jobDetails,
      jobDate: jobDate,
      clientID: this.clientID,
      date: this.currentDate,
      lastdate: this.lastDate,
      taskId:taskId
    },
  })
}

fetchLatestJobItemCounts() {
  const queryParams = {
    jobId: this.jobDetails.jobId
  };

  this.trackingService.getLatestJobItemCounts(queryParams).subscribe(
    (response) => {
      this.equipments = response;
      const filtered = this.equipments.filter(item => item.quantity > 0);
    
      this.equipmentList = filtered.map(item => ({
        title:this.getTitleByProductId(item.productId),
        icon:this.getIconbyProductId(item.productId),
        product: item.product,
        productId: item.productId,        // or item.productId depending on your API response
        quantity: item.quantity,
        jobId:item.jobId,
        price:item.price,
        id:item.id
      }));
      // localStorage.setItem('VehicleList', JSON.stringify(this.vehicles));
      console.log('equipments:', this.equipmentList);
    },
    (error) => {
      console.error('Error fetching data:', error);
    }
  );
}
getIconbyProductId(productId: any) {


  const product = this.productList.find((c) => c.id == productId); // Find vehicle by ID
  return product ? product.icon : String(productId); // Return ShortName if found, otherwise return the vehicleId as a string
}

getTitleByProductId(productId: any) {
  const product = this.productList.find((c) => c.id == productId); // Find vehicle by ID
  return product ? product.title : String(productId); // Return ShortName if found, otherwise return the vehicleId as a string
}

clientSignOff(jobs: any, jobDetails: any, jobDate: any,taskId:any) {
  console.log('clientID:', this.clientID);
  this.route.navigate(['/client-signof'], {
    state: {
      title: 'Client Sign Off',
      data: jobs,
      jobDetails: jobDetails,
      jobDate: jobDate,
      clientID: this.clientID,
      date: this.currentDate,
      lastdate: this.lastDate,
      taskId:taskId,
      equipmentList:this.equipmentList,
      updatedTime:this.updatedTime,
      submitTime:this.submitTime,
    },
  });
}
fetchClientSignof() {
  const queryParams = {
    id: this.jobDetails.jobId
  };

  this.trackingService.getClientSignOffsByJobId(queryParams).subscribe(
    (response) => {
      this.clientSignOf = response;
      // const filtered = this.equipments.filter(item => item.quantity > 0);
    
      // this.equipmentList = filtered.map(item => ({
      //   title:this.getTitleByProductId(item.productId),
      //   icon:this.getIconbyProductId(item.productId),
      //   product: item.product,
      //   productId: item.productId,        // or item.productId depending on your API response
      //   quantity: item.quantity,
      //   jobId:item.jobId,
      //   price:item.price,
      //   id:item.id
      // }));
      // localStorage.setItem('VehicleList', JSON.stringify(this.vehicles));
      console.log('clientSignOf:', this.clientSignOf);
    },
    (error) => {
      console.error('Error fetching data:', error);
    }
  );
}

getPhotosByJobDetailsId() {
  const queryParams = {
    id: this.jobDetails.jobDetailsId
  };

  this.jobService.getPhotosByJobDetailsId(queryParams).subscribe(
    (response) => {
      this.images = response;
      console.log("images>>>>>",this.images);
    },
    (error) => {
      console.error('Error fetching data:', error);
    }
  );
}

viewClientSignOf(jobs: any, jobDetails: any, jobDate: any,taskId:any,clientSignOf:any){
  console.log('clientID:', this.clientID);
  this.route.navigate(['/client-signof'], {
    state: {
      title: 'view',
      data: jobs,
      jobDetails: jobDetails,
      jobDate: jobDate,
      clientID: this.clientID,
      date: this.currentDate,
      lastdate: this.lastDate,
      taskId:taskId,
      equipmentList:this.equipmentList,
      updatedTime:this.updatedTime,
      submitTime:this.submitTime,
      clientSignOf:clientSignOf
    },
  });
}

getTrackingNotesByJobId() {
  const queryParams = {
    jobId: this.jobDetails.jobId
  };

  this.trackingService.getTrackingNotesByJobId(queryParams).subscribe(
    (response) => {
      this.notes = response;
      console.log('notes:', this.notes);
    },
    (error) => {
      console.error('Error fetching data:', error);
    }
  );
}

  filteredNotes() {
    return this.notes.filter(note => {
      const matchesSearch = note.note?.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesInvoice = !this.invoiceOnly || note.noteType == 1;
      const matchesTask = !this.taskOnly || note.noteType == 3;
      return matchesSearch && matchesInvoice && matchesTask;
    });
  }

  getTrackingNoteAttachmentById(id:any) {
  const queryParams = {
    noteId: id
  };

  this.trackingService.getTrackingNoteAttachmentById(queryParams).subscribe(
    (response) => {
      this.attachment = response;
      console.log('attachment:', this.attachment);
    },
    (error) => {
      console.error('Error fetching data:', error);
    }
  );
}
}