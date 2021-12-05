import { Component, OnInit } from '@angular/core';
import { EventEmitterService } from "../../shared/services/event-emitter.service";
import { ICoupon } from '../../shared/interfaces/coupon.interface';
import { Coupon } from './coupon.model';
import { ProductsService } from '../../shared/services/products-service.service';

@Component({
  selector: 'app-gerenciador-cupons',
  templateUrl: './gerenciador-cupons.component.html',
  styleUrls: ['./gerenciador-cupons.component.scss']
})
export class GerenciadorCuponsComponent implements OnInit {
  public isCoupons = false;
  public isOpenModal = false;
  public isEdit: boolean = false;
  public progressBarDisplay = 'none';
  public progressBarVisibility = 'visible';
  public progressBarClass = '';
  public typeOfAlertMessage = ``;
  public loading = false;
  public textAlertMessage = ``;
  public isOpenAlert = false;
  public couponsProperties: any = '';
  public objIndex: any = '';
  public data: ICoupon = {
    name: '',
    discount: ''
  };
    public coupons: any[] = [
    {
      name: 'teste',
      discount: 11,
      checked: false
    },
    {
      name: 'teste1',
      discount: 22,
      checked: false
    }
  ];

  constructor(
    private productsService: ProductsService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }


  getProducts() {
    this.productsService.getAllProducts().subscribe(
      products => {
      this.coupons = this.coupons;
      console.log(this.coupons);
      },
      erro => {
        this.coupons.push(erro);
      }
    )
  }

  markOptionChecked(index: number, event: any): void {
    event.preventDefault();

    for (const coupon of this.coupons) {
      coupon.checked = false;
    }

    this.objIndex = this.coupons.indexOf(this.coupons[index]);
    this.couponsProperties = this.coupons[index];
    this.coupons[index].checked = true;
    this.openModal(this.coupons[index]);

    if (this.coupons[index].checked) {
      this.data.name = this.coupons[index].name;
      this.data.discount = this.coupons[index].discount;
    }

  }

  setData(value: any, name: string) {
    this.data[`${name}`] = value;
  }

  registerCoupon() {
    if (this.data.name.length > 0) {
      EventEmitterService.get(`errorEventToCoupon`).emit(false);
    }

    if (this.data.discount > 0 ) {
      EventEmitterService.get(`errorEventToDiscount`).emit(false);
    }
  }

  saveChanges() {

    if (this.data.name.length === 0 || this.data.discount === 0) {
      EventEmitterService.get(`errorEventToCoupon`).emit();
      EventEmitterService.get(`errorEventToDiscount`).emit();
    }

    this.progressBarDisplay = 'unset';
    this.loading = true;
    if (this.isEdit) {
      console.log(this.couponsProperties),
      console.log(this.data.name)
      this.productsService.updateProduct(this.data.name, this.couponsProperties).subscribe(() => {
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

  openModal(params?: any ) {
    params?(
        this.isEdit = true,
          this.data.name = params.name,
          this.data.discount = params.discount,
          this.data.checked = params.checked
      ): (
      this.isEdit = false,
      this.data = new Coupon());

    this.toggleModal();

  }


  updateProduct() {
    if (this.couponsProperties.checked) {
      this.couponsProperties.Valor = this.data.name;
      this.couponsProperties.Descricao = this.data.discount;
    }
  }


  removeProduct() {
    console.log(this.objIndex)
    if (this.couponsProperties.checked) {
      this.couponsProperties.removeProduct(this.objIndex).subscribe(() => {
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

  toggleModal() {
    this.isOpenModal = !this.isOpenModal;
  }

  alertMessage(message: string, type: string) {
    this.isOpenAlert = !this.isOpenAlert;
    this.textAlertMessage = message;
    this.typeOfAlertMessage = type;
  }

}
