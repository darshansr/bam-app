import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownArrowIconComponent } from './down-arrow-icon.component';

describe('DownArrowIconComponent', () => {
  let component: DownArrowIconComponent;
  let fixture: ComponentFixture<DownArrowIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownArrowIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownArrowIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
