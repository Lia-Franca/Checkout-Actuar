export interface ICriarDocumento {
  document: IDocumento;
}

export interface IVisualizarDocumento {
  events: IEvento[];
  document: IDocumento;
  signers: ISignatario[];
}

export interface IDocumento {
  key: string;
  path: string;
  signers?: [];
  status?: string;
  locale?: string;
  filename?: string;
  metadata?: Object;
  events?: IEvento[];
  updated_at?: string;
  template?: ITemplate;
  uploaded_at?: string;
  finished_at?: string;
  deadline_at?: string;
  auto_close?: boolean;
  downloads?: IDownloads;
  content_base64?: string;
  signable_group?: string;
  remind_interval?: string;
  sequence_enabled?: boolean;
}

export interface ITemplate {
  data: IDadosContratanteDocumentoModelo | IDadosContratadoDocumentoModelo;
}

export interface IDownloads {
  original_file_url: string;
}

export interface IEvento {
  name: string;
  data: IDadosEvento;
  occurred_at: string;
}

export interface IDadosEvento {
  user: IUsuario;
  locale: string;
  account: IConta;
  deadline_at: string;
  auto_close: boolean;
}

export interface IUsuario {
  name: string;
  email: string;
}

export interface IConta {
  key: string;
}

export interface ICriarSignatario {
  signer: ISignatario;
}

export interface ISignatario {
  key: string;
  name?: string;
  email?: string;
  auths: string[];
  birthday?: string;
  updated_at?: string;
  created_at?: string;
  phone_number?: string;
  documentation?: string;
  selfie_enabled?: boolean;
  liveness_enabled?: boolean;
  has_documentation?: boolean;
  handwritten_enabled?: boolean;
  official_document_enabled?: boolean;
}

export interface IAdicionarSignatarioDocumento {
  list: ISignatarioDocumento;
}

export interface ISignatarioDocumento {
  key: string;
  url?: string;
  group?: number;
  sign_as: string;
  message?: string;
  signer_key: string;
  created_at?: string;
  updated_at?: string;
  document_key: string;
  request_signature_key: string;
}

export interface IDadosContratanteDocumentoModelo {
  cpf: string;
  email: string;
  nomeCompleto: string;
  dataNascimento: string;
}

export interface IDadosContratadoDocumentoModelo {
  cnpj: string;
  razaoSocial: string;
  cpfResponsavel: string;
  nomeResponsavel: string;
  emailResponsavel: string;
  dataNascimentoResponsavel: string;
}