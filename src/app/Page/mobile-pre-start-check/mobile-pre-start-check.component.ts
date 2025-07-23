import { Component } from '@angular/core';

@Component({
  selector: 'app-mobile-pre-start-check',
  templateUrl: './mobile-pre-start-check.component.html',
  styleUrls: ['./mobile-pre-start-check.component.css']
})
export class MobilePreStartCheckComponent {
  GUID = 'abc-123'; // Example GUID

  formData = {
    comment: '',
  };

  checklist: { label: string; status: 'YES' | 'NO' | 'N/A'; value: number | null }[] = [
    { label: 'High-visibility garments are fit for purpose, in an acceptable condition and worn correctly?', status: 'NO', value: 0 },
    { label: 'Vehicle Xenon (or LED)/Beacons are fit for purpose?', status: 'NO', value: 0 },
    { label: 'LAS/RD6/AWWMS/VMS/Horizontal arrow boards are fit for purpose?', status: 'NO', value: 0 },
    { label: 'TMAs are fit for purpose?', status: 'NO', value: 0 },
    { label: 'Two-way radios available, operating OK and batteries are fully charged?', status: 'NO', value: 0 },
    { label: 'Correct signs for work operation are fitted to all vehicles and are fit for purpose?', status: 'NO', value: 0 },
  ];

  toggleCheck(index: number): void {
    const current = this.checklist[index].status;
    let nextStatus: 'YES' | 'NO' | 'N/A';
    let mappedValue: number | null;

    if (current === 'NO') {
      nextStatus = 'YES';
      mappedValue = 1;
    } else if (current === 'YES') {
      nextStatus = 'N/A';
      mappedValue = null;
    } else {
      nextStatus = 'NO';
      mappedValue = 0;
    }

    this.checklist[index].status = nextStatus;
    this.checklist[index].value = mappedValue;
  }

  submitForm(): void {
    const Checks = this.checklist.map(item => ({
      Guid: this.GUID,
      Criterion: item.label,
      Value: item.value
    }));

    const payload = {
      Comment: this.formData.comment,
      Checks: Checks
    };

    console.log('Submitting:', payload);

    // Add your HTTP POST here if needed
  }
}