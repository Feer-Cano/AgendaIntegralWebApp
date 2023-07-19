import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogTagComponent } from './dialog-tag.component';

describe('DialogTagComponent', () => {
  let component: DialogTagComponent;
  let fixture: ComponentFixture<DialogTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogTagComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
