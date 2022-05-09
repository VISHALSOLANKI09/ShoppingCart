import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  // next method is used to pass every value emitted by the observer 

  public cartItemList: any = [];
  public productList = new BehaviorSubject<any>([]); // will behave like both observer and observable
  public search = new BehaviorSubject<string>(""); 

  constructor() { }

  getProducts() {
    return this.productList.asObservable(); // It will prevent leaking the observer side of an object. So, the subscriber can't use next
  }

  setProduct(product: any) {
    this.cartItemList.push(...product);
    this.productList.next(product);
  }

  addToCart(product: any) {
    this.cartItemList.push(product);
    this.productList.next(this.cartItemList);
    this.getTotalPrice();

    // logging the data after adding all required items.
    console.log(this.cartItemList);
  }
  getTotalPrice(): number {
    let grandTotal = 0;
    this.cartItemList.map((a: any) => {
      grandTotal += a.total;
    });
    return grandTotal;
    // return 0;
  }

  removeCartItem(product: any) {
    this.cartItemList.map((a: any, index: any) => {
      if(product.id === a.id) {
        this.cartItemList.splice(index, 1);
      }
    })
    this.productList.next(this.cartItemList);
  }

  removeAllCart() {
    this.cartItemList = [];
    this.productList.next(this.cartItemList);
  }
  
}
