import { IPaymentConditions } from "../../shared/interfaces/payment-condition.interface";


export class paymentConditions implements IPaymentConditions {
  formaDePagamento: 0;
  numeroMaximoParcelas: 0;
  valorLiberacao: 0;
  ativo: true;
}
