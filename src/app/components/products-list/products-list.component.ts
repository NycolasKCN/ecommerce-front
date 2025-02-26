import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, NgForOf } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { Product } from '../../common/product';

@Component({
  selector: 'app-products-list',
  imports: [NgForOf, CurrencyPipe],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.listProducts();
  }

  listProducts() {
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
    });
  }
}
