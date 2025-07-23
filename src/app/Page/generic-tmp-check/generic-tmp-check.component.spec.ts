import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericTmpCheckComponent } from './generic-tmp-check.component';

describe('GenericTmpCheckComponent', () => {
  let component: GenericTmpCheckComponent;
  let fixture: ComponentFixture<GenericTmpCheckComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenericTmpCheckComponent]
    });
    fixture = TestBed.createComponent(GenericTmpCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
