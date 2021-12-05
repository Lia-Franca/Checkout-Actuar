import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../shared/interfaces/product.interface';
import { EventEmitterService } from "../../shared/services/event-emitter.service";
import { Product } from './product.model';
import { ProductsService } from "../../shared/services/products-service.service";

@Component({
  selector: 'app-gerenciador-produtos',
  templateUrl: './gerenciador-produtos.component.html',
  styleUrls: ['./gerenciador-produtos.component.scss']
})
export class GerenciadorProdutosComponent implements OnInit {
  public isEdit: boolean = false;
  public productChecked: any = '';
  public isOpenModal = false;
  public isOpenAlert = false;
  public loading = false;
  public textAlertMessage = ``;
  public typeOfAlertMessage = ``;
  public progressBarVisibility = 'visible';
  public progressBarClass = '';
  public errorClass = '';
  public successClass = '';
  public progressBarDisplay = 'none';
  public objIndex: any = '';
  public data: IProduct = new Product();
  public products: IProduct[] = [];
  public options: any[] = [];

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.productsService.getAllProducts().subscribe(
      products => {
      this.products = products;
      console.log(this.products);
      },
      erro => {
        this.products.push(erro);
      }
    )
  }


  markOptionChecked(index: number, event: any): void {
    event.preventDefault();

    for (const product of this.products) {
      product.checked = false;
    }

    this.objIndex = this.products.indexOf(this.products[index]);
    this.productChecked = this.products[index];
    this.productChecked.checked = true;
    this.openModal(this.productChecked);

    if ( this.productChecked.checked) {
      this.data.Descricao = this.productChecked.Descricao;
      this.data.Valor = this.productChecked.Valor;
    }

  }

  setData(value: any, name: string) {
    this.data[`${name}`] = value;
  }



  registerProduct() {
    if (this.data.Descricao.length > 0) {
      EventEmitterService.get(`errorEventToProduto`).emit(false);
    }

    if (this.data.Valor > 0 ) {
      EventEmitterService.get(`errorEventToPreco`).emit(false);
    }
  }


  updateProduct() {
    if (this.productChecked.checked) {
      this.productChecked.Valor = this.data.Valor;
      this.productChecked.Descricao = this.data.Descricao;
    }
  }


  removeProduct() {
    console.log(this.objIndex)
    if (this.productChecked.checked) {
      this.productsService.removeProduct(this.objIndex).subscribe(() => {
          this.alertMessage('Produto cadastrado com êxito', 'sucesso');
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.alertMessage(`Erro ${error}`, `erro`);
        }
      )
      return;
    }


  }

  openModal(params?: any ) {
    params?(
        this.isEdit = true,
          this.data.Descricao = params.Descricao,
          this.data.Valor = params.Valor,
          this.data.ProdutoId = params.ProdutoId
      ): (
      this.isEdit = false,
      this.data = new Product());

    this.toggleModal();

  }

  toggleModal() {
    this.isOpenModal = !this.isOpenModal;
  }

  saveChanges() {

    if (this.data.Descricao.length === 0 || this.data.Valor === 0) {
      EventEmitterService.get(`errorEventToProduto`).emit();
      EventEmitterService.get(`errorEventToPreco`).emit();
    }

    this.progressBarDisplay = 'unset';
    this.loading = true;
    if (this.isEdit) {
      console.log(this.productChecked),
      console.log(this.data.ProdutoId)
      this.productsService.updateProduct(this.data.ProdutoId, this.productChecked).subscribe(() => {
          this.alertMessage('Produto cadastrado com êxito', 'sucesso');
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          this.alertMessage(`Erro ${error}`, `erro`);
        }
      )
      return;
    }

    console.log(this.data)
    if(!this.isEdit) {
      this.productsService.createProduct(this.data).subscribe(() => {
        this.alertMessage('Produto cadastrado com êxito', 'sucesso');
          this.loading = false;
          console.log(this.data);
          this.getProducts();
      },
        (error) => {
          this.loading = false;
          this.alertMessage(`Erro ${error}`, `erro`)
        }
      )
      return;
    }


  }

  alertMessage(message: string, type: string) {
    this.isOpenAlert = !this.isOpenAlert;
    this.textAlertMessage = message;
    this.typeOfAlertMessage = type;
  }

}
