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

  getProducts(categoryId: number): Observable<Product[]> {
    let url: string = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;

    return this.httpClient
      .get<GetResponsePage>(url)
      .pipe(map((response) => response.content));
  }
}

interface GetResponsePage {
  content: Product[];
}
