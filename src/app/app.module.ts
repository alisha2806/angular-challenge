import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {ComponentsModule} from './components/components.module';

import {AppComponent} from './app.component';
import {UserDataService} from './services/user-data.service';
import {LoadingService} from './services/loading.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule
  ],
  providers: [
    UserDataService,
    LoadingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
