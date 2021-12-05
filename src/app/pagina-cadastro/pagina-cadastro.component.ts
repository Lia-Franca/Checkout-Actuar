import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { BuscaCepService } from '../shared/services/busca-cep.service';
import { CadastroData } from '../shared/interfaces/cadastro.interface';
import { EventEmitterService } from "../shared/services/event-emitter.service";



@Component({
  selector: 'app-pagina-cadastro',
  templateUrl: './pagina-cadastro.component.html',
  styleUrls: ['./pagina-cadastro.component.scss']
})
export class PaginaCadastroComponent implements OnInit{
  public cpfBackground: string = '';
  public cnpjBackground: string = '';
  public CPF_CNPJ: string = 'CPF';
  public email: any = '';
  public autoComplete: string;
  public cities: any[] = [];
  public id: string = '';
  public data: CadastroData = {
    CpfCnpj: '',
    telefoneCelular: '',
    cep: '',
    logradouro: '',
    bairro: '',
    cidade: '',
    uf: '',
    numero: '',
    nome: '',
    complemento: '',
    emailInput: '',
  };


  public erro: boolean = false;
  public validAllFields: boolean = false;
  public blockAllFields: boolean = true;
  public validName: boolean = false;
  public validNumber: boolean = false;
  public validEmailInput: boolean = false;
  public validCpf: boolean = false;
  public validCnpj: boolean = false;
  public validTelefone: boolean = false;
  public validCep: boolean = false;
  public validComplemento: boolean = false;
  public validLogradouro: boolean = false;
  public validBairro: boolean = false;
  public validUf: boolean = false;

  public loading = false;
  public regexCep = new RegExp(/[0-9]{5}-[0-9]{3}/);
  public regexCpf = new RegExp(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/)
  public isValidCep = false;


  constructor(private cepService: BuscaCepService, public activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    window.scrollTo({top: 0, behavior: 'smooth'});
    this.activatedRoute.params.subscribe((params: Params) => {
      this.email = params['email'];
    })
    this.data.emailInput = this.email;
    this.cpfBackground = '#46a3ee';

  }


    setData(value: any, name: string) {
    this.data[`${name}`] = value;
  }

  isCnpj() {
    this.cpfBackground = '';
    this.CPF_CNPJ = 'CNPJ';
    this.cnpjBackground = '#46a3ee';
  }

  isCpf() {
    this.cnpjBackground = '';
    this.CPF_CNPJ = 'CPF';
    this.cpfBackground = '#46a3ee';
  }

  queryCep() {

    if (this.validateCep() && this.data.cep.length >= 9 ) {
      this.loading = true;
      this.cepService.search(this.data.cep).subscribe((data: any) => {
        if(data.erro) {
          this.erro = true;
          this.loading = false;

        } else {
          EventEmitterService.get(`errorEventToCEP`).emit(false);
          this.isValidCep = true;
          this.data.logradouro = data.logradouro;
          this.data.bairro = data.bairro;
          this.data.cidade = data.localidade;
          this.data.uf = data.uf;
          this.loading = false;
          this.validateLogradouro();
          this.validateBairro();
          this.validateUf();
          this.validateCidade();
        }
      },
      (invalidCep) => {
       console.log(invalidCep.erro)
      }
      )
    }
  }




  queryCity() {
    this.cepService.searchUf(this.id).subscribe((data2:any) => {

      for ( let i = 0; i < data2.length; i++) {

        if (this.data.cidade.length <= 0) {
          this.cities.push({option: data2[i].nome});
        } else {
          // this.cities = []
        }

      }

    })
  }


options = [
  {option: 'AC', id: 12},
  {option: 'AL', id: 27},
  {option: 'AP', id: 16},
  {option: 'AM', id: 13},
  {option: 'BA', id: 29},
  {option: 'CE', id: 23},
  {option: 'DF', id: 53},
  {option: 'ES', id: 32},
  {option: 'GO', id: 52},
  {option: 'MA', id: 21},
  {option: 'MT', id: 51},
  {option: 'MS', id: 50},
  {option: 'MG', id: 31},
  {option: 'PA', id: 15},
  {option: 'PB', id: 25},
  {option: 'PR', id: 41},
  {option: 'PE', id: 26},
  {option: 'PI', id: 22},
  {option: 'RJ', id: 33},
  {option: 'RN', id: 24},
  {option: 'RS', id: 43},
  {option: 'RO', id: 11},
  {option: 'RR', id: 14},
  {option: 'SC', id: 42},
  {option: 'SP', id: 35},
  {option: 'SE', id: 28},
  {option: 'TO', id: 17},
]


chosenUf(event) {
  this.data.uf = event.option;
  this.id = event.id;
  this.queryCity();
  this.cities = [];
  this.data.cidade = '';
}

chosenCity(event) {
  this.data.cidade = event.option
}

  validateCep(): boolean {
    this.isValidCep = false;
  return this.validCep  = this.regexCep.test(this.data.cep);
  }

  validateLogradouro(): boolean {
    return this.validLogradouro = this.data.logradouro.length > 2;
  }

  validateBairro(): boolean {
    return this.validBairro = this.data.bairro.length > 2;
  }

  validateUf(): boolean {
    return this.validUf = this.data.uf.length == 2;
  }

  validateCidade(): boolean {
    return this.data.cidade.length > 2;
  }

  validateComplemento(): boolean {
    return this.validComplemento = this.data.complemento.length > 0;
  }

  validateNumero(): boolean {
    return this.validNumber = this.data.numero.length > 0;
  }

  validateNome(): boolean {
    this.validName = this.data.nome.length > 4;
    return this.validName;
  }

  validateTelefoneCelular() {
    this.validTelefone = false;
    const regex = new RegExp(/(\(?\d{2}\)?\s)?(\d{4,5}\-\d{4})/);
    return this.validTelefone = regex.test(this.data.telefoneCelular);
  }

  validateCpfCnpj(): any {

    this.validCnpj = false;
    this.validCpf = false;

    if (this.data.CpfCnpj.length == 14) {
    this.validarCPF(this.data.CpfCnpj);
    }

    if (this.data.CpfCnpj.length == 18){
     this.validCnpj = this.validarCNPJ(this.data.CpfCnpj);
    }

    return null;
  }


  validarCPF(cpf): boolean {
    cpf = cpf.replace(/[^\d]+/g,'');
    if(cpf == '') return false;
    // Elimina CPFs invalidos conhecidos
    if (cpf.length != 11 ||
      cpf == "00000000000" ||
      cpf == "11111111111" ||
      cpf == "22222222222" ||
      cpf == "33333333333" ||
      cpf == "44444444444" ||
      cpf == "55555555555" ||
      cpf == "66666666666" ||
      cpf == "77777777777" ||
      cpf == "88888888888" ||
      cpf == "99999999999")
        return false;
    // Valida 1o digito
    let add = 0;
    for (let i=0; i < 9; i ++)
      add += parseInt(cpf.charAt(i)) * (10 - i);
      let rev = 11 - (add % 11);
      if (rev == 10 || rev == 11)
        rev = 0;
      if (rev != parseInt(cpf.charAt(9)))
        return false;
    // Valida 2o digito
    add = 0;
    for (let i = 0; i < 10; i ++)
      add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11)
      rev = 0;
    if (rev != parseInt(cpf.charAt(10)))
      return false;

      this.validCpf = true;
    return true;
  }

  validarCNPJ(cnpj):boolean {

    cnpj = cnpj.replace(/[^\d]+/g,'');

    if(cnpj == '') return false;

    if (cnpj.length != 14)
        return false;

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999")
        return false;

    // Valida DVs
    let tamanho = cnpj.length - 2
    let numeros = cnpj.substring(0,tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0,tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += numeros.charAt(tamanho - i) * pos--;
      if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1)){
      return false;
    }

    this.validCnpj = true;;
    return true;

}

verified() {
  if (this.validName) {
    EventEmitterService.get(`errorEventToNome`).emit(false);
  }

  if (this.validNumber) {
    EventEmitterService.get(`errorEventToNumero`).emit(false);
  }

  if (this.validBairro) {
    EventEmitterService.get(`errorEventToBairro`).emit(false);
  }

  if (this.validCnpj || this.validCpf) {
    EventEmitterService.get(`errorEventToCpfCnpj`).emit(false);
  }

  if (this.validTelefone) {
    EventEmitterService.get(`errorEventToTelefone`).emit(false);
  }

  if (this.validLogradouro) {
    EventEmitterService.get(`errorEventToLogradouro`).emit(false);
  }

  if (this.validComplemento) {
    EventEmitterService.get(`errorEventToComplemento`).emit(false);
  }
}

finish() {

  if (this.data.nome.length === 0 ||
    !this.validName
    ) {
    this.validName = false;
    EventEmitterService.get(`errorEventToNome`).emit();
    return;
  }

  if (this.data.cep.length === 0 || this.erro && !this.isValidCep) {
    this.isValidCep = false;
    EventEmitterService.get(`errorEventToCEP`).emit();
    return;
  }

  if (!this.validNumber) {
    EventEmitterService.get(`errorEventToNumero`).emit();
    return;
  }
  if (this.data.bairro.length === 0 ||
    !this.validBairro) {
    EventEmitterService.get(`errorEventToBairro`).emit();
    return;
  }

  if (this.data.CpfCnpj.length === 0 || !this.validCpf && !this.validCnpj )  {
    EventEmitterService.get(`errorEventToCpfCnpj`).emit();
    return
  }

  if (this.data.telefoneCelular.length === 0 ||
    !this.validTelefone) {
    EventEmitterService.get(`errorEventToTelefone`).emit();
    return;
  }

  if (this.data.logradouro.length === 0 ||
    !this.validLogradouro) {
    EventEmitterService.get(`errorEventToLogradouro`).emit();
    return;
  }

  if (this.data.complemento.length === 0 ||
    !this.validComplemento) {
    EventEmitterService.get(`errorEventToComplemento`).emit();
    return;
  }


EventEmitterService.get('disableInputErrorEvent').emit();

if (this.validName,
  this.validNumber,
  this.validCep,
  this.validBairro,
  this.validCpf || this.validCnpj,
  this.validTelefone,
  this.validLogradouro,
  this.validComplemento)
  {
    this.router.navigateByUrl('/compra');
  }
}

}


