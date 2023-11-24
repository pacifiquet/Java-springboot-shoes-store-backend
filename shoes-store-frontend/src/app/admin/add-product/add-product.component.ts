import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {combineLatest} from 'rxjs';
import {selectProduct} from '../store/admin.reducers';
import {productDetailsActions} from '../store/actions';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddProductComponent implements OnInit {
  isModalOpen: boolean = true;
  form: any;

  product$ = combineLatest({
    data: this.store.select(selectProduct),
  });

  @Input() id: any;

  @Output() addProductModalEvent = new EventEmitter<boolean>();

  constructor(fb: FormBuilder, private store: Store) {
    this.form = fb.group({
      productName: ['', Validators.required],
      image: [null, Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

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
}
