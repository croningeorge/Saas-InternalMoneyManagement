import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "@app/core";

@Component({
  providers: [AuthenticationService],
  template: ""
})
export class LogoutComponent implements OnInit {
  constructor(private auth: AuthenticationService, private router: Router) {}

  ngOnInit() {
    this.auth.logout();
    this.router.navigate(["login"], { queryParams: { ls: 1 } });
  }
}
