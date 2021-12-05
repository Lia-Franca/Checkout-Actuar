import { Component, OnInit } from '@angular/core';
import { IPaymentConditions } from '../../shared/interfaces/payment-condition.interface';
import { EventEmitterService } from '../../shared/services/event-emitter.service';
import { paymentConditions } from './payment-condition.model';

@Component({
  selector: 'app-gerenciador-condicoes-pagamento',
  templateUrl: './gerenciador-condicoes-pagamento.component.html',
  styleUrls: ['./gerenciador-condicoes-pagamento.component.scss']
})
export class GerenciadorCondicoesPagamentoComponent implements OnInit {
  public isOpenModal = false;
  public isEdit: boolean = false;
  public progressBarDisplay = 'none';
  public progressBarVisibility = 'visible';
  public progressBarClass = '';
  public typeOfAlertMessage = ``;
  public loading = false;
  public textAlertMessage = ``;
  public isOpenAlert = false;
  public paymentConditionsProperties: any = '';
  public objIndex: any = '';
  public inputChecked: boolean = true;
  public data: IPaymentConditions = {
    formaDePagamento: '',
    numeroMaximoParcelas: '',
    valorLiberacao: '',
    ativo: false,
  };

  public paymentConditions: any[] = [
    {
    formaDePagamento: 2,
    numeroMaximoParcelas: 12,
    valorLiberacao: 2000,
    ativo: false,
    checked: false
    },
    {
      formaDePagamento: 1,
      numeroMaximoParcelas: 10,
      valorLiberacao: 1000,
      ativo: false,
      checked: false
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

  markOptionChecked(index: number, event: any): void {
    event.preventDefault();

    for (const paymentCondition of this.paymentConditions) {
      paymentCondition.checked = false;
    }

    this.objIndex = this.paymentConditions.indexOf(this.paymentConditions[index]);
    this.paymentConditionsProperties = this.paymentConditions[index];
    this.paymentConditions[index].checked = true;
    this.openModal(this.paymentConditions[index]);

    if (this.paymentConditions[index].checked) {
      this.data.formaDePagamento = this.paymentConditionsProperties.formaDePagamento;
      this.data.numeroMaximoParcelas = this.paymentConditionsProperties.numeroMaximoParcelas;
      this.data.valorLiberacao = this.paymentConditionsProperties.valorLiberacao;
      this.data.ativo = this.paymentConditionsProperties.ativo;
    }

  }

  openModal(params?: any ) {
    params?(
        this.isEdit = true,
          this.data.formaDePagamento = params.formaDePagamento,
          this.data.numeroMaximoParcelas = params.numeroMaximoParcelas,
          this.data.checked = params.checked
      ): (
      this.isEdit = false,
      this.data = new paymentConditions());

    this.toggleModal();

  }


  toggleModal() {
    this.isOpenModal = !this.isOpenModal;
  }

  setData(value: any, name: string) {
    this.data[`${name}`] = value;
  }

  registerPaymentCondition() {
    if (this.data.formaDePagamento > 0) {
      EventEmitterService.get(`errorEventToFormaDePagamento`).emit(false);
    }

    if (this.data.numeroMaximoParcelas > 0 ) {
      EventEmitterService.get(`errorEventToNumeroMaximoParcelas`).emit(false);
    }
  }

  saveChanges() {

    // if (this.data.name.length === 0 || this.data.discount === 0) {
    //   EventEmitterService.get(`errorEventToCoupon`).emit();
    //   EventEmitterService.get(`errorEventToDiscount`).emit();
    // }

    // this.progressBarDisplay = 'unset';
    // this.loading = true;
    // if (this.isEdit) {
    //   console.log(this.couponsProperties),
    //   console.log(this.data.name)
    //   this.productsService.updateProduct(this.data.name, this.couponsProperties).subscribe(() => {
    //       this.alertMessage('Produto cadastrado com êxito', 'sucesso');
    //       this.loading = false;
    //     },
    //     (error) => {
    //       this.loading = false;
    //       this.alertMessage(`Erro ${error}`, `erro`);
    //     }
    //   )
    //   return;
    // }

    // console.log(this.data)
    // if(!this.isEdit) {
    //   this.productsService.createProduct(this.data).subscribe(() => {
    //     this.alertMessage('Produto cadastrado com êxito', 'sucesso');
    //       this.loading = false;
    //       console.log(this.data);
    //       this.getProducts();
    //   },
    //     (error) => {
    //       this.loading = false;
    //       this.alertMessage(`Erro ${error}`, `erro`)
    //     }
    //   )
    //   return;
    // }

 }

 removePaymentCondition() {
  // console.log(this.objIndex)
  // if (this.couponsProperties.checked) {
  //   this.couponsProperties.removeProduct(this.objIndex).subscribe(() => {
  //       this.alertMessage('Produto cadastrado com êxito', 'sucesso');
  //       this.loading = false;
  //     },
  //     (error) => {
  //       this.loading = false;
  //       this.alertMessage(`Erro ${error}`, `erro`);
  //     }
  //   )
  //   return;
  }

}
