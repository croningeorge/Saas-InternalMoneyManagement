import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceTimeComponent } from './service-time.component';

describe('ServiceTimeComponent', () => {
  let component: ServiceTimeComponent;
  let fixture: ComponentFixture<ServiceTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
