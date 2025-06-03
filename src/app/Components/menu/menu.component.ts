import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
 showToolbox = false;

  generalItems = [
    { label: 'Add Callout Job', icon: 'delivery_truck_speed' },
    { label: 'Vehicle Checks', icon: 'bi bi-truck' },
    { label: 'Auditing', icon: 'bi bi-clipboard-check' }
  ];

  onsiteItems = [
    { label: 'Site Inspections', icon: 'bi bi-building' },
    { label: 'Temporary Speed Limits', icon: 'bi bi-speedometer2' },
    { label: 'Handovers and Delegations', icon: 'bi bi-person' },
    { label: 'Toolbox Briefings', icon: 'bi bi-tools' }
  ];

  resourceItems = [
    { label: 'Announcements', icon: 'bi bi-megaphone' },
    { label: 'Library', icon: 'bi bi-journal-bookmark' },
    { label: 'Guides', icon: 'bi bi-book' }
  ];

  constructor(public route : Router){

  }

  site_inspection(){
    // Logic for site inspection
    console.log('Site Inspection clicked');
    this.route.navigate(['/site-inspection']);
  }
}
