import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { ProductInterface } from '../dto/product-interface';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  productList: Array<ProductInterface> = [];
  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.productList = this.productService.getAllProducts().slice(2);
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
