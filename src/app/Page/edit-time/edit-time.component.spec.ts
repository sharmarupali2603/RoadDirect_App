import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTimeComponent } from './edit-time.component';

describe('EditTimeComponent', () => {
  let component: EditTimeComponent;
  let fixture: ComponentFixture<EditTimeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTimeComponent]
    });
    fixture = TestBed.createComponent(EditTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
