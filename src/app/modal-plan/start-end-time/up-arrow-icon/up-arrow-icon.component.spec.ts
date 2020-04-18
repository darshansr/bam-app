import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpArrowIconComponent } from './up-arrow-icon.component';

describe('UpArrowIconComponent', () => {
  let component: UpArrowIconComponent;
  let fixture: ComponentFixture<UpArrowIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpArrowIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpArrowIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
