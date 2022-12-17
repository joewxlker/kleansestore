import Stripe from "stripe";

export interface RawProductData {
    images: Array<string | undefined>;
    default_price: string | Stripe.Price | null | undefined;
    unit_amount: number | null | undefined;
    name: string;
    quantity: number;
    description: string | null;
}

export interface ProductData {
    image: string;
    name: string;
    amount: number;
    default_price: string;
    quantity: number;
  }