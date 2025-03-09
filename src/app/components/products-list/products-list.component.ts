import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, NgForOf, NgIf } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';

@Component({
  selector: 'app-products-list',
  imports: [NgIf, NgForOf, CurrencyPipe, RouterLink, NgbPagination],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent implements OnInit {
  currentPageNumber: number = 1;
  pageSize: number = 10;
  totalProductsRetrived: number = 0;

  currentCategoryId: number = 1;
  searchMode: boolean = false;

  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService,
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
      .searchProducts(keyword, this.currentPageNumber - 1, this.pageSize)
      .subscribe(this.processResponse());
  }

  handleListProducts() {
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;
      this.handleListProductsByCategory();
      return;
    }

    this.productService
      .listProducts(this.currentPageNumber - 1, this.pageSize)
      .subscribe(this.processResponse());
  }

  handleListProductsByCategory() {
    this.productService
      .searchProductsByCategory(
        this.currentCategoryId,
        this.currentPageNumber - 1,
        this.pageSize
      )
      .subscribe(this.processResponse());
  }

  updatePageSize(pageSize: string) {
    this.pageSize = +pageSize;
    this.currentPageNumber = 1;
    this.listProducts();
  }

  processResponse() {
    return (response: any) => {
      this.products = response.content;
      this.currentPageNumber = response.page.number + 1;
      this.pageSize = response.page.size;
      this.totalProductsRetrived = response.page.totalElements;
    };
  }

  addToCart(product: Product) {
    const cartItem = new CartItem(product);
    this.cartService.addItem(cartItem);
  }
}
