import { GetStaticPaths, GetStaticProps } from "next";
import { FC, useState } from "react";
import Layout from "../../components/layout";
import Products, { ProductData } from "../../components/products";
import { inferQueryOutput } from "../../utils/trpc";

interface ProductsProps {
    products: inferQueryOutput<'stripe.all-products'>
    params: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
    const req = await fetch('http://localhost:3000/api/stripe');
    //TODO convert to useQuery
    const products = await req.json();
    const params = context.params?.products
    return { props: { products, params } }
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [{ params: { products: 'all-products' } }],
        fallback: false
    }
}

const ProductsPage: FC<ProductsProps> = (props) => {

    const [productData, setProductData] = useState<ProductData | undefined>();

    return (
        <Layout>
            <div className="w-screen h-screen pt-40">
                <Products params={props.params} products={props.products} />
            </div>
        </Layout>
    )
}

export default ProductsPage