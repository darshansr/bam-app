import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartEndTimeComponent } from './start-end-time.component';

describe('StartEndTimeComponent', () => {
  let component: StartEndTimeComponent;
  let fixture: ComponentFixture<StartEndTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartEndTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartEndTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
