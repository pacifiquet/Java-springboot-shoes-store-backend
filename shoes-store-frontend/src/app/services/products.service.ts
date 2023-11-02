import { Injectable } from '@angular/core';
import { ProductInterface, Review } from '../dto/product-interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  reviewStarHandler: Array<number> = [];
  productList: Array<ProductInterface> = [
    {
      id: 1,
      stock: 34,
      category: 'Men',
      productName: 'Nike Dunk Low Retro',
      productUrl:
        'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/2f7301c8-1550-4207-8360-0490266cf821/dunk-low-retro-shoe-66RGqF.png',
      price: 300,
      rating: 3.4,
      createAt: new Date(),
      description:
        "Created for the hardwood but taken to the streets, the Nike Dunk Low Retro returns with crisp overlays and original team colours. This basketball icon channels '80s vibes with premium leather in the upper that looks good and breaks in even better. Modern footwear technology helps bring the comfort into the 21st century.",
      reviews: [
        {
          rating: 3,
          message:
            'I bought size 8 and overall fitting and comfort of the shoe is very good.',
          user: {
            username: 'Pacifique Twagirayesu',
            profile: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
          },
        },
        {
          rating: 4.5,
          message:
            'I bought size 8 and overall fitting and comfort of the shoe is very good.',
          user: {
            username: 'Pacifique Twagirayesu',
            profile: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
          },
        },
        {
          rating: 4.5,
          message:
            'I bought size 8 and overall fitting and comfort of the shoe is very good.',
          user: {
            username: 'Pacifique Twagirayesu',
            profile: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
          },
        },
        {
          rating: 5,
          message:
            'I bought size 8 and overall fitting and comfort of the shoe is very good.',
          user: {
            username: 'Pacifique Twagirayesu',
            profile: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
          },
        },
        {
          rating: 3.5,
          message:
            'I bought size 8 and overall fitting and comfort of the shoe is very good.',
          user: {
            username: 'Pacifique Twagirayesu',
            profile: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
          },
        },
      ],
    },

    {
      id: 2,
      stock: 3,
      productName: 'Nike Full Force Low',
      category: 'Men',
      productUrl:
        'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/c5cbd586-5f42-4d18-b836-c2f7ccc49b36/full-force-low-shoes-w2MKmW.png',
      price: 300,
      rating: 4.1,
      createAt: new Date(),
      description:
        "A new shoe with old-school appeal—your retro dreams just came true. This pared-back design references the classic AF-1, then leans into '80s style with throwback stitching and varsity-inspired colours. Not everything has to be a throwback, though—modern comfort and durability make them easy to wear any time, anywhere. Time to throw them on and go full force.",
      reviews: [
        {
          rating: 3,
          message:
            'I bought size 8 and overall fitting and comfort of the shoe is very good.',
          user: {
            username: 'Pacifique Twagirayesu',
            profile: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
          },
        },
        {
          rating: 4.5,
          message:
            'I bought size 8 and overall fitting and comfort of the shoe is very good.',
          user: {
            username: 'Pacifique Twagirayesu',
            profile: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
          },
        },
        {
          rating: 4,
          message:
            'I bought size 8 and overall fitting and comfort of the shoe is very good.',
          user: {
            username: 'Pacifique Twagirayesu',
            profile: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
          },
        },
        {
          rating: 5,
          message:
            'I bought size 8 and overall fitting and comfort of the shoe is very good.',
          user: {
            username: 'Pacifique Twagirayesu',
            profile: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
          },
        },
        {
          rating: 3.5,
          message:
            'I bought size 8 and overall fitting and comfort of the shoe is very good.',
          user: {
            username: 'Pacifique Twagirayesu',
            profile: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
          },
        },
      ],
    },

    {
      id: 3,
      category: 'Women',
      productName: "Nike Air Force 1 '07",
      productUrl:
        'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/ff6c5f8b-8751-4f69-9d22-2031846d025f/air-force-1-07-shoes-kv14Mh.png',
      price: 400,
      stock: 32,
      rating: 4.3,
      createAt: new Date(),
      description:
        'From the hardwood to the streets to the World Wide Web. These classic sneakers get an Internet-inspired refresh with holographic accents. Jewel-like hardware and a special JDI dubrae add the finishing touch.',
      reviews: [
        {
          rating: 3.5,
          message:
            'I bought size 8 and overall fitting and comfort of the shoe is very good.',
          user: {
            username: 'Pacifique Twagirayesu',
            profile: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
          },
        },
        {
          rating: 4.5,
          message:
            'I bought size 8 and overall fitting and comfort of the shoe is very good.',
          user: {
            username: 'Pacifique Twagirayesu',
            profile: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
          },
        },
        {
          rating: 3,
          message:
            'I bought size 8 and overall fitting and comfort of the shoe is very good.',
          user: {
            username: 'Pacifique Twagirayesu',
            profile: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
          },
        },
        {
          rating: 4.5,
          message:
            'I bought size 8 and overall fitting and comfort of the shoe is very good.',
          user: {
            username: 'Pacifique Twagirayesu',
            profile: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
          },
        },
        {
          rating: 3,
          message:
            'I bought size 8 and overall fitting and comfort of the shoe is very good.',
          user: {
            username: 'Pacifique Twagirayesu',
            profile: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
          },
        },
      ],
    },

    {
      id: 4,
      category: 'Kids',
      stock: 45,
      productName: 'Nike Vaporfly 3 ',
      productUrl:
        'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/ade9cf53-9ac6-4842-9e7c-c2f6dca83a68/vaporfly-3-road-racing-shoes-wdmHPR.png',
      price: 300,
      rating: 4,
      createAt: new Date(),
      description:
        "Catch 'em if you can. Giving you race-day speed to conquer any distance, the Nike Vaporfly 3 is made for the chasers, the racers and the elevated pacers who can't turn down the thrill of the pursuit. We reworked the leader of the super shoe pack and tuned the engine underneath to help you chase personal bests from a 10K to marathon. From elite runners to those new to racing, this versatile road-racing workhorse is for those who see speed as a gateway to more miles and more seemingly uncatchable highs.",
      reviews: [],
    },
    {
      id: 5,
      category: 'Men',
      stock: 12,
      price: 500,
      productName: 'Nike Pegasus Trail 4 GORE-TEX',
      productUrl:
        'https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/b79b6868-1764-4d99-aa3a-9c6e021fd16a/pegasus-trail-4-gore-tex-waterproof-trail-running-shoes-pQ2Pzs.png',
      description:
        'The Nike Pegasus Trail 4 GORE-TEX is your running companion for those days when the weather turns. Its waterproof GORE-TEX layer helps keep your feet dry, and less rubber in the outsole creates a smooth transition from road to trail without breaking stride.',
      reviews: [
        {
          rating: 3.5,
          message:
            'I bought size 8 and overall fitting and comfort of the shoe is very good.',
          user: {
            username: 'Pacifique Twagirayesu',
            profile: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
          },
        },
        {
          rating: 4.5,
          message:
            'I bought size 8 and overall fitting and comfort of the shoe is very good.',
          user: {
            username: 'Pacifique Twagirayesu',
            profile: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
          },
        },
      ],
    },
  ];
  constructor() {}

  getAllProducts() {
    return this.productList;
  }

  getTopTenProductsByRating() {
    const orderProducts: Array<ProductInterface> = [];
    for (let i = 0; i < this.productList.length; i++) {
      for (let j = 0; j < this.productList.length - 1; j++) {
        if (
          Number(this.productList[j + 1].rating) >
          Number(this.productList[j].rating)
        ) {
          const temp = this.productList[j + 1];
          this.productList[j + 1] = this.productList[j];
          this.productList[j] = temp;
        }
      }
    }
    return this.productList;
  }

  getProductById(id: number) {
    return this.productList.filter((product) => product.id === Number(id))[0];
  }

  getProductReviewAverage(reviews: Array<Review> = []) {
    let sum = 0;
    for (let i = 0; i < reviews.length; i++) {
      sum += Number(reviews[i].rating);
    }
    return sum / reviews.length;
  }

  getReviewIconNumber(reviews: Array<Review> = []): Array<number> {
    let average = this.getProductReviewAverage(reviews);
    for (let index = average; index >= 0; index--) {
      this.reviewStarHandler.push(index);
    }
    return this.reviewStarHandler;
  }
}
