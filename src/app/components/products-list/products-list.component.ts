import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, NgForOf, NgIf } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-products-list',
  imports: [NgIf, NgForOf, CurrencyPipe, RouterLink],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent implements OnInit {
  currentCategoryId: number = 1;
  searchMode: boolean = false;

  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const keyword: string = this.route.snapshot.paramMap.get('keyword')!;

    this.productService
      .searchProducts(keyword)
      .subscribe((data) => (this.products = data));
  }

  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    this.currentCategoryId = 1;

    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
    }

    this.productService
      .searchProductsByCategory(this.currentCategoryId)
      .subscribe((data) => {
        this.products = data;
      });
  }
}
