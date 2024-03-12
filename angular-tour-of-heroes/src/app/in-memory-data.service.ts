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
      { id: 12, name: 'Dr. Nice', nemesis: 'None', superpower: 'Agreeable' },
      { id: 13, name: 'Bombasto', nemesis: 'None', superpower: 'Bomber' },
      { id: 14, name: 'Celeritas', nemesis: 'None', superpower: 'Speed' },
      { id: 15, name: 'Magneta', nemesis: 'None', superpower: 'Magnetic' },
      { id: 16, name: 'RubberMan', nemesis: 'None', superpower: 'Resistance' },
      { id: 17, name: 'Dynama', nemesis: 'None', superpower: 'Chameleonic' },
      { id: 18, name: 'Dr. IQ', nemesis: 'None', superpower: 'Smart' },
      { id: 19, name: 'Magma', nemesis: 'None', superpower: 'Hot' },
      { id: 20, name: 'Tornado', nemesis: 'None', superpower: 'Spiral' }
    ];
    let villains = [
      { id: 22, name: 'Mr Topper', enemies: [], superpower: 'Climbing' },
      { id: 23, name: 'Mutilator', enemies: [], superpower: 'Cutting' },
      { id: 24, name: 'Gnasher', enemies: [], superpower: 'Shapeshifting' },
      { id: 25, name: 'Hound', enemies: [], superpower: 'Strength' },
      { id: 26, name: 'Warmonger', enemies: [], superpower: 'Telekinesis' },
      { id: 27, name: 'Prince', enemies: [], superpower: 'Stubbornness' },
      { id: 28, name: 'King', enemies: [], superpower: 'X-Ray Vision' },
      { id: 29, name: 'Queen', enemies: [], superpower: 'Omniscience' },
      { id: 30, name: 'RazorClaw', enemies: [], superpower: 'Sharp'}
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
