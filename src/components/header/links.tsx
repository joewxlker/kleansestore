import Image from "next/image";
import Link from "next/link";
import { FC, useCallback } from "react";
import { ProductMenu } from "./productMenu";

export const Links: FC<{ onProducts: (products: boolean) => void }> = ({ onProducts }): JSX.Element => {
    const callback = useCallback((products: boolean) => {
        onProducts(products);
    }, [onProducts])
    return (
        <div className='w-full flex'>
            <span className='w-full flex lg:flex-row md:flex-row flex-col lg:p-0 justify-evenly items-center'>
                <Link href='/' ><span className='hover:text-grey-light' onMouseEnter={() => { callback(false) }}>Home</span></Link>
                <span className=' flex-row justify-center items-center cursor-pointer lg:flex hidden lg:text-grey '
                    onMouseEnter={() => callback(true)}>
                    <Link href='/products/all-products'>
                        Products
                    </Link>
                    <Image alt='' className='hover:text-grey-light' src='/images/ui-elements/chevron-down-thin.svg' height={20} width={20} />
                    <i className="fak fa-chevron-down-thin hover:text-grey-light"></i>
                </span>
                <Link href='/about' ><span className='hover:text-grey-light' onMouseEnter={() => callback(false)}>About</span></Link>
                <Link href='/products/all-products'><span className='lg:hidden'>All Products</span></Link>

            </span>
            <span className='w-full flex flex-col items-center lg:hidden md:hidden  pt-5'>
                <ProductMenu />
            </span>
        </div>
    )
}
