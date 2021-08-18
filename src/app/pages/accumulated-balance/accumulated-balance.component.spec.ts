import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccumulatedBalanceComponent } from './accumulated-balance.component';

describe('AccumulatedBalanceComponent', () => {
  let component: AccumulatedBalanceComponent;
  let fixture: ComponentFixture<AccumulatedBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccumulatedBalanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccumulatedBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
