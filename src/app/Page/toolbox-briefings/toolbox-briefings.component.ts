import { Component } from '@angular/core';

@Component({
  selector: 'app-toolbox-briefings',
  templateUrl: './toolbox-briefings.component.html',
  styleUrls: ['./toolbox-briefings.component.css']
})
export class ToolboxBriefingsComponent {
  selectedTab = 'hazards';

  selectTab(event: Event, tab: string) {
    event.preventDefault(); // Prevent the default anchor behavior
    this.selectedTab = tab;
  }
}
