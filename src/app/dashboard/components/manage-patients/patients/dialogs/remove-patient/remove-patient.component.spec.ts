import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemovePatientComponent } from './remove-patient.component';

describe('RemovePatientComponent', () => {
  let component: RemovePatientComponent;
  let fixture: ComponentFixture<RemovePatientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemovePatientComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemovePatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
