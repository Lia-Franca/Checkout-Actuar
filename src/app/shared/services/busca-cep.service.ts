import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Config } from '@fortawesome/fontawesome-svg-core';

@Injectable({
  providedIn: 'root'
})
export class BuscaCepService {
  constructor(private httpClient: HttpClient) { }

  search(cep: string) {
    return this.httpClient.get(`https://viacep.com.br/ws/${cep}/json/`)
  }

  searchUf(id: string) {
    return this.httpClient.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/municipios`)
  }

}
