import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class HeroService {
  //Define the heroesUrl to the web api.
  private heroesUrl = 'api/heroes';
  /*
   * Service-in-Service Scenario:
   * The Http Client and the Message Service is injected into the Hero Service
   */
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /**
   * Now get heroes from the server.
   * @returns heroes
   */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl);
  }

  //To get Hero with an id
  getHero(id: Number): Observable<Hero> {
    //Assume that hero with 'id' always exists.
    const hero = HEROES.find(h => h.id === id)!;
    //Use backtick (`) character to define a JS template literal for embedding the id.
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }

  /**
   * Log a HeroService message with the MessageService
   */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}