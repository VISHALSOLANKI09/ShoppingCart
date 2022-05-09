import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service'; 
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public productList: any;
  public filterProducts: any;
  searchKey: string = "";
  constructor(private api: ApiService, private cartService: CartService) { }

  ngOnInit(): void {
    this.api.getProduct("https://fakestoreapi.com/products/")
    .subscribe((items)=>{
      this.productList = items;
      this.filterProducts = items;
      this.productList.forEach((a:any) => {
        if(a.category === "women's clothing" || a.category === "men's clothing"){
          a.category = "fashion";
        }
        Object.assign(a, {quantity: 1, total: a.price});
      });
      console.log(this.productList);
    }); 
    // this.api.getProduct("https://fakestoreapi.com/products/")
    // .subscribe((res)=>{
    //   this.productList = res;
    // });

    this.cartService.search.subscribe((val: string) => {
      this.searchKey = val;
    }); // here it is acting as an observer(subscriber)
  }

  addToCart(item: any) {
    this.cartService.addToCart(item);
  }

  filter(category: any) {
    this.filterProducts = this.productList
    .filter((a: any) => {
      if(a.category == category || category=='') {
        return a;
      }
    }); 
  }
}
