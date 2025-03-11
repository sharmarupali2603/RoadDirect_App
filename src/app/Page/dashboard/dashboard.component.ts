import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { format, startOfWeek, addDays, isToday } from 'date-fns';
import { JobsService } from '../../Services/Jobs/jobs.service';
import { SwUpdate } from '@angular/service-worker';
import { DatabaseService } from '../../Services/Database/database.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  currentDate: Date = new Date();
  weekDates: any[] = [];
  cachedjobData: any[] = [];
  currentMonth: string = '';
  currentYear: number = 0;
  users = ['User 1', 'User 2', 'User 3'];
  jobs = ['User 1', 'User 2', 'User 3'];
  jobDetails: any[] = [];
  isOnline = navigator.onLine;
  openCalendar1: boolean = false;
  constructor(private jobService: JobsService, private dbService: DatabaseService,private swUpdate: SwUpdate) {
    this.updateWeek();
    this.getJobsByDateRange();
     // Detect online/offline status
     window.addEventListener('online', () => this.isOnline = true);
     window.addEventListener('offline', () => this.isOnline = false);
 
     // Check for updates
     if (this.swUpdate.isEnabled) {
       this.swUpdate.available.subscribe(() => {
         if (confirm("New update available. Load new version?")) {
           window.location.reload();
         }
       });
     }
 
  }

  getJobsByDateRange() {
    const dateRange = {
     "StartDate": "2025-02-11T11:00:00.000Z",
    "EndDate": "2025-02-18T11:00:00.000Z"
    };
    this.jobService.getJobsByDateRange(dateRange).subscribe((data) => {
      this.jobDetails.unshift(data);
      console.log('Jobs Details', data);
      this.jobDetails = data;
    });

    this.jobService.getCachedData().subscribe((cached) => {
      this.cachedjobData = cached;
      console.log('Cached Job Data:', this.cachedjobData);
      
    });
  }


  clearCache() {
    this.dbService.clearclientData().then(() => {
      this.cachedjobData = [];
      console.log('Cache Cleared');
    });
  }

  updateWeek() {
    let startOfWeek = this.getMonday(this.currentDate);
    this.weekDates = [];

    for (let i = 0; i < 7; i++) {
      let newDate = new Date(startOfWeek);
      // console.log('startDate::::::', new Date(startOfWeek));
      // console.log('lastDate::::::', newDate.setDate(startOfWeek.getDate() + i));

      newDate.setDate(startOfWeek.getDate() + i);
      this.weekDates.push({
        dayName: newDate.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: newDate.getDate(),
        selected: isToday(newDate),
        // selected: this.isSameDate(newDate, this.currentDate)
      });
    }

    this.currentMonth = this.currentDate.toLocaleString('en-US', {
      month: 'long',
    });
    this.currentYear = this.currentDate.getFullYear();
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
}
