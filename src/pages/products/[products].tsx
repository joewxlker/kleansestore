import { GetServerSideProps } from "next";
import { FC } from "react";
import Layout from "../../components/layout";
import Products from "../../components/products";
import { inferQueryOutput } from "../../utils/trpc";

interface ProductsProps {
    products: inferQueryOutput<'stripe.all-products'>
    params: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const req = await fetch(`${process.env.DOMAIN}/api/stripe`);
    const products = await req.json();
    const params = context.params?.products
    return { props: { products, params } }
}

const ProductsPage: FC<ProductsProps> = (props) => {

    return (
        <Layout>
            <div className="w-screen h-screen pt-40">
                <Products params={props.params} products={props.products} />
            </div>
        </Layout>
    )
}

export default ProductsPage