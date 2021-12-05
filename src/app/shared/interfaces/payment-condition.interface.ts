export interface IPaymentConditions {
    condicaoId?: string;
    formaDePagamento?: number | string;
    numeroMaximoParcelas?: number | string;
    valorLiberacao?: number | string;
    ativo?: boolean;
    checked?: boolean;
  }
  