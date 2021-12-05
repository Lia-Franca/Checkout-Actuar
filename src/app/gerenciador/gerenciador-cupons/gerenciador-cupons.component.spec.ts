import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciadorCuponsComponent } from './gerenciador-cupons.component';

describe('GerenciadorCuponsComponent', () => {
  let component: GerenciadorCuponsComponent;
  let fixture: ComponentFixture<GerenciadorCuponsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerenciadorCuponsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciadorCuponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
