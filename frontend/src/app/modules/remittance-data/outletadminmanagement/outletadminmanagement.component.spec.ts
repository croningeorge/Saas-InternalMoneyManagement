import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { OutletadminmanagementComponent } from "./outletadminmanagement.component";

describe("OutletadminmanagementComponent", () => {
  let component: OutletadminmanagementComponent;
  let fixture: ComponentFixture<OutletadminmanagementComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [OutletadminmanagementComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OutletadminmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
