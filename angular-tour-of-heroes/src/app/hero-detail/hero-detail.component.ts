
import { Hero } from '../hero';
import { FormsModule } from '@angular/forms';
import { HeroService } from '../hero.service';
import { VillainService } from '../villain.service';
import { ActivatedRoute } from '@angular/router';
import { Component, Input } from '@angular/core';
import { CommonModule, UpperCasePipe, Location } from '@angular/common';
import { Villain } from '../villain';

@Component({
  selector: 'app-hero-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, UpperCasePipe],
  templateUrl: './hero-detail.component.html',
  styleUrl: './hero-detail.component.css'
})
export class HeroDetailComponent {
  @Input() hero?: Hero;
  villains: Villain[] = [];
  selectedVillain: string = "";

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
    private villainService: VillainService,
    private location: Location
  ) {}

	onSelected(value:string): void {
		this.selectedVillain = value;
    if(this.hero) {
      this.hero.nemesis = value;
      this.heroService.assignNemesisToHero(this.hero);
    }
	}  

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

  ngOnInit(): void {
    this.getHero();
    this.getVillains();
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if(this.hero) {
      this.heroService.updateHero(this.hero).subscribe(() => this.goBack());
    }
  }

  //Retrieve the Villains from the service.
  getVillains(): void {
    this.villainService.getVillains().subscribe(villains => this.villains = villains);
  }
}
