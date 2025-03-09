import { NgForOf, TitleCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ProductCategory } from '../../common/object/product-category';
import { ProductCategoryService } from '../../services/product-category.service';

@Component({
  selector: 'app-product-category-menu',
  imports: [NgForOf, RouterLink, RouterLinkActive, TitleCasePipe],
  templateUrl: './product-category-menu.component.html',
  styleUrl: './product-category-menu.component.css',
})
export class ProductCategoryMenuComponent implements OnInit {
  productCategories: ProductCategory[] = [];

  constructor(private productCategoryService: ProductCategoryService) {}

  ngOnInit(): void {
    this.listProductCategories();
  }

  listProductCategories() {
    this.productCategoryService
      .getProductCategories()
      .subscribe((data) => (this.productCategories = data));
  }
}
