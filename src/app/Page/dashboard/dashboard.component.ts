import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { isToday } from 'date-fns';
import * as moment from 'moment';
import { ClientService } from 'src/app/Services/Client/client.service';
import { DatabaseService } from 'src/app/Services/Database/database.service';
import { JobsService } from 'src/app/Services/Jobs/jobs.service';
import { UserService } from 'src/app/Services/Users/user.service';
import { VehicleService } from 'src/app/Services/Vehicle/vehicle.service';

interface JobDate {
  allocStaff?: {
    allocatedStaff?: string[];
  };
}

interface JobDetail {
  location?: string;
  contact?: string;
  dates?: JobDate[];
}

interface Job {
  jobDetails: JobDetail[];
  jobCategory?: number | string;
  startDate?: string | Date;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  moment = moment; // Make moment available to template
  currentDate: Date = new Date();
  weekDates: any[] = [];
  lastDate: any;
  cachedjobData: any[] = [];
  currentMonth: string = '';
  currentYear: number = 0;
  users = ['User 1', 'User 2', 'User 3'];
  jobs = ['User 1', 'User 2', 'User 3'];
  jobDetails: Job[] = []; // Add type annotation for the class property
  isOnline = navigator.onLine;
  openCalendar1: boolean = false;
  userList: any[] = [];
  searchText: string = '';
  searchText1: string = '';
  searchText2: string = '';
  // jobDetails: any[] = [];
  noteDetails: any[] = [];
  eventDetails: any[] = [];
  // cachedjobData: any[] = [];
  clientList: any[] = [];
  clientListCached: any[] = [];
  vehicleList: any[] = [];
  taskList: any[] = [];
  OrgID: any;
  clients: any;
  cachedData: any[] = [];
  vehicles: any;
  // users: any;
  matchedDate: boolean = false;
  matchednote: boolean = false;
  matchedEvent: boolean = false;
  showOnlyUserTasks: boolean = false;
  User: any;
  FirstName: any;
  LastName: any;
  defaultSetting: any;
  jobType: any[] = [];
  labelStartTime1: any;
  labelStartTime2: any;
  selectedUser: string = '';
  selectedJobType: string = '';
  searchMyJob: boolean = false;
  primaryManager: any;
  secondaryManager: any;
  callOutOFficer: any;
  // jobTypes: string[] = ['Repair', 'Maintenance', 'Inspection', 'Emergency'];

  constructor(
    public router: Router,
    public clientService: ClientService,
    public vehicleService: VehicleService,
    public userService: UserService,
    private jobService: JobsService,
    private dbService: DatabaseService,
    private swUpdate: SwUpdate
  ) {
    this.updateWeek(this.currentDate);
    this.getDefaultSettings();
    // this.getEventsByDateRange();
    this.getFormFields();
    // Detect online/offline status
    window.addEventListener('online', () => (this.isOnline = true));
    window.addEventListener('offline', () => (this.isOnline = false));
    // this.getNotesByDateRange();
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
    // Check for updates
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (confirm('New update available. Load new version?')) {
          window.location.reload();
        }
      });
    }
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
    // throw new Error('Method not implemented.');
  }

  getJobsByDateRange() {
    let currentDate = this.currentDate.toISOString();
    let lastDate = this.lastDate;
    const dateRange = {
      StartDate: currentDate,
      EndDate: lastDate,
    };
    this.jobService.getJobsByDateRange(dateRange).subscribe((data) => {
      this.jobDetails = data;
      console.log('Jobs Details', data);
      this.jobDetails = data;
    });

    this.jobService.getCachedData().subscribe((cached) => {
      this.cachedjobData = cached;
      console.log('Cached Job Data:', this.cachedjobData);
    });
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

  getFormFields() {
    this.jobService.getFormFields().subscribe(
      (response) => {
        this.jobType = response[0].items;
        // localStorage.setItem('TaskList', JSON.stringify(this.tasks));
        console.log('jobType:', this.jobType);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  applyFilter() {
    if (this.showOnlyUserTasks) {
      this.jobDetails = this.jobDetails.filter(
        (task: Job) =>
          task.jobDetails[0]?.dates?.[0]?.allocStaff?.allocatedStaff?.includes(this.FirstName) ?? false
      );
    } else {
      // console.log('Apply filter2222222222222222222222ssss');
      this.jobDetails = this.jobDetails;
    }
  }
  clearCache() {
    this.dbService.clearclientData().then(() => {
      this.cachedjobData = [];
      console.log('Cache Cleared');
    });
  }

  updateWeek(date: Date = new Date()) {
    let startOfWeek = date;
    this.weekDates = [];

    for (let i = 0; i < 5; i++) {
      let newDate = new Date(startOfWeek);
      newDate.setDate(startOfWeek.getDate() + i);
      this.weekDates.push({
        dates: newDate.toLocaleDateString('en-US', {}),
        dayName: newDate.toLocaleDateString('en-US', { weekday: 'short' }),
        monthName: newDate.toLocaleDateString('en-US', { month: 'long' }),
        dayNumber: newDate.getDate(),
        selected: isToday(newDate),
        lastDate: newDate,
        // selected: this.isSameDate(newDate, this.currentDate)
      });
    }
    console.log('weekDates', this.weekDates);
    this.lastDate = this.weekDates[4].lastDate.toISOString();
    // this.lastDate.toISOString(); // Returns ISO format

    console.log('Dates', this.currentDate, this.lastDate);
    this.currentMonth = this.currentDate.toLocaleString('en-US', {
      month: 'long',
    });
    console.log("Current month", this.currentMonth);

    this.currentYear = this.currentDate.getFullYear();
    this.getJobsByDateRange();
    this.getNotesByDateRange();
    this.getEventsByDateRange();
  }

  prevWeek() {
    this.currentDate.setDate(this.currentDate.getDate() - 5);
    this.updateWeek(this.currentDate);
  }

  nextWeek() {
    this.currentDate.setDate(this.currentDate.getDate() + 5);
    this.updateWeek(this.currentDate);
  }

  selectDate(day: any, month: any) {
    // this.currentDate.setDate(day.dayNumber);
    // this.currentDate.setMonth(day., day.dayNumber)
    this.updateWeek(day.lastDate);

  }

  isSameDate(d1: Date, d2: Date): boolean {
    return (
      d1.getDate() === d2.getDate() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getFullYear() === d2.getFullYear()
    );
  }
  openCalendar() {
    this.openCalendar1 = true;
  }

  getNotesByDateRange() {
    let currentDate = this.currentDate.toISOString();
    let lastDate = this.lastDate;
    const dateRange = {
      StartDate: currentDate,
      EndDate: lastDate,
    };
    this.jobService.getetNotesByDateRange(dateRange).subscribe((data: any) => {
      this.noteDetails = data;
      console.log('Notes Details', data);
      this.noteDetails = data;
    });
  }
  getEventsByDateRange() {
    let currentDate = this.currentDate.toISOString();
    let lastDate = this.lastDate;
    const dateRange = {
      StartDate: currentDate,
      EndDate: lastDate,
    };
    this.jobService.getEventsByDateRange(dateRange).subscribe((data: any) => {
      this.eventDetails = data;
      console.log('Event Details', data);
      this.eventDetails = data;
    });
  }
  getVehicleNameById(vehicleId: any[]) {
    // debugger;
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
    const client = this.clientList.find((c) => c.clientId == clientId); // Find vehicle by ID
    return client ? client.clientName : String(clientId); // Return ShortName if found, otherwise return the vehicleId as a string
  }
  expandJobs(jobs: string) {
    console.log('Navigate to Job Expand Page', this.currentDate, this.lastDate);
    console.log('Job Details..........', jobs);

    this.router.navigate(['/job-expand'], { state: { data: jobs, date: this.currentDate, lastdate: this.lastDate } });
  }

  getElements(allocTrucks: any[]) {
    const nameOnly = allocTrucks.find((item) => typeof item === 'string');
    console.log(nameOnly);

    return nameOnly;
  }
  getNameByID(userId: any[]) {
    const user = this.userList.find((c) => c.id === userId); // Find vehicle by ID
    return user ? `${user.firstName} ${user.lastName}` : String(userId); // Return ShortName if found, otherwise return the vehicleId as a string
  }

  sendData(job: any, day: any) {
    const dateOnly = moment(
      job.jobDetailsDate,
      'YYYY-MM-DD HH:mm:ss'
    ).format('M/D/YYYY');
    const dateOnly1 = day.dates;
    if (dateOnly == dateOnly1) {
      this.matchedDate = true;
    } else {
      this.matchedDate = false;
    }
    // return dateOnly1;
  }
  sendEventData(day: any, event: any[]) {
    const dateOnly1 = day.dates;
    for (let i = 0; i < event.length; i++) {
      let dateOnly = moment(event, 'YYYY-MM-DD HH:mm:ss').format('M/D/YYYY');
      if (dateOnly == dateOnly1) {
        this.matchedEvent = true;
      } else {
        this.matchedEvent = false;
      }
    }
  }

  sendNoteData(day: any, notes: any) {
    const dateOnly = moment(notes.date, 'YYYY-MM-DD').format('M/D/YYYY');
    const dateOnly1 = day.dates;
    if (dateOnly == dateOnly1) {
      this.matchednote = true;
      this.primaryManager = this.getNameByID(notes.primaryDutyManager);
      this.secondaryManager = this.getNameByID(notes.secondaryDutyManager);
      this.callOutOFficer = this.getNameByID(notes.callOutDutyStaff);
    } else {
      this.matchednote = false;
    }
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
  filteredData(): Job[] {
    // First filter the jobs based on existing criteria
    const filteredJobs = this.jobDetails.filter((job: Job) => {
      // Check if job has any jobDetails
      if (!job.jobDetails || job.jobDetails.length === 0) return false;

      // Search match on location and contact
      const searchMatch =
        !this.searchText ||
        job.jobDetails.some((detail: JobDetail) =>
        (detail.location?.toLowerCase().includes(this.searchText.toLowerCase()) ||
          detail.contact?.toLowerCase().includes(this.searchText.toLowerCase()))
        );

      // User match across all jobDetails and their dates
      const userMatch =
        !this.selectedUser ||
        job.jobDetails.some((detail: JobDetail) =>
          detail.dates?.some((date: JobDate) =>
            date.allocStaff?.allocatedStaff?.some((staff: string) =>
              staff.toString().toLowerCase() === this.selectedUser.toLowerCase()
            ) ?? false
          ) ?? false
        );

      // Job type match (using jobCategory from root level)
      const jobTypeMatch =
        !this.selectedJobType ||
        (job.jobCategory != null &&
          String(job.jobCategory).toLowerCase() === this.selectedJobType.toLowerCase());

      // My jobs filter - check across all jobDetails and dates
      const myJob =
        !this.searchMyJob ||
        job.jobDetails.some((detail: JobDetail) =>
          detail.dates?.some((date: JobDate) =>
            date.allocStaff?.allocatedStaff?.some((staff: string) =>
              staff.toString() === this.FirstName
            ) ?? false
          ) ?? false
        );

      return searchMatch && userMatch && jobTypeMatch && myJob;
    });

    // Sort the filtered jobs by startDate
    return filteredJobs.sort((a: Job, b: Job) => {
      const dateA = new Date(a.startDate || 0);
      const dateB = new Date(b.startDate || 0);
      return dateA.getTime() - dateB.getTime();
    });
  }

  toggleMyJobs() {
    this.searchMyJob = this.showOnlyUserTasks ? this.FirstName : false;
  }
}
