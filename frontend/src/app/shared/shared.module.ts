import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { EllipsisPipe } from './ellipsis.pipe';


@NgModule({
  declarations: [
    EllipsisPipe
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule, 
    EllipsisPipe,
    FormsModule
  ]
})
export class SharedModule { }
