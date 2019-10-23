import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { OutletmanagementComponent } from "./outletmanagement.component";

describe("OutletmanagementComponent", () => {
  let component: OutletmanagementComponent;
  let fixture: ComponentFixture<OutletmanagementComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [OutletmanagementComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OutletmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
