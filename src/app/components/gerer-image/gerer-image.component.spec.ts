import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GererImageComponent } from './gerer-image.component';

describe('GererImageComponent', () => {
  let component: GererImageComponent;
  let fixture: ComponentFixture<GererImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GererImageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GererImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
