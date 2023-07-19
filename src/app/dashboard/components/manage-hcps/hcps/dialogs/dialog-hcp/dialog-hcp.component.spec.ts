import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHcpComponent } from './dialog-hcp.component';

describe('DialogHcpComponent', () => {
  let component: NewHcpComponent;
  let fixture: ComponentFixture<NewHcpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewHcpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewHcpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
