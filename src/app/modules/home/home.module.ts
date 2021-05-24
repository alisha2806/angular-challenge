import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
import {HomeComponent} from './home.component';
import {HomeRoutingModule} from './home-routing.module';
import {InitialsPipe} from './initials.pipe';

@NgModule({
  declarations: [
    HomeComponent,
    InitialsPipe
  ],
  providers: [
    InitialsPipe
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule
  ]
})
export class HomeModule {
}
