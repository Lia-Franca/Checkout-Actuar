import { ICoupon } from "../../shared/interfaces/coupon.interface"

export class Coupon implements ICoupon {
  name = '';
  discount = 0;
  checked?: false;
}
