import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobsService } from 'src/app/Services/Jobs/jobs.service';
import * as moment from 'moment';
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
  constructor(private route: Router, public jobService: JobsService
  ) {
    const navigation = this.route.getCurrentNavigation();
    this.jobs = navigation?.extras.state?.['data'] || {};
    console.log("Job>>>>>>>>>>>", this.jobs);

    this.currentDate = navigation?.extras.state?.['date'] || {};
    this.lastDate = navigation?.extras.state?.['lastdate'] || {};
    this.getDefaultSettings();
    this.getEventsByDateRange();
    // Detect online/offline status
    // window.addEventListener('online', () => (this.isOnline = true));
    // window.addEventListener('offline', () => (this.isOnline = false));
    this.getNotesByDateRange();
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
  }
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
      const vehicle = this.vehicleList.find((c) => c.id === vehicleId); // Find vehicle by ID
      return vehicle ? vehicle.shortName : String(vehicleId); // Return ShortName if found, otherwise return the vehicleId as a string
      // });
      // return result;
    }
    return []; // Return an empty array if vehicleId is null or undefined
  }

  getUserNamebyID(userId: any) {
    // const result = userId.map((item, index) => {
    const user = this.userList.find((c) => c.id === userId); // Find vehicle by ID
    return user ? `${user.firstName} ${user.lastName}` : String(userId); // Return ShortName if found, otherwise return the vehicleId as a string
  }
  getClientNamebyID(clientId: any) {
    // const result = clientId.map((item, index) => {
    const client = this.clientList.find((c) => c.clientId === clientId); // Find vehicle by ID
    return client ? client.clientName : String(clientId); // Return ShortName if found, otherwise return the vehicleId as a string
    // });
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
    const task = this.taskList.find((c) => c.jobId === jobs.id); // Find vehicle by ID
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
    const dateOnly1 = moment(day, 'YYYY-MM-DD HH:mm:ss').format('M/D/YYYY')
    for (let i = 0; i < event.length; i++) {
      let dateOnly = moment(event, 'YYYY-MM-DD HH:mm:ss').format('M/D/YYYY');
      if (dateOnly == dateOnly1) {
        this.matchedEvent = true;
      } else {
        this.matchedEvent = false;
      }
    }
  }
}
