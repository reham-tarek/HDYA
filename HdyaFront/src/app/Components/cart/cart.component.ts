import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';
import { ProductsService } from '../../services/products.service'
import { Product } from '../../models/interfaces/product'
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  cart:Product[] = [] ;
  total:Array<number> = [] ;
  totalPrice:number = 0 ;
  orders:Array<object> = [] ;


  constructor(private _products:ProductsService) { }

  ngOnInit(): void {
    AOS.init();


    if (localStorage.getItem("cart")){
      this.cart = JSON.parse(localStorage.getItem("cart") || '{}') 
    }
    
    

  }

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    
  }

  calcPrice(prd_id :number ,  Prd_price:number , quantaty:number , index:number){
   
    this.total[index] = quantaty * Prd_price    
    this.totalPrice = 0
    for ( let i=0 ; i< this.total.length ; i++){
      this.totalPrice += this.total[i]
    }
    if(this.orders.length > 0){

      let found = false ;
      for(let i =0 ; i <this.orders.length ; i++){
        if (this.orders[i].product == prd_id){
          this.orders[i] = {product : prd_id , quantaty : quantaty}
          found = true ;
          break ;
        }
      }if(found == false){
        this.orders.push({product : prd_id , quantaty : quantaty})
      }

    }
    else{
      this.orders.push({product : prd_id , quantaty : quantaty})

    }

    

    
    console.log(this.orders);
    
  }


  orderNow(){
    for(let i =0 ; i < this.cart.length ; i++){
      this._products.order(this.orders[i].product ,  this.orders[i].quantaty ).subscribe(
        (data)=>{
          localStorage.removeItem("cart")
          console.log(data)
      },

        (err)=> console.log(err)
        )
    }
  }

}
