import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/Services/Client/client.service';
import { JobsService } from 'src/app/Services/Jobs/jobs.service';
import { UserService } from 'src/app/Services/Users/user.service';
import { VehicleService } from 'src/app/Services/Vehicle/vehicle.service';
@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrls: ['./job-card.component.css'],
})
export class JobCardComponent {
  jobDetails: any[] = [];
  noteDetails: any[] = [];
  cachedjobData: any[] = [];
  clientList: any[] = [];
  clientListCached: any[] = [];
  vehicleList: any[] = [];
  userList: any[] = [];
  OrgID: any;
  clients: any;
  cachedData: any[] = [];
  vehicles: any;
  users: any;

  constructor(
    private jobService: JobsService,
    public router: Router,
    public clientService: ClientService,
    public vehicleService: VehicleService,
    public userService: UserService
  ) {
    this.getJobsByDateRange();
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
  }

  getJobsByDateRange() {
    const dateRange = {
      StartDate: '2025-02-20T11:00:00.000Z',
      EndDate: '2025-03-18T11:00:00.000Z',
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

  getNotesByDateRange() {
    const dateRange = {
      StartDate: '2025-02-20T11:00:00.000Z',
      EndDate: '2025-03-18T11:00:00.000Z',
    };
    this.jobService.getetNotesByDateRange(dateRange).subscribe((data) => {
      this.noteDetails.unshift(data);
      console.log('Notes Details', data);
      this.noteDetails = data;
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


  getClosureOptions(rowData1: any[]) {
    if ((rowData1 != null || rowData1 != undefined) && rowData1.length > 0) {
      return rowData1.map((c) => (c.option || c)).join(', ');
    }
    return '';
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

}
