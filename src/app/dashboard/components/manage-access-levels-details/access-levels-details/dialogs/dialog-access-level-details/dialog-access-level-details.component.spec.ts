import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAccessLevelDetailsComponent } from './dialog-access-level-details.component';

describe('DialogAccessLevelDetailsComponent', () => {
  let component: DialogAccessLevelDetailsComponent;
  let fixture: ComponentFixture<DialogAccessLevelDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAccessLevelDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAccessLevelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
