import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { KycDocTypesComponent } from "./kyc-doc-types.component";

describe("KycDocTypesComponent", () => {
  let component: KycDocTypesComponent;
  let fixture: ComponentFixture<KycDocTypesComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [KycDocTypesComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(KycDocTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
