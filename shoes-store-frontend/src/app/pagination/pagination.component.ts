import {Component, Input, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {ContentResponse} from '../guest/store/product/types/ProductInterface';
import {
  productListActions,
  productListByCategiryActions,
} from 'src/app/guest/store/product/actions';
import {combineLatest} from 'rxjs';
import {
  selectProductList,
  selectProductListByCategory,
} from 'src/app/guest/store/product/productReducer';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  currentPage = 1;
  @Input() products: ContentResponse = {
    content: [],
    length: 0,
    size: 0,
    sort: {
      sorted: false,
      unsorted: false,
      empty: false,
    },
    totalElements: 0,
    totalPages: 0,
    number: 0,
    last: false,
    first: false,
  };

  pageNumber = 0;
  pageSize = 3;
  @Input() category: string = '';
  paginationProducts$ = combineLatest({
    productList: this.store.select(selectProductList),
    byCategory: this.store.select(selectProductListByCategory),
  });
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.paginationProducts$.subscribe(({productList, byCategory}) => {
      if (productList?.number) {
        this.currentPage = productList.number + 1;
        this.products = productList;
      }
      if (byCategory?.number) {
        this.currentPage = byCategory.number + 1;
        this.products = byCategory;
      }
    });
  }

  nextProductsByPage() {
    this.pageNumber += 1;
    this.currentPage += 1;

    if (this.category !== '') {
      this.store.dispatch(
        productListByCategiryActions.productListByCategory({
          request: {
            category: this.category,
            pageSize: this.pageSize,
            pageNumber: this.pageNumber,
          },
        })
      );
    } else {
      this.store.dispatch(
        productListActions.productList({
          request: {pageNumber: this.pageNumber, pageSize: this.pageSize},
        })
      );
    }
  }

  prevProductsByPage() {
    this.pageNumber -= 1;
    this.currentPage -= 1;
    if (this.category !== '') {
      this.store.dispatch(
        productListByCategiryActions.productListByCategory({
          request: {
            category: this.category,
            pageSize: this.pageSize,
            pageNumber: this.pageNumber,
          },
        })
      );
    } else {
      this.store.dispatch(
        productListActions.productList({
          request: {pageNumber: this.pageNumber, pageSize: this.pageSize},
        })
      );
    }
  }
}
