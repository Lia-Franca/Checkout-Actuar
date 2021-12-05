import { Injectable } from '@angular/core';
import { API } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer, of } from 'rxjs';
import { IProduct } from '../interfaces/product.interface';
import { ICoupon } from '../interfaces/coupon.interface';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  public data: IProduct[] = []

  constructor( private http: HttpClient) { }

  

  public getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>( `${API.base}/marketplace/api/Produto/ObterProdutosEmVitrine`);
  }

  public createProduct(product) {
    return this.http.post(`${API.base}/marketplace/api/Produto/Adicionar`, product);
  }

  // public getProductbyId(id) {
  //   return this.http.get( `${API.base}/marketplace/api/Produto/ObterProdutosEmVitrine/${id}`);
  // }

  public updateProduct(id, product) {
    return this.http.put(`${API.base}/marketplace/api/Produto/Atualizar/`, product);
  }

  public removeProduct(product) {
    return this.http.delete(`${API.base}/product/delete/${product.id}`, product);
  }

}
