import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FC, useCallback, useState } from "react";
import { ContactForm, FormType } from "../hooks/SetForm";
import { client } from "../pages/_app";
import { Cart } from "./cart";
import { Form } from "./form";
import { Login } from "./login";

interface LayoutProps { children: JSX.Element; }
interface HeaderProps { }
interface FooterProps { }

const Layout: FC<LayoutProps> = ({ children }): JSX.Element => {

    return (
        <>
            <Head>
                <title>kleanse</title>
                <meta name="description" content="kleanse official website" />
            </Head>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default Layout;

export const Header: FC<HeaderProps> = (): JSX.Element => {

    // toggles setBoolean in layout component
    const [cart, cartOpen] = useState(false);
    const [login, loginOpen] = useState(false);
    const [products, productsOpen] = useState(false);
    const [menu, menuOpen] = useState(false);
    const { data: session } = useSession();

    const closeAllExcept = (exception: string) => {
        exception !== 'cart' && cartOpen(false);
        exception !== 'login' && loginOpen(false);
        exception !== 'products' && productsOpen(false);
        exception !== 'menu' && menuOpen(false)
    }

    return (
        <>
            <header className='bg-white fixed flex items-center h-20 flex-row shadow-xl w-screen justify-center z-20' style={{ zIndex: '100' }} >
                <span id='hardfadein' className='w-2/6 flex flex-col items-center hover:cursor-pointer'
                    onClick={e => {
                        if (window.location.pathname === '/') return window.scrollTo(0, 0);
                        return window.location.href = '/'
                    }}>
                    <Image alt='kleanse wing logo' src='/images/kleanse-logos/kleanse-wing-in-text.svg' width={130} height={70}></Image>
                </span>
                <div id='hardfadein' className='w-2/6 flex flex-row justify-evenly lg:visible md:visible invisible'>
                    <Links onProducts={value => { productsOpen(value); closeAllExcept('products') }} />
                </div>
                <span id='hardfadein' className='w-2/6 flex justify-center flex-row justify-center'>

                    <button
                        className='mx-2 h-full w-1/3 lg:block md:block hidden'
                        aria-label={`${cart ? 'close' : 'open'} cart item display`}
                        onMouseEnter={e => {
                            cartOpen(true);
                            closeAllExcept('cart')
                        }}>
                        <Image src='/images/ui-elements/bags-shopping-thin.svg' width={40} height={40} />
                    </button>
                    {/* desktop cart */}
                    <button
                        name='cart'
                        aria-label={`${cart ? 'close' : 'open'} cart item display`}
                        className='lg:hidden md:hidden block h-full w-1/3'
                        onClick={e => {
                            cartOpen(!cart);
                            closeAllExcept('cart')
                        }}>
                        <Image src='/images/ui-elements/bags-shopping-thin.svg' width={30} height={30} />
                    </button>
                    {/* mobile cart */}

                    <button
                        name={`${session ? 'logout' : 'login'}`}
                        className='lg:block hidden w-1/3 '
                        aria-label={`${login ? 'close' : 'open'} login interface`}
                        onMouseEnter={e => {
                            loginOpen(true);
                            closeAllExcept('login')
                        }}>
                        {session ? 'LOGOUT' : 'LOGIN'}
                    </button>
                    {/* desktop login */}
                    <button name={`${session ? 'logout' : 'login'}`}
                        className='lg:hidden block w-1/3 text-sm'
                        aria-label={`${login ? 'close' : 'open'} login interface`}
                        onClick={e => {
                            loginOpen(!login);
                            closeAllExcept('login')
                        }}>
                        {session ? 'LOGOUT' : 'LOGIN'}
                    </button>
                    {/* mobile login */}

                    <button
                        name='site navigation menu'
                        className='md:invisible lg:invisible visible w-1/3'
                        aria-label={`${login ? 'close' : 'open'} navigation menu`}
                        onClick={e => {
                            menuOpen(!menu);
                            closeAllExcept('menu');
                        }}>
                        <Image src='/images/ui-elements/bars-thin.svg' width={20} height={20} />
                    </button>
                    {/* mobile navigation */}

                </span>
                {/* header buttons */}

            </header>
            {login && <><div
                className='fixed top-0 h-screen w-screen shadow-xl z-20 mt-20'
                aria-label={`closing recently opened header interface`}
                onMouseEnter={e => closeAllExcept('')} />

                <div id='fadein' className='fixed lg:h-80 md:h-80 md:w-80 md:right-20 lg:w-80 z-20 shadow-2xl lg:right-40 top-20 bg-grey flex flex-col justify-center items-center w-full h-80'>
                    <Login />
                </div>
            </>}
            {cart && <>
                <div
                    className='fixed top-0 h-screen w-screen z-10 mt-20'
                    aria-label={`closing recently opened header interface`}
                    onMouseEnter={e => closeAllExcept('')} />
                <div id='fadein' className='fixed lg:h-65 md:h-65 md:w-80 md:right-20 shadow-xl lg:w-80 z-20 shadow-2xl lg:right-80 top-20 bg-white flex flex-col justify-center items-center w-full h-80' style={{ minHeight: '20vh' }}>
                    <Cart onCloseCart={() => cartOpen(false)} />
                </div>
            </>}
            {products && <>
                <div
                    className='fixed top-0 h-screen w-screen z-10 mt-20'
                    aria-label={`closing recently opened header interface`}
                    onMouseEnter={e => closeAllExcept('')} />
                <div id='fadein' className='fixed z-20 shadow-2xl top-20 flex flex-col justify-center items-center bg-grey' style={{ minHeight: '20vh', width: '80vw', margin: '0 10vw' }}>
                    <ProductMenu />
                </div>
            </>}
            {menu && <>
                <div
                    className='fixed top-0 h-screen w-screen z-10 mt-20 lg:hidden'
                    onMouseEnter={e => closeAllExcept('')}
                />
                <div id='fadein'
                    className={`fixed z-20 top-20 flex text-white flex-col justify-center items-center w-full shadow-xl bg-grey`}
                    style={{ minHeight: '20vh' }}>
                    <Links onProducts={e => { }} />
                </div>
            </>}

        </>
    )
}

interface LinkProps {
    onProducts: (products: boolean) => void
}

export const Links: FC<LinkProps> = ({ onProducts }): JSX.Element => {

    const callback = useCallback((products: boolean) => {
        onProducts(products);
    }, [onProducts])

    return (
        <div className='w-full flex '>
            <span className='w-full flex lg:flex-row md:flex-row flex-col lg:p-0 justify-evenly items-center'>
                <Link href='/' ><a onMouseEnter={e => { callback(false) }}>HOME</a></Link>
                <span className='flex flex-row justify-center items-center cursor-pointer lg:block hidden lg:text-grey '
                    onMouseEnter={e => callback(true)}>
                    <Link href='/products/all-products'>
                        <a className='pr-3'>PRODUCTS</a>
                    </Link>
                    <Image src='/images/ui-elements/chevron-down-thin.svg' height={20} width={20} />
                    <i className="fak fa-chevron-down-thin"></i>
                </span>
                <Link href='/about' ><a onMouseEnter={e => callback(false)}>ABOUT</a></Link>
                <Link href='/products/all-products'><a className='lg:hidden'>ALL PRODUCTS</a></Link>

            </span>
            <span className='w-full flex flex-col items-center lg:hidden md:hidden block pt-5'>
                <ProductMenu />
            </span>
        </div>
    )
}


export const ProductMenu: FC = (): JSX.Element => {
    return (
        <div className='h-full w-full flex flex-col lg:flex-row md:flex-row text-white'>
            <div className='lg:w-1/3 w-full h-full flex-col justify-center p-6'>
                <h1>SHOP WOMENS</h1>
                <ul className='w-full' style={{ color: 'rgb(140,140,140)' }}>
                    <li> <Link href='/products/all-products'><a >treat yo self</a></Link></li>
                    <li><Link href='/products/all-products'><a >shop fo da kids</a></Link></li>
                </ul>
            </div>
            <div className='lg:w-1/3 w-full h-full flex-col justify-center p-6'>
                <h1>SHOP MENS</h1>
                <ul className='w-full' style={{ color: 'rgb(140,140,140)' }}>
                    <li><Link href='/products/all-products'><a >item one</a></Link></li>
                </ul>
            </div>
            <div className='lg:w-1/3 w-full h-full flex-col justify-center p-6'>
                <h1>SALE</h1>
                <ul className='w-full' style={{ color: 'rgb(140,140,140)' }}>
                    <li><Link href='/products/all-products'><a >shop all sale items</a></Link></li>
                </ul>
            </div>
        </div>
    )
}

export const Footer: FC<FooterProps> = (): JSX.Element => {

    const [success, setSuccess] = useState(false)

    const handleResponse = async (data: FormType<ContactForm>) => {
        const res = await client.mutation('mongo.add-maillist', { email: data.email })
        setSuccess(res.result === 'ADDED_MAILLIST')
        // window.location.reload();
        return null
    }

    return (
        <div id='hardfadein' className='flex bg-grey p-5 text-white flex-col justify-center items-center' style={{ color: 'rgb(150,150,150)' }}>
            <div className='flex flex-row items-center justify-center h-full flex-wrap'>

                <div className='flex lg:flex-row flex justify-evenly h-5/6 mx-20 mb-12 md:flex-col flex-col' style={{ color: 'rgb(150,150,150)' }}>
                    <div className='lg:w-1/6 pl-8 w-full mr-8 h-full'>
                        <Image alt='kleanse logo' src='/images/kleanse-logos/kleanse-k.svg' height={200} width={200} />
                    </div>
                    <div className='lg:w-1/6 flex flex-col justify-center items-start pt-4'>
                        <h3>FIND US HERE</h3>
                        <span className="flex flex-col items-start h-full w-full justify-evenly">
                            <Link href='https://www.facebook.com'><a className='flex flex-row w-full items-center' >
                                <div className='w-8 h-8'>
                                    <Image src='/images/ui-elements/facebook-f-brands.svg' width={30} height={30} />
                                </div>
                                <p className="mx-3">Facebook</p></a></Link>
                            <Link href='https://www.instagram.com'><a className='flex flex-row w-full items-center' >
                                <div className='w-8 h-8'>
                                    <Image src='/images/ui-elements/instagram-brands.svg' width={30} height={30} />
                                </div>
                                <p className="mx-3">Instagram</p></a></Link>
                            <Link href='https://www.twitter.com'><a className='flex flex-row w-full items-center' >
                                <div className='w-8 h-8'>
                                    <Image src='/images/ui-elements/twitter-brands.svg' width={20} height={20} />
                                </div>
                                <p className="mx-3">Twitter</p></a></Link>
                        </span>
                    </div>
                    <div className='lg:w-1/6 flex flex-col justify-center items-start pt-4'>
                        <h3>KLEANSE</h3>
                        <span className='h-full flex flex-col pt-6'>
                            <Link className='' href='/about'><a className=''><p>About Kleanse</p></a></Link>
                            <Link className='' href='/help/careers'><a className=''><p>Careers</p></a></Link>
                            <Link className='' href='/help/general'><a className=''><p>Code of Ethics</p></a></Link>
                            <Link className='' href='/help/general'><a className=''><p>Privacy Policy</p></a></Link>
                        </span>
                    </div>
                    <div className='lg:w-1/6 h-full flex flex-col items-start pt-4'>
                        <h3>HOW CAN WE HELP</h3>
                        <span className='h-full flex flex-col pt-6'>
                            <Link href='/help/general/shipping'><a className=''><p>Shipping</p></a></Link>
                            <Link className='' href='/help/general'><a className=''><p>FAQ&#39;s</p></a></Link>
                            <Link className='' href='/help/unsubscribe'><a className=''><p>Unsubscribe</p></a></Link>
                        </span>
                    </div>
                </div>

                <div className="lg:w-2/6 flex flex-col items-center justify-start">
                    {!success ? <>
                        <div className=' w-full flex flex-col items-center p-8'>
                            <h1 className="text-lg p-3" >Join our mailing system</h1>
                            <p className='text-sm'>By entering your email address below,
                                you consent to receiving our newsletter
                                with access to our latest collections,
                                events and initiatives. More details on
                                this are provided in our Privacy Policy</p>
                        </div>
                        <div className='w-80 h-full'>
                            <Form formData={{ email: '', hidden: '' }} onResponse={(e) => handleResponse(e)} buttons={[]} ></Form>
                        </div>
                    </> :
                        <div className=' w-full flex flex-col items-center p-8'>
                            <p>Thank you for joining our mailing system</p>
                        </div>
                    }
                </div>

            </div>
            <p className='text-sm center'>© 2016-2020 Kleanse - All rights reserved. SIAE LICENCE SIAE LICENCE # 2294/I/1936 and 5647/I/1936</p>
        </div>
    );
}
