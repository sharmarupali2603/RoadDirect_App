import { Component , TemplateRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  activeRoute: any = '/dashboard';;
modalRef?: BsModalRef;
  constructor(private router: Router,private modalService: BsModalService) {
    // this.activeRoute = "/dashboard";
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = event.url;
      }
    });
  }
  // menu(){
  //   if(this.activeRoute === '/menu') {
  //   this.router.navigate(['/dashboard']);
  //   }
  //   else {
  //     this.router.navigate(['/menu']);
  //   }
  // }
  openMenu(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {
      class: 'modal-dialog-centered modal-lg'
    });
  }

 navigateTo(path: string,mode:string) {
    this.modalRef?.hide();
  this.router.navigate([path], {
    state: {
      mode:mode 
    }});     // Navigate to route
  }
  }

