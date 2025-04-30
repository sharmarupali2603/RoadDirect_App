import { Injectable } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
// declare var require: any;
import { format, parseISO } from 'date-fns';
@Injectable({
  providedIn: 'root'
})
export class PdfService {
  constructor() {
    (pdfMake as any).vfs = (pdfFonts as any).vfs;
  }

  generatePdf(details: { jobs: any, jobDetails: any, jobDate: any,clientID:any}) {
    const startTime1 = format(parseISO(details.jobDate.startTime.startTime1), 'dd-MM-yyyy');
    const startTime2 = format(parseISO(details.jobDate.startTime.startTime2), 'dd-MM-yyyy');
    const docDefinition = {
      content: [
        { text: 'Job #'+details.jobDetails.jobId, style: 'header' },
        { text: startTime1 +'-' + startTime2, style: 'subheader' },

        { text: 'Times', style: 'sectionHeader' },
        'Be at Depot\nSite setup by\nTMP Window Times\nPeak Flows\nAttended: '+ details.jobDetails.attended +'\n\n',

        { text: 'Contact Details', style: 'sectionHeader' },
        'Client:'+ details.clientID  +'\nPhone\nPrincipal:'+  details.clientID +'\nContact Name\nEmail\nSTMS Onsite In Charge\nTC Onsite\n\n',

        { text: 'Job Details', style: 'sectionHeader' },
        'Location:' +details.jobDetails.location+'\nJob Notes\n\n' +
        'Significant Stages\nSetup - Identified Risks/Hazards\nSetup - Proposed Control Measures\n' +
        'Operation - Identified Risks/Hazards\nOperation - Proposed Control Measures\nPPE Requirements Onsite\nBreak Plan\n\n' +

        'Work Area : '+ details.jobDetails.workArea+'\nWork Activity: Sealing work\nLocation Reference\nYour Reference No.: B\n' +
        'Setup Importance / Rating: Standard\nAADT\nNumber of Lanes\nRoad Level\nRoad Category\nExcavations Unattended\n\n' +

        'Client Plant and Equipment Used Onsite for the Job\nRemove Parks\n\n',

        { text: 'TTM Details', style: 'sectionHeader' },
        'Traffic TTM Closure\nPedestrian and Cyclist TTM Closure\nPositive TTM\n' +
        'Intersection or Lights Affected?\nUnattended TTM Left Out\nPedestrian Control Required\n' +
        'Temporary Speed Limit\nPermanent Speed Limit\nDon’t Drop Lane Before\nEstimated Setup Time\n' +
        'Drop Zones Required for the Work Area\nContingency Plan TTM\nLetter Drop Required?\nVMS Required?\n\n',

        { text: 'Admin', style: 'sectionHeader' },
        'Job Created By: Daniel Stocker\nRCA\nCOMS/BUSES/Affected Persons\nNew Client?\n\n',

        { text: 'Site Photos', style: 'sectionHeader' },
       
      ],
      styles: {
        header: { fontSize: 20, bold: true, alignment: 'Left', margin: [0, 0, 0, 10] },
        subheader: { fontSize: 14, bold: true, alignment: 'left', margin: [0, 0, 0, 10] },
        sectionHeader: { width: 100, fontSize: 12, bold: true, background: '#7dccba', color: '#003366', margin: [0, 10, 0, 4] }
      },
      defaultStyle: {
        fontSize: 10
      }
    };

    (pdfMake as any).createPdf(docDefinition).download(`Job Details - Job ${details.jobDetails.jobId}.pdf`);
  }
}
