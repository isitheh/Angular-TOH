import { Hero } from '../hero';
import { Villain } from '../villain';
import { RouterLink } from '@angular/router';
import { HeroService } from '../hero.service';
import { NgIf, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { VillainService } from '../villain.service';
import { HeroSearchComponent } from '../hero-search/hero-search.component';
import { VillainSearchComponent } from '../villain-search/villain-search.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ NgIf, NgFor, RouterLink, 
    HeroSearchComponent, VillainSearchComponent ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
  //Define the heroes array property
  heroes: Hero[] = [];

  //Define the villains array property
  villains: Villain[] = [];

  /*
   * Inject the HeroService class as heroService property 
   * and the VillainService class into the Dashboard Component. 
   * Ensure not to call any services inside the constructor such 
   * as HTTP requests. Constructor is reserved for simple 
   * initializations and wiring params to props.
   */
  constructor(
    private heroServive: HeroService,
    private villainService: VillainService
  ) {}

  /*
   * The ngOnInit lifecycle hook calls the getHeroes method.
   * The ngOnInit runs after the constructor has run. Runs
   * after the components inputs have been initialized.
   * Ensure not to call the getHeroes() inside the constructor
   * as this method may be performing HTTP requests from a 
   * remote server. The ngOnInit is generally used to setup
   * subscriptions or call services.
   */
  ngOnInit(): void {
    this.getHeroes();
    this.getVillains();
  }

  getHeroes(): void {
    /*
     * The slice(1, 5) method returns a sliced list of heroes 
     * between elements 1 and 5. In that case only Heroes one,
     * two, three and four will be returned, ie: index 1 
     * inclusive and index 5 not included.
     */
    this.heroServive.getHeroes()
      .subscribe(heroes => this.heroes = heroes.slice(1, 5));
  }

  getVillains(): void {
    /*
     * The slice(1, 5) method returns a sliced list of villains 
     * between elements 1 and 5. In that case only Villains one,
     * two, three and four will be returned, ie: index 1 
     * inclusive and index 5 not included.
     */
    this.villainService.getVillains() 
      .subscribe(villains => this.villains = villains.slice(1, 5));
  }
}
