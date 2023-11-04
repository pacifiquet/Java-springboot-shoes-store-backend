export interface ProductInterface {
  id?: number;
  category?: string;
  stock?: number;
  rating?: number;
  productName?: string;
  productUrl?: string;
  price?: number;
  description?: string;
  createAt?: Date;
  reviews?: Array<Review>;
  getReviewIon?: () => Array<number>;
}

export interface Review {
  rating: number;
  message: string;
  user: User;
}

export interface User {
  username: string;
  profile: string;
}
