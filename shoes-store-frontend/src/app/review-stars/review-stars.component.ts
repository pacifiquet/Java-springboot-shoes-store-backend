import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  faStarHalfAlt,
  faStarHalfStroke,
} from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-review-stars',
  templateUrl: './review-stars.component.html',
  styleUrls: ['./review-stars.component.css'],
})
export class ReviewStarsComponent implements OnInit {
  @Input() averageRating: number = 0;
  satrt = faStar;
  half = faStarHalfAlt;
  reviews_num: Array<number> = [];

  constructor() {}
  ngOnInit(): void {}
}
