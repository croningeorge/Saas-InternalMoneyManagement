import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FundRemarkComponent } from './fund-remark.component';

describe('FundRemarkComponent', () => {
  let component: FundRemarkComponent;
  let fixture: ComponentFixture<FundRemarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FundRemarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FundRemarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
