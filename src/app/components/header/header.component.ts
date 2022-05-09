import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public totalItem: number = 0;
  public searchKeyword: string = '';
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    .subscribe(res => {
      this.totalItem = res.length;
    });
  }

  search(event: any) {
    this.searchKeyword = (event.target as HTMLInputElement).value; // whatever we put in the input text will come to searchKeyword.
    console.log(this.searchKeyword);
    this.cartService.search.next(this.searchKeyword); // here this behaviou subject is acting as an emitter
  } 

}
