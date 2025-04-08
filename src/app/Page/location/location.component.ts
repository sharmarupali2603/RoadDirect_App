import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {
  mapUrl = '';
  location='';
constructor(public route:  Router){
  const navigation = this.route.getCurrentNavigation();
  this.location = navigation?.extras.state?.['location'] || {};
  console.log("Job>>>>>>>>>>>",this.location);
  // const location = 'Eiffel Tower, Paris';
  this.mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(this.location)}&output=embed`;
  
}
  ngOnInit() {
    // const location = 'Eiffel Tower, Paris';
    // this.mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(location)}&output=embed`;
  }
  
}
