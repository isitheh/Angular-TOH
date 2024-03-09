import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class HeroService {
  //Define the heroesUrl to the web api.
  private heroesUrl = 'api/heroes';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json' })
  };
  /*
   * Service-in-Service Scenario:
   * The Http Client and the Message Service is injected into the Hero Service
   */
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /**
   * Now get heroes from the server.
   * The interaction with the remote server has possible errors.
   * Catch the errors by using the "pipe" method to pipe the obs
   * result from http.get() through an RxJS catchError() method.
   * @returns heroes array
   */
  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
      tap(_ => this.log('Fetched heroes.')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  /**
   * To get Hero with an id - Will Error 404 if id not found.
   * Given the id, getHero constructs a request URL with id.
   * Server responds with a single hero not an array of heroes.
   * @returns and Observable<hero>
   */
  getHero(id: Number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    )
  }

  /**
   * Log a HeroService message with the MessageService
   */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  /**
   * handleError:
   * Reports the error and then returns a response that allows 
   * the application to continue. Not meant to handle the error
   * directly, but returns operation to the catchError.
   */
  private handleError<T>(operation = 'operation', result ? : T) {
    return (error: any) : Observable<T> => {
      //Send the error to the remote logging infrastructure
      console.log(error);
      this.log(`${operation} failed: ${error.message}`);
      //Return an empty result
      return of(result as T);
    }
  }

  /**
   * updateHero
   * PUT: update the hero on the server.
   * Similar to getHeroes(), but uses http.put() method.
   * The HttpClient.put() method takes 3 parameters:
   * 1. The URL
   * 2. The modification data to update.
   * 3. Options header.
   */
  updateHero(hero: Hero) : Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`Updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  /**
   * POST: Add a new hero to the server.
   */
  addHero(hero: Hero) : Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))  
    );
  }
}