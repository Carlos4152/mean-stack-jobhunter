import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { AdminComponent } from './components/admin/admin.component';
import { PlatformsComponent } from './components/platforms/platforms.component';
import { ApplicationsComponent } from './components/applications/applications.component';
import { InformationComponent } from './components/information/information.component';
import { ProfileComponent } from './components/profile/profile.component';
import { JobDetailsComponent } from './components/job-details/job-details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from 'src/app/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [authGuard],
    children: [
      { path: "dashboard", component: DashboardComponent },
      { path: "platforms", component: PlatformsComponent },
      { path: "applications", component: ApplicationsComponent },
      { path: "applications/:appId", component: JobDetailsComponent },
      { path: "resource", component:  InformationComponent },
      { path: "profile", component:  ProfileComponent },
      { path: "", redirectTo: "/dashboard", pathMatch:"full" },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
