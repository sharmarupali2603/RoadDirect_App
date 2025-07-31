import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationnalRecordComponent } from './operationnal-record.component';

describe('OperationnalRecordComponent', () => {
  let component: OperationnalRecordComponent;
  let fixture: ComponentFixture<OperationnalRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OperationnalRecordComponent]
    });
    fixture = TestBed.createComponent(OperationnalRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
