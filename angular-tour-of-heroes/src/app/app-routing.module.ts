import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { RouterLink, RouterOutlet } from '@angular/router';

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes), RouterLink, RouterOutlet],
  exports: [ RouterModule ]
})

export class AppRoutingModule { 

}
