import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmmenWonDsvComponent } from './emmen-won-dsv.component';

describe('EmmenWonDsvComponent', () => {
  let component: EmmenWonDsvComponent;
  let fixture: ComponentFixture<EmmenWonDsvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmmenWonDsvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmmenWonDsvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
