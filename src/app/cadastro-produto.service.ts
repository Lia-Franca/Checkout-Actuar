import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { cadastroProdutos } from './shared/interfaces/novo-produto.interface';
import { Observable } from "rxjs";


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    Authorization: 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CadastroProdutoService {
  
  constructor(private http: HttpClient) { }
  protected UrlCadastro: string = "http://localhost:3000/data";
  



  gravar(data: cadastroProdutos): Observable<cadastroProdutos>{
    return this.http.post<cadastroProdutos>(this.UrlCadastro, data);
  }

  // deleteData(data: any): Observable<unknown>{
  //   console.log(data)
  //   const url = `http://localhost:3000/${data}`;
  //   return this.http.delete(url, httpOptions);
  // }

  deleteData(data: any){
    this.http.delete<cadastroProdutos>(`http://localhost:3000/data/1`)
    .subscribe({
      next: dat => {
        alert("Delete successful")
      }
    })
  }

  
}


