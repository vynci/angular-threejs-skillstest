import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewerComponent } from './viewer.component';
import { ViewerRoutingModule } from './viewer-routing.module';

import { CubeComponent } from '../../components/cube/cube.component';

@NgModule({
  imports: [
    CommonModule,
    ViewerRoutingModule
  ],
  declarations: [
    ViewerComponent,
    CubeComponent
  ]
})
export class ViewerModule { }
