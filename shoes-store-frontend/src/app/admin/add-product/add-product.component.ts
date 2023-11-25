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
import {Subject, combineLatest, takeUntil} from 'rxjs';
import {selectProduct} from '../store/admin.reducers';
import {productDetailsActions} from '../store/actions';

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

  product$ = combineLatest({
    data: this.store.select(selectProduct),
  });

  @Input() id!: number;

  @Output() addProductModalEvent = new EventEmitter<boolean>();

  constructor(
    fb: FormBuilder,
    private store: Store,
    private cdr: ChangeDetectorRef
  ) {
    this.form = fb.group({
      productName: ['', Validators.required],
      image: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    console.log(this.id);
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
          image: data.productUrl,
          description: data?.description,
          price: data.price,
          stock: data.stock,
        });
        console.log(this.form.getRawValue());
        this.cdr.markForCheck();
      }
    });
  }

  closeProductModal() {
    this.addProductModalEvent.emit(this.isModalOpen);
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.form.patchValue({image: file});
  }

  get fc() {
    return this.form.controls;
  }

  onSubmit() {
    console.log(this.form.value);
  }

  ngOnDestroy(): void {
    this.unsub$.next();
    this.unsub$.complete();
  }
}
