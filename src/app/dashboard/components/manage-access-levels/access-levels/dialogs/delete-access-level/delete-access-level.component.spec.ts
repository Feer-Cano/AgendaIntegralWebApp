import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAccessLevelComponent } from './delete-access-level.component';

describe('DeleteAccessLevelComponent', () => {
  let component: DeleteAccessLevelComponent;
  let fixture: ComponentFixture<DeleteAccessLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAccessLevelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteAccessLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
