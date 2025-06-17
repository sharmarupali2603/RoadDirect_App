import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tsl',
  templateUrl: './tsl.component.html',
  styleUrls: ['./tsl.component.css']
})
export class TSLComponent {

  tslForm: FormGroup;
 mode: any = 'add';
  constructor(private fb: FormBuilder, public route: Router
  ) {
      const navigation = this.route.getCurrentNavigation();
      this.mode = navigation?.extras.state?.['mode'] || {};
      console.log('mode', this.mode);
    this.tslForm = this.fb.group({
      installedDate: [''],
      installedTime: [''],
      speed: [''],
      roadName: [''],
      from: [''],
      to: [''],
      length: [''],
      isRemoved: [false],
      removedDate: [''],
      removedTime: ['']
    });
  }
}
