import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { ClientService } from './Services/Client/client.service';
import { DatabaseService, clientItem } from './Services/Database/database.service';
import { JobsService } from './Services/Jobs/jobs.service';
import { UserService } from './Services/Users/user.service';
import { VehicleService } from './Services/Vehicle/vehicle.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MyProject';
  User: any;
  data: any;
  tasks: any;
  isOnline = navigator.onLine;
  apiData: any[] = [];
  cachedData: clientItem[] = [];
  clients: any;
  vehicles: any;
  users: any;
  constructor(public jobsService: JobsService,
    public clientService: ClientService,
    private swUpdate: SwUpdate,
    private dbService: DatabaseService,
    private vehicleService: VehicleService,
    public userService: UserService
  ) {
    this.fetchCurrentUser();
    this.fetchAllClient();
    this.fetchAllVehicle();
    this.fetchAllTask();
    this.fetchAllUser();
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
        localStorage.setItem('User', JSON.stringify(this.User));
        console.log('User:', this.User);
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }






  clearCache() {
    // this.dbService.clearData().then(() => {
    //   this.cachedData = [];
    //   console.log('Cache Cleared');
    // });
  }



  fetchAllClient() {
    this.clientService.getAllClients().subscribe(
      (response) => {
        this.clients = response;
        localStorage.setItem('ClientList', JSON.stringify(this.clients));

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
    this.vehicleService.getAllVehicle().subscribe(
      (response) => {
        this.vehicles = response;
        localStorage.setItem('VehicleList', JSON.stringify(this.vehicles));
        console.log('Vehicle:', this.vehicles);

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

  fetchAllUser() {
    this.userService.getAllUsers().subscribe(
      (response) => {
        this.users = response;
        localStorage.setItem('UserList', JSON.stringify(this.users));
        console.log('users:', this.users);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    )
  }

  fetchAllTask() {
    this.jobsService.getMyTasks().subscribe(
      (response) => {
        this.tasks = response;
        localStorage.setItem('TaskList', JSON.stringify(this.tasks));
        console.log('tasks:', this.tasks);
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    )
  }
}
