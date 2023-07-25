import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveHcpTypesComponent } from './remove-hcp-types.component';

describe('RemoveHcpTypesComponent', () => {
  let component: RemoveHcpTypesComponent;
  let fixture: ComponentFixture<RemoveHcpTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveHcpTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveHcpTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
