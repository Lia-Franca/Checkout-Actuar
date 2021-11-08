import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

import { ContratoHelper } from './contrato.helper';

import { ContratoService } from "./contrato.service";

import { TipoDocumentoEnum, TipoAssinatura, TipoAutenticacao } from './contrato.enum';

import { ICriarDocumento, ICriarSignatario, IAdicionarSignatarioDocumento, IDadosContratanteDocumentoModelo } from "./contrato.interface";

import { DadosContratanteDocumentoModelo } from './contrato.model';

import { API, URL_CONTRATO_PDF, CHAVE_CONTRATO_MODELO, DADOS_CONTRATATANTE_DOCUMENTO_MODELO } from "../../environments/environment";

declare var Clicksign: any;

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.scss']
})
export class ContratoComponent implements OnInit {
  @ViewChild('contrato', { static: true }) public contrato: ElementRef | null = null;

  @Input() public dadosContratante: IDadosContratanteDocumentoModelo = new DadosContratanteDocumentoModelo();

  @Input() public tipoDocumento: number = TipoDocumentoEnum.UPLOAD;

  @Output() public contratoAssinado = new EventEmitter();

  public carregando = true;

  private chaveDocumento: string = '';
  private chaveSignatarioContratado: string = '';
  private chaveSignatarioContratante: string = '';
  private chaveRequisicaoAssinaturaContratado: string = '';
  private chaveRequisicaoAssinaturaContratante: string = '';

  constructor(
    private contratoService: ContratoService
  ) { }

  public ngOnInit(): void {
    this.tipoDocumento === TipoDocumentoEnum.MODELO ? this.criarContratoPorModelo() : this.criarContratoPorUpload();
  }

  public criarContratoPorUpload() {
    ContratoHelper.obterContratoBase64(URL_CONTRATO_PDF).then((contratoBase64) => {
      const documento: ICriarDocumento = {
        document: {
          key: '',
          content_base64: contratoBase64,
          path: '/' + ContratoHelper.obterNomeArquivo(this.dadosContratante.nomeCompleto, this.tipoDocumento),
        }
      }
  
      this.contratoService.criarDocumentoViaUpload(documento).subscribe((data) => {
        this.chaveDocumento = data.document.key;
        this.criarSignatarioContratante();
      }, (error) => {
        this.carregando = false;
        throw new Error(error);
      });
    }).catch((error) => {
      this.carregando = false;
      throw new Error(error);
    });
  }

  public criarContratoPorModelo() {
    const documento: ICriarDocumento = {
      document: {
        key: '',
        path: '/' + ContratoHelper.obterNomeArquivo(this.dadosContratante.nomeCompleto, this.tipoDocumento),
        template: {
          data: {
            cpf: this.dadosContratante.cpf,
            email: this.dadosContratante.email,
            nomeCompleto: this.dadosContratante.nomeCompleto,
            dataNascimento: this.dadosContratante.dataNascimento,
          }
        }
      }
    }

    this.contratoService.criarDocumentoViaModelo(documento, CHAVE_CONTRATO_MODELO).subscribe((data) => {
      this.chaveDocumento = data.document.key;
      this.criarSignatarioContratante();
    }, (error) => {
      this.carregando = false;
      throw new Error(error);
    });
  }

  public criarSignatarioContratante(): void {
    const signatario: ICriarSignatario = {
      signer: {
        key: '',
        auths: [TipoAutenticacao.EMAIL],
        email: this.dadosContratante.email,
        documentation: this.dadosContratante.cpf,
        name: this.dadosContratante.nomeCompleto,
        birthday: this.dadosContratante.dataNascimento,
      }
    }

    this.contratoService.criarSignatario(signatario).subscribe(((data) => {
      this.chaveSignatarioContratante = data.signer.key;
      this.criarSignatarioContratado();
    }), (error) => {
      this.carregando = false;
      throw new Error(error);
    });
  }

  public criarSignatarioContratado(): void {
    const signatario: ICriarSignatario = {
      signer: {
        key: '',
        auths: [TipoAutenticacao.EMAIL],
        name: DADOS_CONTRATATANTE_DOCUMENTO_MODELO.nomeResponsavel,
        email: DADOS_CONTRATATANTE_DOCUMENTO_MODELO.emailResponsavel,
        documentation: DADOS_CONTRATATANTE_DOCUMENTO_MODELO.cpfResponsavel,
        birthday: DADOS_CONTRATATANTE_DOCUMENTO_MODELO.dataNascimentoResponsavel,
      }
    }

    this.contratoService.criarSignatario(signatario).subscribe(((data) => {
      this.chaveSignatarioContratado = data.signer.key;
      this.adicionarSignatarioContratanteAoDocumento();
    }), (error) => {
      this.carregando = false;
      throw new Error(error);
    });
  }

  public adicionarSignatarioContratanteAoDocumento(): void {
    const signatarioDocumento: IAdicionarSignatarioDocumento = {
      list: {
        key: '',
        request_signature_key: '',
        document_key: this.chaveDocumento,
        sign_as: TipoAssinatura.CONTRATANTE,
        signer_key: this.chaveSignatarioContratante,
      }
    }

    this.contratoService.adicionarSignatarioADocumento(signatarioDocumento).subscribe((data) => {
      this.chaveRequisicaoAssinaturaContratante = data.list.request_signature_key;
      this.adicionarSignatarioContratadoAoDocumento();
    }, (error) => {
      this.carregando = false;
      throw new Error(error);
    });
  }

  public adicionarSignatarioContratadoAoDocumento(): void {
    const signatarioDocumento: IAdicionarSignatarioDocumento = {
      list: {
        key: '',
        request_signature_key: '',
        document_key: this.chaveDocumento,
        sign_as: TipoAssinatura.CONTRATADO,
        signer_key: this.chaveSignatarioContratado,
      }
    }

    this.contratoService.adicionarSignatarioADocumento(signatarioDocumento).subscribe((data) => {
      this.chaveRequisicaoAssinaturaContratado = data.list.request_signature_key;
      this.enviarNotificacaoAssinarDocumento();
    }, (error) => {
      this.carregando = false;
      throw new Error(error);
    });
  }

  public enviarNotificacaoAssinarDocumento(): void {
    this.contratoService.enviarNotificacaoAssinaturaDocumento(this.chaveRequisicaoAssinaturaContratado).subscribe(() => {
      this.exibirContrato(this.chaveRequisicaoAssinaturaContratante);
    }, (error) => {
      this.carregando = false;
      throw new Error(error);
    });
  }

  public exibirContrato(requestSignatureKey: string): void {
    if (!this.contrato) { throw new Error('Não foi encontrado o elemento "contrato"'); }

    const widget = new Clicksign(requestSignatureKey);

    widget.origin = window.origin;
    widget.endpoint = API.apiClickSign;

    widget.mount(this.contrato.nativeElement.id);

    widget.on('signed', () => { this.onContratoAssinado(); });
    widget.on('loaded', () => { this.onContratoCarregado(); });
  }

  public onContratoAssinado(): void {
    this.contratoAssinado.emit();
  }

  public onContratoCarregado(): void {
    this.carregando = false;
  }
}
