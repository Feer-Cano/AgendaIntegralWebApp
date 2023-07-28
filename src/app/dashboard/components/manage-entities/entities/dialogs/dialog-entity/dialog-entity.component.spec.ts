import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEntityComponent } from './dialog-entity.component';

describe('DialogEntityComponent', () => {
  let component: DialogEntityComponent;
  let fixture: ComponentFixture<DialogEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEntityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
