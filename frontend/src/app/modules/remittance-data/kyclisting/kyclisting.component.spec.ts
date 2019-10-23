import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { KyclistingComponent } from "./kyclisting.component";

describe("KyclistingComponent", () => {
  let component: KyclistingComponent;
  let fixture: ComponentFixture<KyclistingComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [KyclistingComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(KyclistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
