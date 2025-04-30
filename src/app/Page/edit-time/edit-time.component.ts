import { Component, OnInit, Input } from '@angular/core';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { TrackingService } from 'src/app/Services/Tracking/tracking.service';
import { format, parseISO } from 'date-fns';
@Component({
  selector: 'app-edit-time',
  templateUrl: './edit-time.component.html',
  styleUrls: ['./edit-time.component.css']
})
export class EditTimeComponent {
  editDate: any ;
  editTime: any;
  
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
  title: string = 'edit time';
  task:any;
  submitTime:any;
  finishTime:any;
  time1:any;
  time2:any;
constructor(    private fb: FormBuilder,
    private http: HttpClient,
    public route: Router,
    public trackingService: TrackingService){
  const navigation = this.route.getCurrentNavigation();
  this.jobs = navigation?.extras.state?.['data'] || {};
  console.log('Job>>>>>>>>>>>', this.jobs);
  this.currentDate = navigation?.extras.state?.['date'] || {};
  this.lastDate = navigation?.extras.state?.['lastdate'] || {};
  this.jobDetails = navigation?.extras.state?.['jobDetails'] || {};
  this.jobDate = navigation?.extras.state?.['jobDate'] || {}; 
  this.clientId = navigation?.extras.state?.['clientID'] || {};
  this.submitTime = navigation?.extras.state?.['SubmitTime'] || {};
  this.finishTime = navigation?.extras.state?.['finishTime'];
  this.title = navigation?.extras.state?.['title'];
  this.taskId = navigation?.extras.state?.['taskId'] || {};
if(this.title == 'edit time'){
  const date = new Date(this.submitTime);
 this.submitTime = date.toISOString();
  console.log("timeeee",this.submitTime);
  this.editDate=format(parseISO(this.submitTime), 'yyyy-MM-dd');
  console.log("date",this.editDate);
  
  this.editTime=format(parseISO(this.submitTime), 'HH:mm');
}else{
  this.editDate=format(parseISO(this.finishTime), 'yyyy-MM-dd');
  this.editTime=format(parseISO(this.finishTime), 'HH:mm');
}
console.log("edit time",this.editTime);

const result = this.getNearest15MinuteTimes(this.editTime); // input as "HH:mm"
this.time1 = result.previous; // "9:15AM"
this.time2 = result.next;     // "9:30AM"
console.log(result.previous); // "9:15AM"
console.log(result.next);     // "9:30AM"
// const baseTime =  this.editTime;
// const added = this.adjustTime(baseTime, 15);   // ➕ Add 15 minutes
// const subtracted = this.adjustTime(baseTime, -15); // ➖ Subtract 15 minutes

// console.log("Added 15 mins:", added);       // Output: "04:07"
// console.log("Subtracted 15 mins:", subtracted); // Output: "03:37"
}
  setQuickTime(time: string) {
    console.log('Selected time:', time);
    this.editTime = time;
  }
saveTime(){
  const today = new Date();
    const postData = {
      taskId: this.taskId,
      Status: '6',
      TaskTime:  this.editDate + 'T' + this.editTime,
    };

    this.trackingService.updateTaskTime(postData).subscribe({
      next: (res) => {
        if(this.title == 'edit time'){
          localStorage.setItem('UpdatedTime', JSON.stringify(this.editDate + 'T' + this.editTime));
        }else{
          localStorage.setItem('finishTime', JSON.stringify(this.editDate + 'T' + this.editTime));
        }
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
        alert('✅' + res);
      },
      error: (err) => {
        alert('❌ Task submission failed!');
        console.error(err);
      },
    });
}
  cancel(){
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

  adjustTime(baseTime: string, minutes: number): string {
    // Create a dummy Date using today's date and the base time
    const [hours, mins] = baseTime.split(':').map(Number);
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(mins + minutes); // Add/subtract minutes
  
    // Format to HH:MM with leading zeros if needed
    const adjustedHours = date.getHours().toString().padStart(2, '0');
    const adjustedMinutes = date.getMinutes().toString().padStart(2, '0');
  
    return `${adjustedHours}:${adjustedMinutes}`;
  }
  
   getNearest15MinuteTimes(timeStr: string): { previous: string; next: string } {
    const [hours, minutes] = timeStr.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);

  const totalMinutes = hours * 60 + minutes;

  const previous = Math.floor(totalMinutes / 15) * 15;
  const next = previous + 15;

  const prevDate = new Date(date);
  prevDate.setHours(Math.floor(previous / 60));
  prevDate.setMinutes(previous % 60);

  const nextDate = new Date(date);
  nextDate.setHours(Math.floor(next / 60));
  nextDate.setMinutes(next % 60);

  // ✅ Format for <input type="time"> – HH:mm (24-hour)
  const formatTime = (d: Date): string => {
    const hh = d.getHours().toString().padStart(2, '0');
    const mm = d.getMinutes().toString().padStart(2, '0');
    return `${hh}:${mm}`;
  };

  return {
    previous: formatTime(prevDate),
    next: formatTime(nextDate),
  };
  }
}
