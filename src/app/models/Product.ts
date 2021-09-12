import {User} from './User';

export class Product{
  id: number;
  name: string;
  content: string;
  auction_date: string;
  price: number;
  product_biding: ProductBid[];
  product_images: ProductImage[];
  close_bid_date: string;
  created_at: string;
}

export class ProductImage{
  id: number;
  image_url: string;
}

export class ProductBid{
  user: User;
  amount: number;
  product: string;
}

export class ProductBidRequest {
  user: User;
  product: string;
  amount: number;
  auto_bid: string;
}
