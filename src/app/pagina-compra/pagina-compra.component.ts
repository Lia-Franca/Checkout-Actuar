import { Component, OnInit } from '@angular/core';
import { EventEmitter } from 'stream';
import { IProduct } from '../shared/interfaces/product.interface';
import { EventEmitterService } from '../shared/services/event-emitter.service';
import { ProductsService } from '../shared/services/products-service.service';

@Component({
  selector: 'app-pagina-compra',
  templateUrl: './pagina-compra.component.html',
  styleUrls: ['./pagina-compra.component.scss']
})


export class PaginaCompraComponent implements OnInit {


  public erro: string = '';
  public inputValue: any = '';
  public click: boolean = true;
  public discountValue: number = 0.8; // Valor do produto em porcentagem(80% do valor original)
  public coupon = 'Teste'; // Nome do cupom.
  public installments: number = 12; // Número de parcelas
  public isValidCoupon = false;
  public isInvalidCoupon = false;
  public validCoupon: boolean = true;
  modalCreditCardState: boolean = false;
  modalContractState: boolean = false;
  isShown: boolean = false ; // Escondido por padrão
  public selectedOption: any = '';

  public products: IProduct[] = []

payments = [{
  description: 'Boleto à vista',
  class:  'fa fa-file-o' ,
  descriptionClass: 'firstPaymentWidth',
  checked: false,
},
{
  description: 'Cartão de Crédito',
  class: 'fa fa-credit-card-alt',
  descriptionClass: 'secondPaymentWidth',
  checked: false,

}]


options: any[] = [];



  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(){
    window.scrollTo({top: 0, behavior: 'smooth'});


    
    this.productsService.getAllProducts().subscribe(products => {                 
      console.log(products)
      this.products = products;
      this.products[2].checked = true;
      }
    )



  
    
  }

  markOptionChecked(index: number, event: any): void {
    event.preventDefault();


    for (const product of this.products) {
      product.checked = false;
    }

    if (this.products[index].checked = true) {
      this.options = [];
      this.selectedOption = this.options[this.options.length - 1];

    }


  }





  paymentChecked(index: number, event: any): void {
    event.preventDefault();
    for (const payment of this.payments) {
      payment.checked = false;
    }
    this.payments[index].checked = true;
  }

  toggleShow() {

    this.isShown = ! this.isShown;
  }
  chosenOption(i: number) {
    this.selectedOption = this.options[i].option;
    this.toggleShow();
  }


  setModalContractState(state?: boolean) {
    this.modalContractState = state ? state : !this.modalContractState;


  }

  setModalCreditCardState(state?) {
    this.modalCreditCardState = state ? state : !this.modalCreditCardState;
  }

  closeContractModalAndOpenCreditCardModal() {
    this.setModalCreditCardState(true);
    this.setModalContractState(false);
  }



  validateCoupon(event: any) {
    this.isValidCoupon = false;
    this.isInvalidCoupon = false;
    this.inputValue = event.target.value; 
  }

  submit() {

    if (this.inputValue === this.coupon) { // faz a validação do cupom
      this.isValidCoupon = true;

    } else {
      this.isInvalidCoupon = true;
    }
    

  }


}
