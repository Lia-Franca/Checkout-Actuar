import { IProduct } from "../../shared/interfaces/product.interface";

export class Product implements IProduct {
  Descricao = '';
  Valor = 0;
  emVitrine = false;
  checked?: false;
}
