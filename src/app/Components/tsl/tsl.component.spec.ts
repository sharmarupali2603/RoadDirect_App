import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TSLComponent } from './tsl.component';

describe('TSLComponent', () => {
  let component: TSLComponent;
  let fixture: ComponentFixture<TSLComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TSLComponent]
    });
    fixture = TestBed.createComponent(TSLComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
