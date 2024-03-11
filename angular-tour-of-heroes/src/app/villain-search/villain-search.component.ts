import { Villain } from '../villain';
import { Observable, Subject } from 'rxjs';
import { RouterLink } from '@angular/router';
import { VillainService } from '../villain.service';
import { NgIf, NgFor } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-villain-search',
  standalone: true,
  imports: [ NgIf, NgFor, RouterLink, CommonModule ],
  templateUrl: './villain-search.component.html',
  styleUrl: './villain-search.component.css'
})

export class VillainSearchComponent implements OnInit {
  villains$!: Observable<Villain[]>;
  private searchTerms = new Subject<string>;

  //Inject VillainService into VillainSearchComponent
  constructor(private villainService: VillainService) {}

  //Push a search term into the observable stream
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.villains$ = this.searchTerms.pipe(
      //wait 300ms after each keyboard entry before considering the terms.
      debounceTime(300),
      //Make sure each new term is distinct
      distinctUntilChanged(),
      //Switch to new search observable each time the term changes.
      switchMap((term: string) => this.villainService.searchVillains(term)),
    );
  }
}
