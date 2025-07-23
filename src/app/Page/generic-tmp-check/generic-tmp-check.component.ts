import { Component } from '@angular/core';

@Component({
  selector: 'app-generic-tmp-check',
  templateUrl: './generic-tmp-check.component.html',
  styleUrls: ['./generic-tmp-check.component.css']
})
export class GenericTmpCheckComponent {
 formData: any = {
    siteReference: '',
    siteName: ''
    // other fields auto-bind with *ngFor
  };

  sections = [
    {
      key: 'roadLevel',
      title: 'Road level',
      description: 'Is this at the correct road level?'
    },
    {
      key: 'shape',
      title: 'Shape',
      description: 'Intersections, Vertical Curves (hills), Horizontal Curves, Sufficient advance warning'
    },
    {
      key: 'directionProtection',
      title: 'Direction and protection',
      description: 'Check length, width, sight distance, and room for positive traffic control'
    },
    {
      key: 'proposedSpeed',
      title: 'Proposed speed restrictions',
      description: 'Is a TSL required?'
    },
    {
      key: 'plantEquipment',
      title: 'Plant and equipment',
      description: 'Is plant and equipment fit within designated safety areas?'
    },
    {
      key: 'personalSafety',
      title: 'Personal safety',
      description: 'Are all workers safe within the work zone?'
    },
    {
      key: 'layoutDiagrams',
      title: 'Layout diagrams',
      description: 'Is diagram detailed in the TMP?'
    },
    {
      key: 'rcaNotification',
      title: 'RCA notification',
      description: 'Has the RCA been notified?'
    }
  ];

  saveForm() {
    console.log(this.formData);
    // send to API or service
  }
}
