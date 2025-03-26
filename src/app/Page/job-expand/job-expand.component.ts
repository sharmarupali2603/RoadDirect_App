import { Component, OnInit,Input, Output, EventEmitter} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  date: string = 'Wednesday 23 February 2025';
  managers = ['Mike Brown', 'Harrison Sieges'];
  callOutStaff = 'Alice France';
  company = 'Unison Contracting Services Limited';
  location = '148 King Edward Street, South Dunedin, Dunedin';
  startTime = 'All Day, Setup by: 7:00AM';
  typeOfWork = 'LV Reconductoring, Power Pole Replacements';
  tasks = [
    {
      title: 'TTM Road Set-Up',
      description:
        'The Shoulder area of the road will be closed using cones & taper, King Edward Street, Remove FC signage from Rankeilor Street.',
    },
    {
      title: 'TTM Footpath Set-Up',
      description:
        'Footpath Closed. This is the preferred risk assessment option for foot traffic based on keeping pedestrians away from walking past the work activity.',
    },
  ];
  constructor(private route: Router) {
    const navigation = this.route.getCurrentNavigation();
    this.jobs = navigation?.extras.state?.['data'] || {};
    console.log('Job Details..........', this.jobs);
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
  }

  ngOnInit(): void {
    console.log("Enter in expand job page");
    
  }
  collapseJobs(){
     this.route.navigate(['/dashboard']);
  }
}
