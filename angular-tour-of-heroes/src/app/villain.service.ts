import { Hero } from './hero';
import { Villain } from './villain';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Injectable, OnInit } from '@angular/core';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class VillainService implements OnInit {
  /**
   * Define the villainsUrl to the web api.
   */
  private villainsUrl = 'api/villains';
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type' : 'application/json' })
  };
  /*
   * Service-in-Service Scenario:
   * The Http Client and the Message Service is injected into the Villain Service
   */
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  // eslint-disable-next-line @angular-eslint/contextual-lifecycle
  ngOnInit(): void {
    this.getVillains();
  }

  /**
   * Now get villains from the server.
   * The interaction with the remote server has possible errors.
   * Catch the errors by using the "pipe" method to pipe the obs
   * result from http.get() through an RxJS catchError() method.
   * @returns villains array
   */
  getVillains(): Observable<Villain[]> {
    return this.http.get<Villain[]>(this.villainsUrl).pipe(
      tap(_ => this.log('Fetched villains.')),
      catchError(this.handleError<Villain[]>('getVillains', []))
    );
  }

  /**
   * To get Villain with an id - Will Error 404 if id not found.
   * Given the id, getVillain constructs a request URL with id.
   * Server responds with a single villain not an array of villains.
   * @returns and Observable<villain>
   */
  getVillain(id: Number): Observable<Villain> {
    const url = `${this.villainsUrl}/${id}`;
    return this.http.get<Villain>(url).pipe(
      tap(_ => this.log(`fetched villain id=${id}`)),
      catchError(this.handleError<Villain>(`getVillain id=${id}`))
    )
  }

  /**
   * Log a VillainService message with the MessageService
   */
  private log(message: string) {
    this.messageService.add(`VillainService: ${message}`);
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
      this.log(`${operation} failedz: ${error.message}`);
      //Return an empty result
      return of(result as T);
    }
  }

  /**
   * updateVillain
   * PUT: update the villain on the server.
   * Similar to getVillains(), but uses http.put() method.
   * The HttpClient.put() method takes 3 parameters:
   * 1. The URL
   * 2. The modification data to update.
   * 3. Options header.
   */
  updateVillain(villain: Villain) : Observable<any> {
    return this.http.put(this.villainsUrl, villain, this.httpOptions).pipe(
      tap(_ => this.log(`Updated villain id=${villain.id}`)),
      catchError(this.handleError<any>('updateVillain'))
    );
  }

  /**
   * POST: Add a new villain to the server.
   */
  addVillain(villain: Villain) : Observable<Villain> {
    return this.http.post<Villain>(this.villainsUrl, villain, this.httpOptions).pipe(
      tap((newVillain: Villain) => this.log(`added villain w/ id=${newVillain.id}`)),
      catchError(this.handleError<Villain>('addVillain'))  
    );
  }

  /**
   * DELETE: Delete the villain from the server.
   * @param id 
   */
  deleteVillain(id: number) : Observable<Villain> {
    const url = `${this.villainsUrl}/${id}`;
    return this.http.delete<Villain>(url, this.httpOptions).pipe(
      tap(_=> this.log(`deleted villain id=${id}`)),
      catchError(this.handleError<Villain>('deleteVillain'))
    );
  }

  /**
   * searchVillains:
   * Get villains whose name contains the search term
   */
  searchVillains(term: string) : Observable<Villain[]> {
    if(!term.trim()) {
      //If not search item, return an empty array.
      return of([]);
    }

    return this.http.get<Villain[]>(`${this.villainsUrl}/?name=${term}`).pipe(
      tap(x => x.length ? 
        this.log(`found villains matching "${term}"`) : 
        this.log(`no villains matching "${term}"`)),
        catchError(this.handleError<Villain[]>('searchVillains', []))
    );
  }

  /**
   * assignNemesisToHero
   * Assign the selected nemesis to the selected hero
   */
  assignNemesisToHero(hero: Hero): void {
    const myString:string = hero.nemesis;
    const mySubString = myString.substring(
      myString.indexOf("(") + 1, myString.lastIndexOf(")")
    );
    const mId:number = + mySubString.trim();
    this.getVillain(mId).forEach((villain) => {
      villain.enemies.push(hero.name);
      //Update the villain's enemies list.
      if(villain) {
        this.updateVillain(villain).subscribe(() => {console.log("Assigned Nemesis to Hero.")});
      }
    });
  }
}