import { useContext } from "react";
import { CartContext } from "../pages/_app";
import { ProductData } from "../components/products";

export function useAddCart(): {
  addToCart: (item: ProductData) => void | null;
  handleQuantities: (item: ProductData | undefined, incDec: boolean) => void;
  handleRemoveItem: (item: ProductData | undefined) => void;
} {
  const [cartItems, setCartItems] = useContext(CartContext);

  function checkExistence(data: ProductData) {
    if (!cartItems || cartItems === undefined) return setCartItems([data]);
    const filter = cartItems.filter((x: ProductData) => x.default_price === data.default_price);
    if (filter.length === 0) return true;
    return false;
  }

  function addToCart(item: ProductData): void | null {
    return checkExistence(item) ? setCartItems([...cartItems, item]) : null;
  }

  function handleQuantities(item: ProductData | undefined, incDec: boolean): void {
    const [start, end] = findStartEnd(item);
    if (!item || !start || !end) return;
    if (incDec) {
      return setCartItems([...start, { ...item, quantity: item.quantity + 1 }, ...end]);
    }
    return setCartItems([...start, { ...item, quantity: item.quantity - 1 }, ...end]);
  }

  function handleRemoveItem(item: ProductData | undefined): void {
    const [start, end] = findStartEnd(item);
    if (!item || !start || !end) return;
    if (cartItems.length === 1) {
      return setCartItems([]);
    }
    return setCartItems([...start, ...end]);
  }

  const findStartEnd = (item: ProductData | undefined) => {
    if (!cartItems || !item) return [];
    const index = cartItems.findIndex((x: ProductData | undefined) => {
      return x?.default_price === item.default_price;
    });
    const start: Array<ProductData> = [];
    const end: Array<ProductData> = [];
    for (let i = 0; i <= index - 1; i++) {
      if (i !== index) start.push(cartItems[i]);
    }
    for (let i = index; i < cartItems.length; i++) {
      if (i !== index) end.push(cartItems[i]);
    }
    return [start, end];
  };

  return { addToCart, handleQuantities, handleRemoveItem };
}

// const user = await client.query('mongo.mongo-carts', { email: session.user?.email });
//
