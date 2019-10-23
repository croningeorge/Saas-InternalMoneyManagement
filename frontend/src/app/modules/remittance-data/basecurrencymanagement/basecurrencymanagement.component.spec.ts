import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { BasecurrencymanagementComponent } from "./basecurrencymanagement.component";

describe("BasecurrencymanagementComponent", () => {
  let component: BasecurrencymanagementComponent;
  let fixture: ComponentFixture<BasecurrencymanagementComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [BasecurrencymanagementComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(BasecurrencymanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
