import {Component, Input, OnInit} from '@angular/core';
import {faStarHalfAlt} from '@fortawesome/free-regular-svg-icons';
import {faStar} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent implements OnInit {
  star = faStar;
  haflIcon = faStarHalfAlt;
  @Input() starRating: any = 0;
  @Input() value: number = 0;
  @Input() text: string = '';
  @Input() color: string = '';

  constructor() {}
  ngOnInit(): void {}

  lessThanOrEqual(numOne: any, numTwo: any) {
    return numOne <= numTwo;
  }
}
