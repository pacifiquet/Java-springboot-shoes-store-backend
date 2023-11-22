import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {ProductsService} from '../services/product/products.service';
import {ProductInterface} from '../dto/product/product-interface';
import {Store} from '@ngrx/store';
import {combineLatest} from 'rxjs';
import {
  getProductListState,
  productListErrorMessage,
} from '../guest/store/product/selector';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent implements OnInit {
  productList: Array<ProductInterface> = [];
  productList$ = combineLatest({
    products: this.store.select(getProductListState),
    errorMessage: this.store.select(productListErrorMessage),
  });
  constructor(private productService: ProductsService, private store: Store) {}

  ngOnInit(): void {
    this.productList = [];
  }

  isLogout: boolean = false;
  isDayActive: boolean = true;
  isWeekActive: boolean = false;
  isMonthActive: boolean = false;
  isYearActive: boolean = false;
  isDashboardActive: boolean = true;
  isAddProductActive: boolean = false;
  isDeletingProduct: boolean = false;

  isMenNavActive: boolean = true;
  isWomenNavActive: boolean = true;
  isKidsNavActive: boolean = false;

  deleteProduct() {
    this.isDeletingProduct = true;
  }

  approveDeleteProduct(event: boolean) {
    this.isDeletingProduct = event;
  }

  cancelDeleteProduct(event: boolean) {
    this.isDeletingProduct = event;
  }

  addProduct() {
    this.isDashboardActive = false;
    this.isAddProductActive = true;
  }

  viewProductAndEdit() {
    this.isAddProductActive = true;
  }

  hideAddProductModal(event: boolean) {
    this.isAddProductActive = !event;
    this.isDashboardActive = true;
  }

  dayStats() {
    this.isDayActive = true;
    this.isWeekActive = false;
    this.isMonthActive = false;
    this.isYearActive = false;
  }

  weekStats() {
    this.isDayActive = false;
    this.isWeekActive = true;
    this.isMonthActive = false;
    this.isYearActive = false;
  }
  monthStats() {
    this.isDayActive = false;
    this.isWeekActive = false;
    this.isMonthActive = true;
    this.isYearActive = false;
  }
  yearStats() {
    this.isDayActive = false;
    this.isWeekActive = false;
    this.isMonthActive = false;
    this.isYearActive = true;
  }
}
