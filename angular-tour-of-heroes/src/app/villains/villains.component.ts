import { Villain } from '../villain';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { VillainService } from '../villain.service';
import { CommonModule, NgIf, NgFor, UpperCasePipe } from '@angular/common';
import { VillainDetailComponent } from '../villain-detail/villain-detail.component';

@Component({
  selector: 'app-villains',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    NgFor, 
    NgIf, 
    RouterLink,
    UpperCasePipe, 
    VillainDetailComponent
  ],
  templateUrl: './villains.component.html',
  styleUrl: './villains.component.css'
})
export class VillainsComponent implements OnInit {
    //Expose the Villains list, imported from mock-api-server, for binding.
    villains: Villain[] = [];
  
    /*
     * VillainsComponent Constructor:
     * Villain Service is injected into the Villains Component
     */
    constructor(private villainService: VillainService) {}
  
    /*
     * Calling the service class/method from the constructor is not best practice.
     * It is better to call services from the ngOnInit() method instead. The
     * constructor should be reserved for minimal initialization such as the wiring
     * of parameters to props. Avoid calling methods that perform HTTP requests to
     * a remote server inside of a constructor.
     */
    ngOnInit(): void {
      this.getVillains();
    }
  
    //Retrieve the Villains from the service.
    getVillains(): void {
      /*
        * Get the Villains from the Villains service using the Observable.subscribe.
        * Obervable.subscribe allows for asynchronous access of the Villains list
        * as though the information was being obtained from a server. this is 
        * crucial coz server return time is not derteministic. This asynchrnous
        * approach works for even when the data is requested from a remote server. 
        */
      this.villainService.getVillains().subscribe(villains => this.villains = villains);
    }
  
    add(name: string): void {
      name = name.trim();
      if(!name) { return; }
      this.villainService.addVillain({ name } as Villain).subscribe(villain => {
        this.villains.push(villain);
      });
    }
  
    delete(villain: Villain): void {
      //subscribe method facilitates the sending instruction to the server.
      this.villains = this.villains.filter(h => h !== villain);
      this.villainService.deleteVillain(villain.id).subscribe();
    }
}
