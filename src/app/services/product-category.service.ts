import { Injectable } from '@angular/core';
import { ProductCategory } from '../common/object/product-category';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService {
  private baseUrl: string = 'http://localhost:8080/v1/api/product-categories';

  constructor(private httpClient: HttpClient) {}

  getProductCategories(): Observable<ProductCategory[]> {
    return this.httpClient
      .get<GetResponsePageProductCategory>(this.baseUrl)
      .pipe(map((response) => response.content));
  }
}

interface GetResponsePageProductCategory {
  content: ProductCategory[];
}
