import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaCadastroComponent } from './pagina-cadastro/pagina-cadastro.component';
import { PaginaCompraComponent } from './pagina-compra/pagina-compra.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { PaginaLoginComponent } from './pagina-login/pagina-login.component';
import { PaginaSuccessComponent } from './pagina-success/pagina-success.component';
import { CreditCardComponent } from './credit-card/credit-card.component';
import { GerenciadorComponent } from './gerenciador/gerenciador.component';
import { GerenciadorProdutosComponent } from './gerenciador/gerenciador-produtos/gerenciador-produtos.component';
import { GerenciadorCuponsComponent } from './gerenciador/gerenciador-cupons/gerenciador-cupons.component';
import { GerenciadorCondicoesPagamentoComponent } from './gerenciador/gerenciador-condicoes-pagamento/gerenciador-condicoes-pagamento.component';
import { GerenciadorRegistrosComponent } from './gerenciador/gerenciador-registros/gerenciador-registros.component';

const routes: Routes = [
  { path: '', component: PaginaInicialComponent},
  { path: 'home', component: PaginaInicialComponent},
  { path: 'login', component: PaginaLoginComponent},
  { path: 'cadastro', component: PaginaCadastroComponent},
  { path: 'cadastro/:email', component: PaginaCadastroComponent},
  { path: 'compra', component: PaginaCompraComponent},
  { path: 'success', component: PaginaSuccessComponent},
  { path: 'checkout', component: CreditCardComponent},
  { path: 'gerenciador', component: GerenciadorComponent },
  { path: 'gerenciador-produtos', component: GerenciadorProdutosComponent },
  { path: 'gerenciador-cupons', component: GerenciadorCuponsComponent },
  { path: 'gerenciador-condicoes-pagamento', component: GerenciadorCondicoesPagamentoComponent },
  { path: 'gerenciador-registros', component: GerenciadorRegistrosComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
