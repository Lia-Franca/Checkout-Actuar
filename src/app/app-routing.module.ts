import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PaginaCadastroComponent } from './pagina-cadastro/pagina-cadastro.component';
import { PaginaCompraComponent } from './pagina-compra/pagina-compra.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { PaginaLoginComponent } from './pagina-login/pagina-login.component';
import { PaginaSuccessComponent } from './pagina-success/pagina-success.component';
import { CreditCardComponent } from './credit-card/credit-card.component';
import { NovoProdutoComponent } from './novo-produto/novo-produto.component';

const routes: Routes = [
  { path: '', component: PaginaInicialComponent},
  { path: 'home', component: PaginaInicialComponent},
  { path: 'login', component: PaginaLoginComponent},
  { path: 'cadastro', component: PaginaCadastroComponent},
  { path: 'cadastro/:email', component: PaginaCadastroComponent},
  { path: 'compra', component: PaginaCompraComponent},
  { path: 'success', component: PaginaSuccessComponent},
  { path: 'checkout', component: CreditCardComponent},
  { path: 'novoproduto', component: NovoProdutoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
