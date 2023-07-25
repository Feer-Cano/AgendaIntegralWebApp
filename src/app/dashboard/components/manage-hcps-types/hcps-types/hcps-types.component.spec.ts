import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HcpsTypesComponent } from './hcps-types.component';

describe('HcpsTypesComponent', () => {
  let component: HcpsTypesComponent;
  let fixture: ComponentFixture<HcpsTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HcpsTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HcpsTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
