import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})

export class HeroService {
  /*
   * Service-in-Service Scenario:
   * The Message Service is injected into the Hero Service
   */
  constructor(private messageService: MessageService) { }

  //Funtion returns an array of Heros.
  getHeroes(): Observable<Hero[]> {
    const heroes = of(HEROES);
    this.messageService.add('HeroService: fetched heroes');
    return heroes;
  }

  //To get Hero with an id
  getHero(id: Number): Observable<Hero> {
    //Assume that hero with 'id' always exists.
    const hero = HEROES.find(h => h.id === id)!;
    //Use backtick (`) character to define a JS template literal for embedding the id.
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }
}