import { Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { VillainsComponent } from './villains/villains.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { VillainDetailComponent } from './villain-detail/villain-detail.component';

export const routes: Routes = [
    //The dashboard must be setup as the default route.
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
    { path: 'heroes', component: HeroesComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'villains', component: VillainsComponent },
    { path: 'hero_detail/:id', component: HeroDetailComponent },
    { path: 'villain_detail/:id', component: VillainDetailComponent }
];