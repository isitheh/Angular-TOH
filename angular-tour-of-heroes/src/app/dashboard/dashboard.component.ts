import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { HeroService } from '../hero.service';
import { Hero } from '../hero';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ NgIf, NgFor, RouterLink ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent {
  //Define the heroes array property
  heroes: Hero[] = [];

  /*
   * Inject the HeroService class as heroService property 
   * into the Dashboard Component. Ensure not to call any
   * services inside the constructor such as HTTP requests.
   * Constructor is reserved for simple initializations and 
   * wiring params to props.
   */
  constructor(private heroServive: HeroService) {}

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
}
