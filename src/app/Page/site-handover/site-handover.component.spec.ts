import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteHandoverComponent } from './site-handover.component';

describe('SiteHandoverComponent', () => {
  let component: SiteHandoverComponent;
  let fixture: ComponentFixture<SiteHandoverComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SiteHandoverComponent]
    });
    fixture = TestBed.createComponent(SiteHandoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
