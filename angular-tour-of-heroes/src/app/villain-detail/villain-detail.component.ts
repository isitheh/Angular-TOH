import { Villain } from '../villain';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { VillainService } from '../villain.service';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule, UpperCasePipe, Location } from '@angular/common';

@Component({
  selector: 'app-villain-detail',
  standalone: true,
  imports: [ CommonModule, FormsModule, UpperCasePipe ],
  templateUrl: './villain-detail.component.html',
  styleUrl: './villain-detail.component.css'
})
export class VillainDetailComponent implements OnInit {
  @Input() villain?: Villain;
  enemies: string[] = [];
  /*
   * Constructor:
   * Inject ActvatedRoute, VillainService and Location into the constructor
   * ActivatedRoute: Exposes the route parameters extracted from the URL.
   * VillainService: Gets the Villain data from the remote server.
   * Location: Browser interaction, allows browsing back to previous view.
   */
  constructor(
    private route: ActivatedRoute,
    private villainService: VillainService,
    private location: Location
  ) {}

  getVillain(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.villainService.getVillain(id).subscribe(villain => this.villain = villain);
  }

  getVillainEnemies(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.villainService.getVillain(id).subscribe((mVillain) => {
      this.enemies = mVillain.enemies
    });
  }

  ngOnInit(): void {
    this.getVillain();
    //this.enemies = this.getCurVillain();
    this.getVillainEnemies();
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if(this.villain) {
      this.villainService.updateVillain(this.villain).subscribe(() => this.goBack());
    }
  }
}
