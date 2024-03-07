import { Component } from '@angular/core';
import { Hero } from '../hero';
import { CommonModule, NgIf, NgFor, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HEROES } from '../mock-heroes';

@Component({
  selector: 'app-heroes',
  standalone: true,
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  imports: [CommonModule, FormsModule, NgFor, NgIf, UpperCasePipe],
})

export class HeroesComponent {
  //Expose the Heroes list, imported from mock-heroes, for binding.
  heroes = HEROES;
  //Button click method onSelect for each hero from heroes.
  selectedHero?: Hero;

  onSelect(hero: Hero): void {
    this.selectedHero = hero;
  }
}