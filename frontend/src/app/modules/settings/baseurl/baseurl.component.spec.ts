import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseurlComponent } from './baseurl.component';

describe('BaseurlComponent', () => {
  let component: BaseurlComponent;
  let fixture: ComponentFixture<BaseurlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BaseurlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseurlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
