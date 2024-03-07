import { Component } from '@angular/core';
import { Hero } from '../hero';
import { CommonModule, NgIf, NgFor, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  standalone: true,
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  imports: [CommonModule, 
    FormsModule, 
    NgFor, 
    NgIf, 
    UpperCasePipe, 
    HeroDetailComponent],
})

export class HeroesComponent {
  /*
   * HeroesComponent Constructor:
   * Hero Service is injected into the Heroes Component
   */
  constructor(private heroService: HeroService) {

   }
  //Expose the Heroes list, imported from mock-heroes, for binding.
  heroes: Hero[] = [];
  //Button click method onSelect for each hero from heroes.
  selectedHero?: Hero;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }

  //Retrieve the heroes from the service.
  getHeroes(): void {
    /*
     * Get the heroes from the heroes service using the Observable.subscribe.
     * Obervable.subscribe allows for asynchronous access of the heroes list
     * as though the information was being obtained from a server. this is 
     * crucial coz server return time is not derteministic. This asynchrnous
     * approach works for even when the data is requested from a remote server. 
     */
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }

  /*
   * Calling the service class/method from the constructor is not best practice.
   * It is better to call services from the ngOnInit() method instead. The
   * constructor should be reserved for minimal initialization such as the wiring
   * of parameters to props. Avoid calling methods that perform HTTP requests to
   * a remote server inside of a constructor.
   */
  ngOnInit(): void {
    this.getHeroes();
  }
}