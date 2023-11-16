import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddProductComponent {
  isModalOpen: boolean = true;
  form: any;

  @Output() addProductModalEvent = new EventEmitter<boolean>();

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      productName: ['', Validators.required],
      image: [null, Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
    });
  }

  closeProductModal() {
    this.addProductModalEvent.emit(this.isModalOpen);
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.form.patchValue({ image: file });
  }

  get fc() {
    return this.form.controls;
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
