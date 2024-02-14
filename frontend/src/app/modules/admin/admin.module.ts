import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';


import { AdminComponent } from './components/admin/admin.component';
import { ApplicationsComponent } from './components/applications/applications.component';
import { CvBuilderComponent } from './components/cv-builder/cv-builder.component';
import { JobDetailsComponent } from './components/job-details/job-details.component';
import { PlatformsComponent } from './components/platforms/platforms.component';
import { ProfileComponent } from './components/profile/profile.component';
import { InformationComponent } from './components/information/information.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';


@NgModule({
  declarations: [
    AdminComponent,
    ApplicationsComponent,
    CvBuilderComponent,
    JobDetailsComponent,
    PlatformsComponent,
    ProfileComponent,
    InformationComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule  
  ]
})
export class AdminModule { }
