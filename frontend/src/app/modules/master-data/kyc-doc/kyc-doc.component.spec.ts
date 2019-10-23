import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KycDocComponent } from './kyc-doc.component';

describe('KycDocComponent', () => {
  let component: KycDocComponent;
  let fixture: ComponentFixture<KycDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KycDocComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KycDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
