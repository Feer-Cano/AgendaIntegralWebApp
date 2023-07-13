import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HcpsComponent } from './hcps.component';

describe('HcpsComponent', () => {
  let component: HcpsComponent;
  let fixture: ComponentFixture<HcpsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HcpsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HcpsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
