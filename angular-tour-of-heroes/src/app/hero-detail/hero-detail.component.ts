
import { Hero } from '../hero';
import { FormsModule } from '@angular/forms';
import { HeroService } from '../hero.service';
import { ActivatedRoute } from '@angular/router';
import { Component, Input } from '@angular/core';
import { CommonModule, UpperCasePipe, Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, UpperCasePipe],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css'
})
export class HeroDetailComponent {
  @Input() hero?: Hero;

  /*
   * Constructor:
   * Inject ActvatedRoute, HeroService and Location into the constructor
   * ActivatedRoute: Exposes the route parameters extracted from the URL.
   * HeroService: Gets the Hero data from the remote server.
   * Location: Browser interaction, allows browsing back to previous view.
   */
  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

  ngOnInit(): void {
    this.getHero();
  }

  goBack(): void {
    this.location.back();
  }
}
