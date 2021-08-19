import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccumulatedBalanceExtraComponent } from './accumulated-balance-extra.component';

describe('AccumulatedBalaceExtraComponent', () => {
  let component: AccumulatedBalanceExtraComponent;
  let fixture: ComponentFixture<AccumulatedBalanceExtraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccumulatedBalanceExtraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccumulatedBalanceExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
