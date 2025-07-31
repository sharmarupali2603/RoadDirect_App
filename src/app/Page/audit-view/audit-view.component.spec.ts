import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuditViewComponent } from './audit-view.component';

describe('AuditViewComponent', () => {
  let component: AuditViewComponent;
  let fixture: ComponentFixture<AuditViewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuditViewComponent]
    });
    fixture = TestBed.createComponent(AuditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
