import { Component, OnInit } from '@angular/core';
import { cadastroProdutos } from '../shared/interfaces/novo-produto.interface';
import { CadastroProdutoService } from '../cadastro-produto.service';
import { EventEmitterService } from "../shared/services/event-emitter.service";

@Component({
  selector: 'app-novo-produto',
  templateUrl: './novo-produto.component.html',
  styleUrls: ['./novo-produto.component.scss']
  
})
export class NovoProdutoComponent implements OnInit {
  public isEdit: boolean = false;
  public productsProperties: any = '';
  public selectedOption: any = '';
  public installments: number = 12; // Número de parcelas
  public data: cadastroProdutos = {
    produto: '',
    preco: '',
  };

  products = [{
    description: 'Catraca',
    price: 4999,
    checked: false,
  },
  {
    description: 'Software',
    price: 999,
    checked: false,
  },
  {
    description: 'Catraca + Software',
    price: 5999,
    checked: false,
  }
  ]

  options: any[] = [];

  constructor(private service: CadastroProdutoService) { }

  ngOnInit(): void {


    for (let i: number = 1 ; i < this.installments+1; i++ ) {
      this.options.push({option: `${i}x ${((this.products[2].price)/i).toLocaleString('pt-br', {style: 'currency', currency: 'BRL'})}`});
      this.selectedOption = this.options[this.options.length - 1].option;
    }
  
    
  }

  markOptionChecked(index: number, event: any): void {
    event.preventDefault();
    this.productsProperties = this.products[index];
    this.products[index].checked = true;
    this.isEdit = true;

    for (const product of this.products) {
      product.checked = false;
    }

    if (this.products[index].checked = true) {
      this.data.produto = this.products[index].description
      this.data.preco = this.products[index].price;
    }

  }


  setData(value: any, name: string) {
    this.data[`${name}`] = value;
  }

  productRegister() {


    if (this.data.preco === this.productsProperties.price && this.data.produto === this.productsProperties.description) {
      let newProduct = {
        "description": this.data.produto,
        "price": this.data.preco,
        "checked": false,
      }
      EventEmitterService.get(`errorEventToProduto`).emit(false);
      EventEmitterService.get(`errorEventToPreco`).emit(false);
      this.products.push(newProduct)
    }

    if (this.data.preco.length > 0 && this.data.produto.length > 0)  {
      let newProduct = {
        "description": this.data.produto,
        "price": this.data.preco,
        "checked": false,
      }
      EventEmitterService.get(`errorEventToProduto`).emit(false);
      EventEmitterService.get(`errorEventToPreco`).emit(false);
      this.products.push(newProduct)
    } 

    if (this.data.produto.length === 0) {
      EventEmitterService.get(`errorEventToProduto`).emit();
    }

    if (this.data.preco.length === 0) {
      EventEmitterService.get(`errorEventToPreco`).emit();
    }
    
  }
  
  productEdit() {
    if (this.productsProperties.checked = true) {
      this.productsProperties.price = this.data.preco;
      this.productsProperties.description = this.data.produto;
    }
  }

  productDelete() {

    if (this.productsProperties.checked = true) {
      let removeIndex = this.products.map(function(item) { return item.checked;}).indexOf(true);
      this.products.splice(removeIndex, 1)
    }
  }

  
  gravar(data: cadastroProdutos) {
    this.service.gravar(data).subscribe(() =>
    {
      alert('Sucesso');
  }, 
  () => {
    alert('erro');
  });
  }

  deleteData(data: cadastroProdutos): void {
    Object.keys(d => d !== data);
    console.log(data);
    this.service
    .deleteData(data)
    // .subscribe();
  }

}
