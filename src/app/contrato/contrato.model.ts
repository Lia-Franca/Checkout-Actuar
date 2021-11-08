import { IDadosContratanteDocumentoModelo, IDadosContratadoDocumentoModelo } from './contrato.interface';

export class DadosContratanteDocumentoModelo implements IDadosContratanteDocumentoModelo {
    public cpf = '';
    public email = '';
    public nomeCompleto = '';
    public dataNascimento = '';

    constructor(cpf?: string, email?: string, nomeCompleto?: string, dataNascimento?: string) {
        this.cpf = cpf || '';
        this.email = email || '';
        this.nomeCompleto = nomeCompleto || '';
        this.dataNascimento = dataNascimento || '';
    }
  }
  
  export class DadosContratadoDocumentoModelo implements IDadosContratadoDocumentoModelo {
    public cnpj = '';
    public razaoSocial = '';
    public cpfResponsavel = '';
    public nomeResponsavel = '';
    public emailResponsavel = '';
    public dataNascimentoResponsavel = '';

    constructor(cnpj?: string, razaoSocial?: string, cpfResponsavel?: string, nomeResponsavel?: string, emailResponsavel?: string, dataNascimentoResponsavel?: string) {
        this.cnpj = cnpj || '';
        this.razaoSocial = razaoSocial || '';
        this.cpfResponsavel = cpfResponsavel || '';
        this.nomeResponsavel = nomeResponsavel || '';
        this.emailResponsavel = emailResponsavel || '';
        this.dataNascimentoResponsavel = dataNascimentoResponsavel || '';
    }
  }