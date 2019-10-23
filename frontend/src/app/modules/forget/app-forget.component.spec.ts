import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { AppForgetComponent } from "./app-forget.component";

describe("AppForgetComponent", () => {
  let component: AppForgetComponent;
  let fixture: ComponentFixture<AppForgetComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [AppForgetComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AppForgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
