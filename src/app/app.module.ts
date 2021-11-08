import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import ptBr from '@angular/common/locales/pt';
registerLocaleData(ptBr)

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { FooterComponent } from './footer/footer.component';
import { PaginaLoginComponent } from './pagina-login/pagina-login.component';
import { PaginaCadastroComponent } from './pagina-cadastro/pagina-cadastro.component';
import { PaginaCompraComponent } from './pagina-compra/pagina-compra.component';
import { PaginaSuccessComponent } from './pagina-success/pagina-success.component';
import { ContratoComponent } from "./contrato/contrato.component";
import { HttpClientModule } from '@angular/common/http';
import { CreditCardComponent } from './credit-card/credit-card.component';
import { InputComponent } from './shared/components/input/input.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ModalComponent } from './shared/components/modal/modal.component';
import { BackButtonComponent } from './shared/components/back-button/back-button.component';
import { SwiperModule } from 'swiper/angular';
import { NovoProdutoComponent } from './novo-produto/novo-produto.component';



const routes: Routes = [];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    ContratoComponent,
    PaginaLoginComponent,
    PaginaCadastroComponent,
    PaginaCompraComponent,
    PaginaSuccessComponent,
    PaginaInicialComponent,
    PaginaCadastroComponent,
    CreditCardComponent,
    InputComponent,
    ModalComponent,
    BackButtonComponent,
    NovoProdutoComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'pagina-checkout' }),
    SwiperModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgxMaskModule.forRoot(),
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
  ],

  bootstrap: [AppComponent],

})
export class AppModule { }
