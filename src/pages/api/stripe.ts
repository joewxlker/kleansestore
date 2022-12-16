import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../server/api's/all";

const getStripeItems: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const getProducts = async () => {
    const product = await stripe.products.list();
    const price = await stripe.prices.list();
    const productData = product.data.map((x, index) => {
      return { ...x, ...price.data[index] };
    });
    return productData;
  };
  return res.status(200).send(await getProducts());
};

export default getStripeItems;

export const createCheckoutSession = async (req: NextApiRequest, res: NextApiResponse) => {
  const domainURL = process.env.DOMAIN;
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: req.body,
    success_url: `${domainURL}/success.html?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${domainURL}/canceled.html`,
  });
  res.status(200).send({ url: session.url });
};

// export const checkoutSession = async (req: NextApiRequest, res: NextApiResponse) => {
//     const { sessionId } = req.query.session;
//     const session = await stripe.checkout.sessions.retrieve(sessionId);
//     res.status(200).send(session);
// }

export const createStripeAccount = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await stripe.customers.create({
    email: req.body.email,
  });
  res.send(user);
};
