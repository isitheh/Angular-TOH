import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterLink, RouterOutlet } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { VillainsComponent } from './villains/villains.component';

const routes: Routes = [
  { path: 'heroes', component: HeroesComponent },
  { path: 'villains', component: VillainsComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes), RouterLink, RouterOutlet],
  exports: [ RouterModule ]
})

export class AppRoutingModule { 

}
