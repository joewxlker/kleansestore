import { useContext } from 'react'
import { CartContext } from '../pages/_app'
import { ProductData } from '../components/products';

export const useAddCart = () => {
    const [cartItems, setCartItems] = useContext<any>(CartContext);
    const checkExistence = (data: ProductData) => {
        const filter = cartItems !== undefined ? cartItems.filter((x: ProductData) => x.default_price === data.default_price) : ['', '']
        if (filter.length === 0) return true
        return false
    }
    return async (item: ProductData) => {
        return checkExistence(item) ? setCartItems([...cartItems, item]) : setCartItems([item])
    }
}

// const user = await client.query('mongo.mongo-carts', { email: session.user?.email });
// 