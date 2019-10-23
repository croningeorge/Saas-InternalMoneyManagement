import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSearchBoxComponent } from './app-search-box.component';

describe('AppSearchBoxComponent', () => {
  let component: AppSearchBoxComponent;
  let fixture: ComponentFixture<AppSearchBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppSearchBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSearchBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
