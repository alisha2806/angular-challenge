import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { HomeResolver } from './home-resolver';
import {HomeComponent} from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    resolve: { userData : HomeResolver }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class HomeRoutingModule {
}
