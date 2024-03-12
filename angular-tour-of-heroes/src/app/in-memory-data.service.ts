import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';
import { Villain } from './villain';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let heroes = [
      { id: 12, name: 'Dr. Nice', nemesis: 'None' },
      { id: 13, name: 'Bombasto', nemesis: 'None' },
      { id: 14, name: 'Celeritas', nemesis: 'None' },
      { id: 15, name: 'Magneta', nemesis: 'None' },
      { id: 16, name: 'RubberMan', nemesis: 'None' },
      { id: 17, name: 'Dynama', nemesis: 'None' },
      { id: 18, name: 'Dr. IQ', nemesis: 'None' },
      { id: 19, name: 'Magma', nemesis: 'None' },
      { id: 20, name: 'Tornado', nemesis: 'None' }
    ];
    let villains = [
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
  genId<T extends Hero | Villain>(myTable: T[]): number {
    return myTable.length > 0 ? Math.max(...myTable.map(t => t.id)) + 1 : 11;
  }
}
