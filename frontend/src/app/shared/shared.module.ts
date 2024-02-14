import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { EllipsisPipe } from './ellipsis.pipe';
import { LoadingComponent } from './loading/loading.component';


@NgModule({
  declarations: [
    EllipsisPipe,
    LoadingComponent
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule, 
    EllipsisPipe,
    FormsModule,
    LoadingComponent,
  ]
})
export class SharedModule { }
