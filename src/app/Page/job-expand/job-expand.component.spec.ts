import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobExpandComponent } from './job-expand.component';

describe('JobExpandComponent', () => {
  let component: JobExpandComponent;
  let fixture: ComponentFixture<JobExpandComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JobExpandComponent]
    });
    fixture = TestBed.createComponent(JobExpandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
