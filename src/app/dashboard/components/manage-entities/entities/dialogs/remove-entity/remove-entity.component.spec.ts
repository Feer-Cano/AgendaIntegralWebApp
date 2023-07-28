import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveEntityComponent } from './remove-entity.component';

describe('RemoveEntityComponent', () => {
  let component: RemoveEntityComponent;
  let fixture: ComponentFixture<RemoveEntityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveEntityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RemoveEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
