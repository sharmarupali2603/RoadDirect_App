import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-record-task',
  templateUrl: './create-record-task.component.html',
  styleUrls: ['./create-record-task.component.css']
})
export class CreateRecordTaskComponent {
  resources: string[] = ['Truck 1', 'Truck 2', 'Driver A'];
  selectedResource: string = '';
  notes: string = '';

  jobs: any;
  jobDetails: any;
  jobDate: any;
  clientId:any;
  constructor(public route: Router){
    const navigation = this.route.getCurrentNavigation();
    this.jobs = navigation?.extras.state?.['data'] || {};
    console.log('Job>>>>>>>>>>>', this.jobs);
    this.jobDetails = navigation?.extras.state?.['jobDetails'] || {};
    this.jobDate = navigation?.extras.state?.['jobDate'] || {};
    this.clientId= navigation?.extras.state?.['clientID'] || {};
    console.log(' this.clientId>>>>>>>>>>>',  this.clientId);
  }
}
