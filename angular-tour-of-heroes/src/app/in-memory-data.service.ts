import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';
import { Villain } from './villain';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 12, name: 'Dr. Nice' },
      { id: 13, name: 'Bombasto' },
      { id: 14, name: 'Celeritas' },
      { id: 15, name: 'Magneta' },
      { id: 16, name: 'RubberMan' },
      { id: 17, name: 'Dynama' },
      { id: 18, name: 'Dr. IQ' },
      { id: 19, name: 'Magma' },
      { id: 20, name: 'Tornado' }
    ];
    const villains = [
      { id: 22, name: 'Villain 1' },
      { id: 23, name: 'Villain 2' },
      { id: 24, name: 'Villain 3' },
      { id: 25, name: 'Villain 4' },
      { id: 26, name: 'Villain 5' },
      { id: 27, name: 'Villain 6' },
      { id: 28, name: 'Villain 7' },
      { id: 29, name: 'Villain 8' },
      { id: 30, name: 'Villain 9' }
    ];
    return {heroes, villains};
  }

  /* 
   * Override the ganId method to ensure hero/villain always has an id. If the 
   * heroes/villain array is empty, return the initial number (11).If the 
   * heroes/villain array is not empty, return the highest hero/villain id + 1. 
   */
  /*genId(heroes: Hero[]) : number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;
  }*/

  genId<T extends Hero | Villain>(myTable: T[]): number {
    return myTable.length > 0 ? Math.max(...myTable.map(t => t.id)) + 1 : 11;
  }
}
