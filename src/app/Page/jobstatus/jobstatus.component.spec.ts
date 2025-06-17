import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobstatusComponent } from './jobstatus.component';

describe('JobstatusComponent', () => {
  let component: JobstatusComponent;
  let fixture: ComponentFixture<JobstatusComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobstatusComponent]
    });
    fixture = TestBed.createComponent(JobstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
