import { NgModule, Component } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AuthGuard } from "@app/core";

// Import Containers
import { FullLayoutComponent, SimpleLayoutComponent } from "@app/shared";

import {
  LoginComponent,
  ForgetComponent,
  HomeComponent,
  DashboardComponent,
  ResetPasswordComponent,
  LogoutComponent
} from "@app/modules";

const appRoutes: Routes = [
  {
    path: "",
    redirectTo: "dashboard",
    pathMatch: "full"
  },
  {
    path: "",
    component: FullLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "dashboard",
        loadChildren: "app/modules/home/home.module#DashboardModule"
      },
      {
        path: "master-data",
        loadChildren:
          "app/modules/master-data/master-data.module#MasterDataModule"
      },
      {
        path: "remittance-data",
        loadChildren:
          "app/modules/remittance-data/remittance-data.module#RemittanceDataModule"
      },
      {
        path: "settings-data",
        loadChildren:
          "app/modules/settings/settings.module#SettingsModule"
      },
    ]
  },
  { path: "forgetpassword", component: ForgetComponent },
  { path: "login", component: LoginComponent },
  { path: "logout", component: LogoutComponent },
  { path: "reset-password", component: ResetPasswordComponent },
  { path: "**", redirectTo: "" }
];

export const AppRoutingModule = RouterModule.forRoot(appRoutes);
