export interface CreditCardInfo {
  customerName: string;
  cvv: string;
  cardNumber: string;
  expirationDate: {
    year: string;
    month: string;
  }
}
