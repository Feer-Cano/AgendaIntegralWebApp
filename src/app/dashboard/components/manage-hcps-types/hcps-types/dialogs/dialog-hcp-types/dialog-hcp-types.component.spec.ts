import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogHcpTypesComponent } from './dialog-hcp-types.component';

describe('DialogHcpTypesComponent', () => {
  let component: DialogHcpTypesComponent;
  let fixture: ComponentFixture<DialogHcpTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogHcpTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogHcpTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
