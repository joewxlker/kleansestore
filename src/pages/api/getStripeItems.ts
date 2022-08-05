// src/pages/api/examples.ts
import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../server/api's/stripe";

const getStripeItems: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {

    const getProducts = async () => {
        const product = await stripe.products.list();
        const price = await stripe.prices.list();
        const productData = product.data.map((x, index) => { return { ...x, ...price.data[index] } })
        return productData;
    }
    return res.status(200).send(await getProducts())
}

export default getStripeItems;
