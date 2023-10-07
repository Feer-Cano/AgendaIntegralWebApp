import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessLevelsDetailsComponent } from './access-levels-details.component';

describe('AccessLevelsDetailsComponent', () => {
  let component: AccessLevelsDetailsComponent;
  let fixture: ComponentFixture<AccessLevelsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccessLevelsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessLevelsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
