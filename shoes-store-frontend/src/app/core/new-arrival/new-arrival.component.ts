import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faStarHalfAlt } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { ProductInterface } from 'src/app/dto/product/product-interface';
import { ProductsService } from 'src/app/services/product/products.service';

@Component({
  selector: 'app-new-arrival',
  templateUrl: './new-arrival.component.html',
  styleUrls: ['./new-arrival.component.css'],
})
export class NewArrivalComponent implements OnInit {
  newArrival: Array<ProductInterface> = [];
  product: ProductInterface = {};
  recentlyUpdated: Array<ProductInterface> = [];
  star = faStar;
  haflIcon = faStarHalfAlt;
  constructor(
    private productService: ProductsService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.newArrival = this.productService.getAllProducts().slice(2);
    // .filter((product) => product.id !== 4);
    this.recentlyUpdated = this.productService.getAllProducts();
  }

  getProductReviewAverage(product: ProductInterface) {
    return this.productService.getProductReviewAverage(product.reviews);
  }
}
