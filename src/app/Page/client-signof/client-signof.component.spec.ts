import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientSignofComponent } from './client-signof.component';

describe('ClientSignofComponent', () => {
  let component: ClientSignofComponent;
  let fixture: ComponentFixture<ClientSignofComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientSignofComponent]
    });
    fixture = TestBed.createComponent(ClientSignofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
