import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { isToday } from 'date-fns';
import * as moment from 'moment';
import { ClientService } from 'src/app/Services/Client/client.service';
import { UserService } from 'src/app/Services/Users/user.service';
import { VehicleService } from 'src/app/Services/Vehicle/vehicle.service';
import { DatabaseService } from '../../Services/Database/database.service';
import { JobsService } from '../../Services/Jobs/jobs.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  currentDate: Date = new Date();
  weekDates: any[] = [];
  lastDate: any;
  cachedjobData: any[] = [];
  currentMonth: string = '';
  currentYear: number = 0;
  users = ['User 1', 'User 2', 'User 3'];
  jobs = ['User 1', 'User 2', 'User 3'];
  jobDetails: any[] = [];
  isOnline = navigator.onLine;
  openCalendar1: boolean = false;
  userList: any[] = [];
  searchText: string = '';
  searchText1: string = '';
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
  showOnlyUserTasks: boolean = false;
  User: any;
  FirstName: any;
  LastName: any;
  defaultSetting: any;
  labelStartTime1: any;
  labelStartTime2: any;
  constructor(
    public router: Router,
    public clientService: ClientService,
    public vehicleService: VehicleService,
    public userService: UserService,
    private jobService: JobsService,
    private dbService: DatabaseService,
    private swUpdate: SwUpdate
  ) {
    this.updateWeek();
    this.getDefaultSettings();
    this.getEventsByDateRange();
    // Detect online/offline status
    window.addEventListener('online', () => (this.isOnline = true));
    window.addEventListener('offline', () => (this.isOnline = false));
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
  filteredData(Event: any) {
    if (Event) {
      return this.jobDetails.filter((item) =>
        item.jobDetails[0].dates[0].allocStaff.allocatedStaff
          .toLowerCase()
          .includes(this.FirstName.toLowerCase())
      );
    } else {
      return this.jobDetails.filter(
        (item) =>
          item.jobDetails[0].location
            .toLowerCase()
            .includes(this.searchText.toLowerCase()) ||
          item.principalId.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }

  getDefaultSettings() {
    this.jobService.getDefaultSettings().subscribe(
      (response) => {
        this.defaultSetting = response;
        this.labelStartTime1 = this.defaultSetting.labelStartTime1;
        this.labelStartTime2 = this.defaultSetting.labelStartTime2;
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    )
  }
  applyFilter() {
    if (this.showOnlyUserTasks) {
      this.jobDetails = this.jobDetails.filter(
        (task) =>
          task.jobDetails[0].dates[0].allocStaff.allocatedStaff ===
          this.FirstName
      );
    } else {
      this.jobDetails = this.jobDetails;
    }
  }
  clearCache() {
    this.dbService.clearclientData().then(() => {
      this.cachedjobData = [];
      console.log('Cache Cleared');
    });
  }

  updateWeek() {
    let startOfWeek = this.currentDate;
    this.weekDates = [];

    for (let i = 0; i < 5; i++) {
      let newDate = new Date(startOfWeek);

      newDate.setDate(startOfWeek.getDate() + i);
      this.weekDates.push({
        dates: newDate.toLocaleDateString('en-US', {}),
        dayName: newDate.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: newDate.getDate(),
        selected: isToday(newDate),
        lastDate: newDate,
      });
    }
    this.lastDate = this.weekDates[4].lastDate.toISOString();

    console.log('Dates', this.currentDate, this.lastDate);
    this.currentMonth = this.currentDate.toLocaleString('en-US', {
      month: 'long',
    });
    this.currentYear = this.currentDate.getFullYear();
    this.getJobsByDateRange();
  }

  getMonday(d: Date): Date {
    d = new Date(d);
    let day = d.getDay(),
      diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  }

  prevWeek() {
    this.currentDate.setDate(this.currentDate.getDate() - 7);
    this.updateWeek();
  }

  nextWeek() {
    this.currentDate.setDate(this.currentDate.getDate() + 7);
    this.updateWeek();
  }

  selectDate(day: any) {
    this.currentDate.setDate(day.dayNumber);
    this.updateWeek();
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
    this.jobService.getetNotesByDateRange(dateRange).subscribe((data) => {
      this.noteDetails.unshift(data);
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
    this.jobService.getEventsByDateRange(dateRange).subscribe((data) => {
      this.eventDetails.unshift(data);
      console.log('Event Details', data);
      this.eventDetails = data;
    });
  }
  getVehicleNameById(vehicleId: any) {
    // If vehicleId is a string, return it directly
    if (typeof vehicleId === 'string') {
      let result = vehicleId.slice(1, -1).split(','); // Remove the brackets and split by commas
      let cleanedResult = result.map((item) => item.replace(/['"\s]/g, ''));
      return this.getVehicleNamebyID(cleanedResult);
    }
    // If vehicleId is an object (not an array), extract the 'name' property
    if (
      vehicleId &&
      typeof vehicleId === 'object' &&
      !Array.isArray(vehicleId)
    ) {
      return vehicleId.name || String(vehicleId);
    }

    // If vehicleId is an array, extract 'name' from each object and join them with commas
    if (Array.isArray(vehicleId)) {
      const names = vehicleId.map((item) => item.name).join(', ');
      return names || String(vehicleId);
    }
    // If vehicleId is neither a string, object, nor array, return it as a string
    return String(vehicleId);
  }
  getStaffNameById(staffId: any) {
    // If vehicleId is a string, return it directly
    if (typeof staffId === 'string') {
      let result = staffId.slice(1, -1).split(','); // Remove the brackets and split by commas
      let cleanedResult = result.map((item) => item.replace(/['"\s]/g, ''));
      return this.getUserNamebyID(cleanedResult);
    }
    // If vehicleId is an object (not an array), extract the 'name' property
    if (staffId && typeof staffId === 'object' && !Array.isArray(staffId)) {
      return staffId.name || String(staffId);
    }

    // If vehicleId is an array, extract 'name' from each object and join them with commas
    if (Array.isArray(staffId)) {
      const names = staffId.map((item) => item.name).join(', ');
      return names || String(staffId);
    }
    // If vehicleId is neither a string, object, nor array, return it as a string
    return String(staffId);
  }


  getClosureOptions(rowData1: any) {
    if (rowData1 != null || rowData1 != undefined) {
      const fixedData = rowData1.replace(/(\w+):/g, '"$1":'); // Fix keys without quotes
      const parsedData = JSON.parse(fixedData);
      for (let i = 0; i <= parsedData.length; i++) {
        if (parsedData[i]) {
          if (parsedData[i].option) {
            return parsedData[i].option;
          } else {
            return parsedData;
          }
        } else {
          return parsedData;
        }
      }
    }
  }
  getVehicleNamebyID(vehicleId: any[]) {
    const result = vehicleId.map((item, index) => {
      const vehicle = this.vehicleList.find((c) => c.Id === item); // Find vehicle by ID
      return vehicle ? vehicle.ShortName : String(item); // Return ShortName if found, otherwise return the vehicleId as a string
    });
    return result;
  }

  getUserNamebyID(userId: any[]) {
    const result = userId.map((item, index) => {
      const user = this.userList.find((c) => c.Id === item); // Find vehicle by ID
      return user ? `${user.firstName} ${user.lastName}` : String(item); // Return ShortName if found, otherwise return the vehicleId as a string
    });
    return result;
  }
  getClientNamebyID(clientId: any) {
    const client = this.clientList.find((c) => c.ClientId === clientId); // Find vehicle by ID
    return client ? client.ClientName : String(clientId); // Return ShortName if found, otherwise return the vehicleId as a string
  }
  expandJobs(jobs: string) {
    this.router.navigate(['/job-expand'], { state: { data: jobs } });
  }

  getElements(allocTrucks: any[]) {
    const nameOnly = allocTrucks.find((item) => typeof item === 'string');
    console.log(nameOnly);

    return nameOnly;
  }
  getNameByID(userId: any[]) {
    const user = this.userList.find((c) => c.Id === userId); // Find vehicle by ID
    return user ? `${user.firstName} ${user.lastName}` : String(userId); // Return ShortName if found, otherwise return the vehicleId as a string
  }

  sendData(jobs: any, day: any) {
    const dateOnly = moment(
      jobs.jobDetails[0].dates[0].jobDetailsDate,
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

  sendNoteData(day: any, notes: any) {
    const dateOnly = moment(notes.Date, 'YYYY-MM-DD HH:mm:ss').format(
      'M/D/YYYY'
    );
    const dateOnly1 = day.dates;
    if (dateOnly == dateOnly1) {
      // console.log("matched")
      this.matchednote = true;
    } else {
      this.matchednote = false;
    }
  }

  getTaskStatus(jobs: any, userId: any[]) {
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
      return jobs.id
    }
  }
}
