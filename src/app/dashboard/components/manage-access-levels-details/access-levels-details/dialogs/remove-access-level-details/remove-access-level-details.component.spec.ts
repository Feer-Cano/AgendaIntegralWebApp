import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveAccessLevelDetailsComponent } from './remove-access-level-details.component';

describe('RemoveAccessLevelDetailsComponent', () => {
  let component: RemoveAccessLevelDetailsComponent;
  let fixture: ComponentFixture<RemoveAccessLevelDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveAccessLevelDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveAccessLevelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
