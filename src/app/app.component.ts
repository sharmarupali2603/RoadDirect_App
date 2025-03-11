import { Component, OnInit } from '@angular/core';
import { JobsService } from './Services/Jobs/jobs.service';
import { ClientService } from './Services/Client/client.service';
import { SwUpdate } from '@angular/service-worker';
import { DatabaseService, clientItem } from './Services/Database/database.service';
import { VehicleService } from './Services/Vehicle/vehicle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'MyProject';
  User: any;
  data: any;
  isOnline = navigator.onLine;
  apiData: any[] = [];
  cachedData: clientItem[] = [];
  constructor(public jobsService: JobsService,
              public clientService: ClientService,
              private swUpdate: SwUpdate,
              private dbService: DatabaseService,
              private vehicleService: VehicleService) { 
    this.fetchCurrentUser();
    this.fetchAllClient();
    this.fetchAllVehicle();
  }
  
  ngOnInit() {
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
  fetchCurrentUser() {
    this.jobsService.getCurrentUser().subscribe(
      (data) => {
        this.User = data;
        console.log('User:', this.User);
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }

  fetchAllClient() {
    const queryParams = {
      orgId: 1
    };

    this.clientService.getAllClients(queryParams).subscribe(
      (response) => {
        this.data = response;
        console.log('Client:', this.data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
    this.clientService.getCachedData().subscribe((cached) => {
      this.cachedData = cached;
      console.log('Cached Data:', this.cachedData);
      
    });
  }

  fetchAllVehicle() {
    const queryParams = {
      orgId: 1
    };

    this.vehicleService.getAllVehicle(queryParams).subscribe(
      (response) => {
        this.data = response;
        console.log('Vehicle:', this.data);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
    this.clientService.getCachedData().subscribe((cached) => {
      this.cachedData = cached;
      console.log('Cached vehicle Data:', this.cachedData);
      
    });
  }

  clearCache() {
    // this.dbService.clearData().then(() => {
    //   this.cachedData = [];
    //   console.log('Cache Cleared');
    // });
  }
}
