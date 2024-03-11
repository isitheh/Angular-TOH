import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VillainsComponent } from './villains.component';

describe('VillainsComponent', () => {
  let component: VillainsComponent;
  let fixture: ComponentFixture<VillainsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VillainsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VillainsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
