import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/v1/api/products';

  constructor(private httpClient: HttpClient) {}

  private getProducts(url: string) {
    return this.httpClient
      .get<GetResponsePage>(url)
      .pipe(map((response) => response.content));
  }

  getProduct(id:number) : Observable<Product> {
    let url: string = `${this.baseUrl}/${id}`;
    return this.httpClient.get<Product>(url);
  }

  getProductsList() {
    return this.getProducts(this.baseUrl);
  }

  searchProductsByCategory(categoryId: number): Observable<Product[]> {
    let url: string = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;
    return this.getProducts(url);
  }

  searchProducts(keyword: string) {
    let url: string = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`;
    return this.getProducts(url);
  }
}

interface GetResponsePage {
  content: Product[];
}
