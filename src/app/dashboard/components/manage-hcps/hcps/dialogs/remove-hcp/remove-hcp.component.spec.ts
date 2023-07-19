import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveHcpComponent } from './remove-hcp.component';

describe('RemoveHcpComponent', () => {
  let component: RemoveHcpComponent;
  let fixture: ComponentFixture<RemoveHcpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveHcpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveHcpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
