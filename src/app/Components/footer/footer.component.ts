import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
activeRoute: any= '/dashboard';;

constructor(private router: Router) {
  // this.activeRoute = "/dashboard";
  this.router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      this.activeRoute = event.url;
    }
  });
}
}
