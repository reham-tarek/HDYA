import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Product } from '../models/interfaces/product'
import { ProductPicture } from '../models/interfaces/product-picture'
import { Category } from '../models/interfaces/category'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http:HttpClient) { }



  viewProducts():Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/products/`)
  }


  viewProductsByPage(url:string):Observable<any>{
    return this.http.get<any>(url)
  }
  
  // viewProductsWithPage(pageNumber:number):Observable<any>{
  //   return this.http.get<any>(`${environment.apiUrl}/products/?page=${pageNumber}`)
  // }
 
  viewProductById(id:number):Observable<Product>{
    return this.http.get<Product>(`${environment.apiUrl}/products/${id}/`)
  }


  order(product:number , quantity:number , status:string = 'p' , ):Observable<any>{

    const headerDict = {
      'Authorization':'Token ' +  localStorage.getItem('token')
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };

    return this.http.post<any>(`${environment.apiUrl}/orders/`, {product : product, quantity:quantity ,status :status} , requestOptions)
  }


  showorders():Observable<any>{

    const headerDict = {
      'Authorization':'Token ' +  localStorage.getItem('token')
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };

    return this.http.get<any>(`${environment.apiUrl}/orders/`, requestOptions)
  }

  // viewProductsBycat(catId?:number):Observable<Product>{ 
  //   return this.http.get<Product>(`${environment.apiUrl}/products/?category=${catId}`)
  // }
  
  viewProductsBycat(searchparams:object):Observable<Product>{ 
    let query_string= "" ; 
      for (let i in searchparams){
        query_string+=`${i}=${searchparams[i]}&`
      }
      
    console.log(`${environment.apiUrl}/products/?${query_string}/`);
    return this.http.get<Product>(`${environment.apiUrl}/products/?${query_string}/`)
  }
  // name:string,price?:number,gender?:string,age_from?:number,age_to?:number,catId?:number,user?:number,is_featured?:boolean
  // name=${name}&price=${price}&gender=${gender}&age_from=${age_from}&age_to=${age_to}&category=${catId}&user=${user}&is_featured=${is_featured}
  // query_string= "" 
  // if( name) query_String+="name"=name 
  // if(category) 
  createProduct(data:object):Observable<Product>{
    const headerDict = {
      'Authorization':'Token ' +  localStorage.getItem('token')
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };

    return this.http.post<Product>(`${environment.apiUrl}/products/` , data , requestOptions) 
  }
  createProductImages(data:any):Observable<ProductPicture>{
    const headerDict = {
      'Authorization':'Token ' +  localStorage.getItem('token')
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    return this.http.post<ProductPicture>(`${environment.apiUrl}/product_imgs/` , data , requestOptions)
  }
  showcategories():Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/categories/`)
  }


  showrelations():Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/RelationShips/`)
  }

  showoccassions():Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/occassions/`)
  }

  ReviewProduct(body:string , rate:number ,product:number):Observable<any>{
    const headerDict = {
      'Authorization':'Token ' +  localStorage.getItem('token')
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };

    return this.http.post<Product>(`${environment.apiUrl}/product/reviews/` ,{body:body,rate:rate,product:product} , requestOptions) 
    
  }

  showreviews(product_id:number):Observable<any>{
    
    return this.http.get<Product>(`${environment.apiUrl}/product/reviews/?product=${product_id}`, ) 
    
  }



}
