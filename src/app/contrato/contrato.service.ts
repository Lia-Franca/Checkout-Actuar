import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from "rxjs";

import { API, CLICKSIGN_ACCESS_TOKEN } from "../../environments/environment";

import { IAdicionarSignatarioDocumento, ICriarDocumento, ICriarSignatario, IDocumento, IVisualizarDocumento } from "./contrato.interface";

@Injectable({
  providedIn: 'root',
})
export class ContratoService {
  constructor(private http: HttpClient) { }

  criarDocumentoViaUpload(documento: ICriarDocumento): Observable<ICriarDocumento> {
    return this.http.post<ICriarDocumento>(`${API.proxyClickSign}/api/v1/documents?access_token=${CLICKSIGN_ACCESS_TOKEN}`, documento, {
      withCredentials: true,
    });
  }

  criarDocumentoViaModelo(documento: ICriarDocumento, chaveModeloDocumento: string): Observable<ICriarDocumento> {
    return this.http.post<ICriarDocumento>(`${API.proxyClickSign}/api/v1/templates/${chaveModeloDocumento}/documents?access_token=${CLICKSIGN_ACCESS_TOKEN}`, documento, {
      withCredentials: true,
    });
  }

  visualizarDocumento(key: string): Observable<IVisualizarDocumento> {
    return this.http.get<IVisualizarDocumento>(`${API.proxyClickSign}/api/v1/documents/${key}?access_token=${CLICKSIGN_ACCESS_TOKEN}`, {
      withCredentials: true,
    });
  }

  criarSignatario(signatario: ICriarSignatario): Observable<ICriarSignatario> {
    return this.http.post<ICriarSignatario>(`${API.proxyClickSign}/api/v1/signers?access_token=${CLICKSIGN_ACCESS_TOKEN}`, signatario, {
      withCredentials: true,
    });
  }

  adicionarSignatarioADocumento(signatarioDocumento: IAdicionarSignatarioDocumento): Observable<IAdicionarSignatarioDocumento> {
    return this.http.post<IAdicionarSignatarioDocumento>(`${API.proxyClickSign}/api/v1/lists?access_token=${CLICKSIGN_ACCESS_TOKEN}`, signatarioDocumento, {
      withCredentials: true,
    });
  }

  enviarNotificacaoAssinaturaDocumento(chaveRequisicaoAssinatura?: string): Observable<any> {
    return this.http.post<any>(`${API.proxyClickSign}/api/v1/notifications?access_token=${CLICKSIGN_ACCESS_TOKEN}`, { request_signature_key: chaveRequisicaoAssinatura }, {
      withCredentials: true,
    });
  }
}
