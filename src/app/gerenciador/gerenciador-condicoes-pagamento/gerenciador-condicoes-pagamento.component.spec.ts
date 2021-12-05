import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciadorCondicoesPagamentoComponent } from './gerenciador-condicoes-pagamento.component';

describe('GerenciadorCondicoesPagamentoComponent', () => {
  let component: GerenciadorCondicoesPagamentoComponent;
  let fixture: ComponentFixture<GerenciadorCondicoesPagamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GerenciadorCondicoesPagamentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GerenciadorCondicoesPagamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
