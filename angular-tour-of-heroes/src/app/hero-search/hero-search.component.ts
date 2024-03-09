import { Hero } from '../hero';
import { Observable, Subject } from 'rxjs';
import { RouterLink } from '@angular/router';
import { HeroService } from '../hero.service';
import { NgIf, NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-hero-search',
  standalone: true,
  imports: [ NgIf, NgFor, RouterLink, CommonModule ],
  templateUrl: './hero-search.component.html',
  styleUrl: './hero-search.component.css'
})
export class HeroSearchComponent implements OnInit {
  heroes$!: Observable<Hero[]>;
  private searchTerms = new Subject<string>;

  //Inject HeroService into HeroSearchComponent
  constructor(private heroService: HeroService) {}

  //Push a search term into the observable stream
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      //wait 300ms after each keyboard entry before considering the terms.
      debounceTime(300),
      //Make sure each new term is distinct
      distinctUntilChanged(),
      //Switch to new search observable each time the term changes.
      switchMap((term: string) => this.heroService.searchHeroes(term)),
    );
  }
}
