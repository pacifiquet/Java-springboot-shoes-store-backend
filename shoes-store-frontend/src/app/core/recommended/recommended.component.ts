import { Component, OnInit } from '@angular/core';
import { faStarHalfAlt } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { ProductInterface } from 'src/app/dto/product-interface';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrls: ['./recommended.component.css'],
})
export class RecommendedComponent implements OnInit {
  openProductModal: boolean = false;
  recommendedList: Array<ProductInterface> = [];
  topTenProduct: Array<ProductInterface> = [];
  average: number = 0;
  star = faStar;
  haflIcon = faStarHalfAlt;
  constructor(private productServie: ProductsService) {}
  ngOnInit(): void {
    this.recommendedList = this.productServie.getAllProducts().slice(2);
    // .filter((p) => p.id !== 4);
    this.topTenProduct = this.productServie.getTopTenProductsByRating();
  }

  getProductReviewAverage(product: ProductInterface) {
    return this.productServie.getProductReviewAverage(product.reviews);
  }
}
