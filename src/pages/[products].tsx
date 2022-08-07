import { GetStaticPaths, GetStaticProps } from "next";
import { FC } from "react";
import Layout from "../components/layout";
import { inferQueryOutput } from "../utils/trpc";

interface ShopProps { products: inferQueryOutput<'stripe.all-products'>, params: string }

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [{ params: { products: 'all-products' } }],
        fallback: false
    }
}

export const getStaticProps: GetStaticProps = async (context) => {
    const req = await fetch('http://localhost:3000/api/stripe');
    //TODO convert to useQuery
    const products = await req.json();
    const params = context.params?.products
    return { props: { products, params } }
}

const Products: FC<ShopProps> = (props): JSX.Element => {

    return (
        <>
            <Layout>
                <div className='Products-entry-container'>
                    <h1>{props.params} Items</h1>
                    <h1>{props.products.map((props) => {
                        return (
                            <>
                                {props.name}
                                {props.description}
                                <div style={{ background: `url(${props.images})`, backgroundPosition: 'center', backgroundSize: 'cover', height: '15vw', width: '20vw' }}>
                                    {props.unit_amount}
                                    {props.currency}
                                </div>
                            </>)
                        // renders static data ( stripe product data) to elements 
                    })}</h1>
                </div>
            </Layout>
        </>
    );
}

export default Products