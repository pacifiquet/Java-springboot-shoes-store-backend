import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {Observable, Subject, combineLatest, takeUntil} from 'rxjs';
import {
  selectIsAddingProduct,
  selectIsUpdatingProduct,
  selectProduct,
} from '../store/admin.reducers';
import {productDetailsActions} from '../store/actions';
import {ProductsService} from 'src/app/services/product/products.service';
import {BackendSuccessResponseInterface} from 'src/app/types/BackendSuccessResponse.interface';
import {selectIsUpdated} from 'src/app/app.reducer';
import {ProductDetailsInterface} from 'src/app/guest/store/product/types/ProductInterface';
import {ProductInterface} from '../../guest/store/product/types/ProductInterface';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddProductComponent implements OnInit, OnDestroy {
  isModalOpen: boolean = true;
  form: any;
  unsub$ = new Subject<void>();
  productImage: any;
  addProductResponse$: Observable<BackendSuccessResponseInterface> =
    new Observable<BackendSuccessResponseInterface>();

  product$ = combineLatest({
    data: this.store.select(selectProduct),
  });

  @Input() id!: number;
  @Input() isAddingProduct!: boolean;
  @Input() isUpdatingProduct!: boolean;
  @Input() productData!: ProductInterface;

  @Output() addProductModalEvent = new EventEmitter<boolean>();
  @Output() addOrUpdateProductEventRequest = new EventEmitter<{
    productInfo: string;
    productImage: File;
  }>();

  constructor(fb: FormBuilder, private store: Store) {
    this.form = fb.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.id) {
      this.store.dispatch(
        productDetailsActions.productDetails({request: {id: this.id}})
      );
    }

    this.product$.pipe(takeUntil(this.unsub$)).subscribe(({data}) => {
      if (data) {
        this.form.setValue({
          productName: data?.productName,
          category: data?.category,
          description: data?.description,
          price: data.price,
          stock: data.stock,
        });
      }
    });
  }

  closeProductModal() {
    this.addProductModalEvent.emit(this.isModalOpen);
  }

  onImagePicked(event: Event) {
    this.productImage = (event.target as HTMLInputElement).files?.[0];
  }

  get fc() {
    return this.form.controls;
  }

  onSubmit() {
    const request = {
      productInfo: JSON.stringify(this.form.value),
      productImage: this.productImage,
    };

    if (this.isAddingProduct) {
      this.addOrUpdateProductEventRequest.emit(request);
    } else if (this.isUpdatingProduct) {
      this.addOrUpdateProductEventRequest.emit(request);
    }
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
