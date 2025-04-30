import { Component } from '@angular/core';
import { JobsService } from 'src/app/Services/Jobs/jobs.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  User: any
  FirstName: string = '';
  LastName: string = '';
  PageTitle: string = "Calendar";

  constructor(public jobsService: JobsService,) {
    if (localStorage.getItem('User')) {
      const userData = localStorage.getItem('User');
      this.User = userData ? JSON.parse(userData) : null;
      console.log('User:', this.User);
      this.FirstName = this.User.firstName;
      this.LastName = this.User.lastName;
      console.log('FirstName:', this.FirstName);
      console.log('LastName:', this.LastName);
    }
  }

  fetchCurrentUser() {
    this.jobsService.getCurrentUser().subscribe(
      (data) => {
        this.User = data;
        this.FirstName = this.User.firstName;
        this.LastName = this.User.lastName;
        console.log('User:', this.User);
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }
}
