import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import {CreditCardInfo} from "../shared/interfaces/credit-card.interface";
import {
  isValid,
  isExpirationDateValid,
  isSecurityCodeValid,
  getCreditCardNameByNumber
} from 'creditcard.js';
import {EventEmitterService} from "../shared/services/event-emitter.service";

@Component({
  selector: 'app-credit-card',
  templateUrl: './credit-card.component.html',
  styleUrls: ['./credit-card.component.scss']
})


export class CreditCardComponent implements OnInit {

  @Input('modalOpenState') modalOpenState: boolean = false;


  monthsOfYear: any[] = [];
  generatedYears: any[] = [];
  public creditCardInfo: CreditCardInfo = {
    customerName: '',
    cvv: '',
    cardNumber: '',
    expirationDate: {
      year: '',
      month: '',
    }
  }

  public validCardNumber: boolean = false;
  public validCustomerName: boolean = false;
  public validExpiration: boolean = true;
  public validCvv: boolean = false;
  public validAllFields: boolean = false;
  public blockAllFields: boolean = false;
  public cardBrand: string = '';
  public erro: any;

  isFlippedCard = false;

  constructor( private router : Router) { }

  ngOnInit(): void {
    this.calculateMonthOfYear();
    this.generateYears();
  }

  flipCard(): void {
    this.isFlippedCard = !this.isFlippedCard;
  }

  protected calculateMonthOfYear() {
    for ( let i = 1; i < 13; i++) {
      this.monthsOfYear.push({
        option: String(i < 10 ? `0${i}`: i)
      });
    }
  }

  protected generateYears() {
    for ( let i = new Date().getFullYear(); i < new Date().getFullYear() + 11 ; i++) {
      this.generatedYears.push({
        option: String(i)
      });
    }
  }

  public setMonth(month: any) {
    this.creditCardInfo.expirationDate.month = typeof month === 'string' ? month : month.option;
    if (this.creditCardInfo.expirationDate.month.length > 1 &&
        this.creditCardInfo.expirationDate.year.length > 3) {
      this.validExpiration = this.isExpirationDateValid(this.creditCardInfo.expirationDate.month, this.creditCardInfo.expirationDate.year);
    }
  }

  public setYear(year: any) {
    this.creditCardInfo.expirationDate.year = typeof year === 'string' ? year : year.option;
    if (this.creditCardInfo.expirationDate.month.length > 1 &&
      this.creditCardInfo.expirationDate.year.length > 3) {
      this.validExpiration = this.isExpirationDateValid(this.creditCardInfo.expirationDate.month, this.creditCardInfo.expirationDate.year);
    }
  }

  public setCardNumber(cardNumber: string) {
    const numberWithoutSpace = cardNumber.split(' ').join('');
    this.creditCardInfo.cardNumber = cardNumber;
    this.validCardNumber = numberWithoutSpace.length > 11 && this.isValidCardNumber(numberWithoutSpace);
    this.cardBrand = this.getCardBrand(numberWithoutSpace);
    if (this.validCardNumber) {
      EventEmitterService.get(`errorEventToCardNumber`).emit(false);
    }
  }

  public setCustomerName(customerName: string) {
    this.creditCardInfo.customerName = customerName;
    this.validCustomerName = this.isValidCustomerName();
    if (this.validCustomerName) {
      EventEmitterService.get(`errorEventToCustomerName`).emit(false);
    }
  }

  public setCvv(cvv: string) {
    this.creditCardInfo.cvv = cvv;
    this.validCvv = this.isSecurityCodeValid(this.creditCardInfo.cvv);
    if (this.validCvv) {
      EventEmitterService.get(`errorEventToCVV`).emit(false);
    }
  }

  protected getCardBrand(cardNumber: string) {
    return getCreditCardNameByNumber(cardNumber);
  }

  protected isSecurityCodeValid(cvv: string) {
    return isSecurityCodeValid(this.creditCardInfo.cardNumber, cvv);
  }

  protected isExpirationDateValid(month: string, year: string): boolean {
    return isExpirationDateValid(month, year);
  }

  protected isValidCardNumber(cardNumber: string): boolean {
    return isValid(cardNumber);
  }

  protected isValidCustomerName(): boolean {
    return this.creditCardInfo.customerName.length > 5
  }

  public previousNextStep() {
    // if (this.creditCardInfo.cardNumber.length === 0 ||
    //     !this.validCardNumber
    // ) {
    //
    //   EventEmitterService.get(`errorEventToCardNumber`).emit();
    //   this.erro = 'Preencha o campo com os números corretos do cartão';
    //   return;
    // }
    //
    // if (this.creditCardInfo.customerName.length === 0 ||
    //     !this.validCustomerName
    // ) {
    //   EventEmitterService.get(`errorEventToCustomerName`).emit();
    //   this.erro = 'Preencha o campo com o nome exatamente como impresso no cartão';
    //   return;
    // }
    //
    // if (this.creditCardInfo.expirationDate.month.length === 0 ||
    //   this.creditCardInfo.expirationDate.year.length === 0 ||
    //   !this.validExpiration
    // ) {
    //   EventEmitterService.get(`errorEventToCreditExpirationDate`).emit();
    //   this.erro = 'Preencha a data de validade correta do cartão';
    //   return;
    // }
    //
    // if (this.creditCardInfo.cvv.length === 0 ||
    //     !this.validCvv
    // ) {
    //   EventEmitterService.get(`errorEventToCVV`).emit();
    //   this.erro = 'Preencha o campo com o código de segurança do cartão';
    //   return;
    // }
    //
    // if (this.cardBrand === 'Credit card is invalid!') {
    //   this.openModalToChooseCardBrand()
    // }
    //
    // this.erro = null;
    // EventEmitterService.get('disableInputErrorEvent').emit();
    //
    // if (this.validCardNumber &&
    //     this.validCustomerName &&
    //     this.validExpiration &&
    //     this.validCvv &&
    //     this.cardBrand !== 'Credit card is invalid!'
    // ) {
    //     this.blockAllFields = true;
    //     this.nextStep();
    // }
    //
    // this.validAllFields = true;

    this.nextStep()
    }

  openModalToChooseCardBrand() {

  }

  nextStep() {
    this.router.navigate(['/success']).then();
  }


}
