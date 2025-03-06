import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  // Make this a env variable
  private baseUrl = 'http://localhost:8080/v1/api/products';

  constructor(private httpClient: HttpClient) {}

  private getProducts(url: string): Observable<GetResponseProducts> {
    return this.httpClient.get<GetResponseProducts>(url);
  }

  getProduct(id: number): Observable<Product> {
    let url: string = `${this.baseUrl}/${id}`;
    return this.httpClient.get<Product>(url);
  }

  searchProductsByCategory(
    categoryId: number,
    page: number,
    pageSize: number
  ): Observable<GetResponseProducts> {
    let url: string = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}&page=${page}&size=${pageSize}`;
    return this.getProducts(url);
  }

  searchProducts(
    keyword: string,
    page: number,
    pageSize: number
  ): Observable<GetResponseProducts> {
    let url: string = `${this.baseUrl}/search/findByNameContaining?name=${keyword}&page=${page}&size=${pageSize}`;
    return this.getProducts(url);
  }

  listProducts(
    page: number,
    pageSize: number
  ): Observable<GetResponseProducts> {
    const url: string = `${this.baseUrl}?page=${page}&size=${pageSize}`;
    return this.getProducts(url);
  }
}

interface GetResponseProducts {
  content: Product[];
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
