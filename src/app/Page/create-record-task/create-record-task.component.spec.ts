import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRecordTaskComponent } from './create-record-task.component';

describe('CreateRecordTaskComponent', () => {
  let component: CreateRecordTaskComponent;
  let fixture: ComponentFixture<CreateRecordTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateRecordTaskComponent]
    });
    fixture = TestBed.createComponent(CreateRecordTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
