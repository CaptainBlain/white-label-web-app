import {NgModule} from '@angular/core';
import {HomeComponent} from './home.component';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import {HomeRoutingModule} from './home-routing.module';
import {CommonModule} from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {FirstComponent} from './first/first.component';


@NgModule({
  declarations: [
    HomeComponent,
    FirstComponent
  ],
  imports: [
    RouterModule,
    ReactiveFormsModule,
    HomeRoutingModule,
    CommonModule,
    MatProgressSpinnerModule
  ]
})
export class HomeModule {}
