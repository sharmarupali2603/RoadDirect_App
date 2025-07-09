import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolboxBriefingsComponent } from './toolbox-briefings.component';

describe('ToolboxBriefingsComponent', () => {
  let component: ToolboxBriefingsComponent;
  let fixture: ComponentFixture<ToolboxBriefingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ToolboxBriefingsComponent]
    });
    fixture = TestBed.createComponent(ToolboxBriefingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
