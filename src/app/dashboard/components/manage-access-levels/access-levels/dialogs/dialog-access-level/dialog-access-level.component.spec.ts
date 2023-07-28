import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAccessLevelComponent } from './dialog-access-level.component';

describe('DialogAccessLevelComponent', () => {
  let component: DialogAccessLevelComponent;
  let fixture: ComponentFixture<DialogAccessLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogAccessLevelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAccessLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
