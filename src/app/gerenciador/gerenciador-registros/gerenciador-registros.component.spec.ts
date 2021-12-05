import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciadorRegistrosComponent } from './gerenciador-registros.component';

describe('GerenciadorRegistrosComponent', () => {
  let component: GerenciadorRegistrosComponent;
  let fixture: ComponentFixture<GerenciadorRegistrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerenciadorRegistrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciadorRegistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
