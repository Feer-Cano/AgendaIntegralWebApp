import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveTagComponent } from './remove-tag.component';

describe('RemoveTagComponent', () => {
  let component: RemoveTagComponent;
  let fixture: ComponentFixture<RemoveTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveTagComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
