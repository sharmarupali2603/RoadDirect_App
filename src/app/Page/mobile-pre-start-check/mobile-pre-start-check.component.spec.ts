import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilePreStartCheckComponent } from './mobile-pre-start-check.component';

describe('MobilePreStartCheckComponent', () => {
  let component: MobilePreStartCheckComponent;
  let fixture: ComponentFixture<MobilePreStartCheckComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobilePreStartCheckComponent]
    });
    fixture = TestBed.createComponent(MobilePreStartCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
