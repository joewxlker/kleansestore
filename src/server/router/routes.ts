import { createRouter } from "./context";

export const mongoDbRouter = createRouter()
  .query('allUsers', {
    async resolve({ ctx }) {
      console.log('mongo')
      await ctx.mongo.connect();
      return await ctx.mongo.db('onlinestore').collection('user_data').findOne({ email: 'joewxlk3r@gmail.com' })
    }
  })

export const stripeRouter = createRouter()
  .query('all-products', {
    async resolve({ ctx }) {
      const getProducts = async () => {
        const product = await ctx.stripe.products.list();
        const price = await ctx.stripe.prices.list();
        const productData = product.data.map((x, index) => { return { ...x, ...price.data[index] } })
        return productData;
      }
      return await getProducts()
    }
  })
  .query('create-checkout', {
    async resolve({ ctx }) {

    }
  })

export const sendgridRouter = createRouter()
  .query('send-email', {
    async resolve({ ctx }) {

      const msg = {
        to: '',
        from: process.env.EMAIL!,
        subject: 'Please verify your new kleanse online shopping account',
        text: ''
      }
      ctx.sendgrid
        .send(msg)
        .then(() => {
          console.log('Email sent')
        })
        .catch((error: string) => {
          console.log(error)
        })
    }
  })
