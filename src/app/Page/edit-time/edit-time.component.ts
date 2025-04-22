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
  console.log("timeeee",this.submitTime);
  this.editDate=format(parseISO(this.submitTime), 'yyyy-MM-dd');
  console.log("date",this.editDate);
  
  this.editTime=format(parseISO(this.submitTime), 'HH:mm');
}else{
  this.editDate=format(parseISO(this.finishTime), 'yyyy-MM-dd');
  this.editTime=format(parseISO(this.finishTime), 'HH:mm');
}
 
}
  setQuickTime(time: string) {
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
}
