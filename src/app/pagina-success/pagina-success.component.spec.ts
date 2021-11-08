import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaSuccessComponent } from './pagina-success.component';

describe('PaginaSuccessComponent', () => {
  let component: PaginaSuccessComponent;
  let fixture: ComponentFixture<PaginaSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginaSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
