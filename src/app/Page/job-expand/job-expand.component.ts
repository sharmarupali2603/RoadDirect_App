import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
    console.log('Enter in expand job page');
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

      // console.log(parsedData[0].option);
      return parsedData[0].option;
    }
  }

  getTypeOfWork(rowData1: any) {
    debugger;
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
    debugger;
    // const result = clientId.map((item, index) => {
    const client = this.clientList.find((c) => c.ClientId === clientId); // Find vehicle by ID
    return client ? client.ClientName : String(clientId); // Return ShortName if found, otherwise return the vehicleId as a string
    // });
    // return result;
  }
  collapseJobs() {
    this.route.navigate(['/dashboard']);
  }

  getClosure(rawData1: any) {
    if (rawData1 != null || rawData1 != undefined) {

      const rawData =
        '[{option: "H", fullName: "Hire (Client picking up hire gear, get ready for pick up)"}]';
      const fixedData = rawData1.replace(/(\w+):/g, '"$1":'); // Fix keys without quotes
      const parsedData = JSON.parse(fixedData);

      // console.log(parsedData[0].fullName);
      return parsedData[0].fullName;
    }
  }

}
