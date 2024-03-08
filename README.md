Following the Angular Beginner Tutorial.

Part 1: Create Heroes Editor
  Created HeroesComponent and Added its view to Main AppComponent.
  Applied UppercasePipe to format the Heroes name.
  Learned to use two-way binding with ngModel from FormsModule.

Part 2: Display Selection List
  Now display list of selectable heroes with details.
  Practiced *ngFor to display a list.
  Practiced *ngIf to conditionally include/exclude a block of HTML.
  Toggle CSS style class with class binding.

Part 3: Create a feature component
  Created a seperate reusable Component 
  Used property binding to give parent child relationship on two components.
  Used @Input decorator to make hero property available for binding.

Part 4: Add Service
  Refactored data access to the HeroService class.
  Used Angular Dependency Injection.
  Discovered Observable RxJs library.
  Used the ngOnInit lifecycle hook to call the service.
  Created the Message Service to provide loose coupling.
  Used Service-in-Service injection.

Part 5: Add Navigation
Added Angular router to navigate between different components.
In AppComponent now using <a> tags as links with RouterLink to navigate.
Routing is configured in AppRoutingModule.
Decoupled main/detail views to promote loosely coupled app.
HeroServices shared amongst components.
User-selected hero details can be viewed from dashboard and from Heroes list view.
