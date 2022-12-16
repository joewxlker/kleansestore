import { useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FC, useCallback, useState, useContext, useEffect, useRef } from "react";
import { FormData } from "../hooks/SetForm";
import { CartContext, client } from "../pages/_app";
import { Cart } from "./cart";
import { Form } from "./form";
import { Messenger } from "./messenger";
import { signIn } from 'next-auth/react'
import { categoryItems } from "../utils/siteInfo";


const Layout: FC<{ children: JSX.Element; }> = ({ children }): JSX.Element => {

    const [, setitems] = useContext(CartContext);
    const { data: session } = useSession();

    useEffect(() => {
        const loadResources = async () => {
            if (!session) {
                const rawLocalData = window.localStorage.getItem('cart');
                if (rawLocalData === 'undefined' || !rawLocalData) return console.log('cart is undefined or null');
                console.log('loading local storage');
                return JSON.parse(rawLocalData) && setitems(JSON.parse(rawLocalData));
            }
            console.log('loading data from database');
            const res = session && client.query('mongo.mongo-carts', { email: session.user?.email ? session.user.email : '' });
            const result = await res

            result !== undefined && setitems(result)
        }
        loadResources();
    }, [session, setitems])


    return (
        <>
            <Head>
                <title>kleanse</title>
                <meta name="description" content="kleanse official website" />
            </Head>
            <section className="w-full h-12 bg-grey text-white flex flex-row justify-center items-center hover:opacity-80 cursor-pointer z-[100] relative">
                <h2>New stock out now</h2>
            </section>
            <Header />
            {children}
            <Messenger />
            <Footer />
        </>
    )
}

export default Layout;

export const Header: FC = (): JSX.Element => {

    // toggles setBoolean in layout component
    const [cart, cartOpen] = useState(false);
    const [login, loginOpen] = useState(false);
    const [products, productsOpen] = useState(false);
    const [menu, menuOpen] = useState(false);
    const { data: session } = useSession();
    const [scrollHeightIsZero, setScrollHeightIsZero] = useState(true);
    const [headerHeight, setHeaderHeight] = useState<number>(0);

    const headerElementRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const scroller = () => {
            if (window.scrollY === 0) {
                setScrollHeightIsZero(true);
                if (headerElementRef.current) {
                    console.log(headerElementRef.current?.clientHeight)
                    setHeaderHeight(headerElementRef.current?.clientHeight);
                }
            } else if (scrollHeightIsZero) {
                setScrollHeightIsZero(false)
                if (headerElementRef.current) {
                    console.log(headerElementRef.current?.clientHeight)
                    setHeaderHeight(headerElementRef.current?.clientHeight);
                }
            }
        }
        window.addEventListener('scroll', scroller)
        return () => window.removeEventListener('scroll', scroller);
    })

    const closeAllExcept = (exception: string) => {
        exception !== 'cart' && cartOpen(false);
        exception !== 'login' && loginOpen(false);
        exception !== 'products' && productsOpen(false);
        exception !== 'menu' && menuOpen(false)
    }

    return (
        <>

            <header
                ref={headerElementRef}
                className={`${scrollHeightIsZero ? 'bg-white h-20' : "bg-grey h-12 text-white"} transition-all 
                sticky top-0 flex items-center flex-row shadow-xl w-[100vw] justify-evenly z-[100] p-3 duration-800`
                }>
                <span id='hardfadein' className='lg:w-2/6 md:w-2/6 sm:1/6 flex flex-col  items-center hover:cursor-pointer'
                    onClick={() => {
                        if (window.location.pathname === '/') return window.scrollTo(0, 0);
                        return window.location.href = '/'
                    }}>
                    <Image alt='kleanse wing logo' src='/images/kleanse-logos/kleanse-wing-in-text.svg' width={100} height={50}></Image>
                </span>
                <div id='hardfadein' className='lg:w-2/6 md:w-2/6 sm:w-px flex flex-row justify-evenly  lg:visible md:visible invisible'>
                    <Links onProducts={value => { productsOpen(value); closeAllExcept('products') }} />
                </div>
                <div id='hardfadein' className='lg:w-2/6 md:w-2/6 sm:w-2/6 h-full justify-center flex flex-row'>
                    <button
                        className='lg:flex mx-2 h-full md:flex sm:hidden'
                        aria-label={`${cart ? 'close' : 'open'} cart item display`}
                        onMouseEnter={() => {
                            cartOpen(true);
                            closeAllExcept('cart');
                        }}
                    >
                        <Image alt='' src='/images/ui-elements/bags-shopping-thin.svg' width={20} height={20} />
                    </button>
                    {/* desktop cart */}
                    <button
                        name='cart'
                        aria-label={`${cart ? 'close' : 'open'} cart item display`}
                        className='lg:hidden md:hidden sm:flex h-full w-1/2'
                        onClick={() => {
                            cartOpen(!cart);
                            closeAllExcept('cart');
                        }}>
                        <Image alt='' src='/images/ui-elements/bags-shopping-thin.svg' width={20} height={20} />
                    </button>
                    {/* mobile cart */}

                    <div className='flex flex-row w-[7rem] items-center space-evenly flex-nowrap md:flex lg:flex sm:hidden '>
                        <button
                            name={`${session ? 'logout' : 'login'}`}
                            className='hover:text-grey-light text-center text-sm'
                            aria-label={`${login ? 'close' : 'open'} login interface`}
                            onClick={() => signIn()}>
                            <p className=''>{session ? 'Logout' : 'Login /'}</p>
                        </button>

                        <Link
                            href='/signup'
                            className=''>
                            <p className="hover:text-grey-light cursor-pointer text-center w-1/2 text-sm">{session ? '' : 'Signup'}</p>
                        </Link>
                    </div>
                    {/* mobile navigation */}
                    <button
                        name='site navigation menu'
                        className='md:hidden lg:hidden flex hover:text-grey-light'
                        aria-label={`${login ? 'close' : 'open'} navigation menu`}
                        onClick={() => {
                            menuOpen(!menu);
                            closeAllExcept('menu');
                        }}>
                        <Image alt='' className='hover:text-grey-light' src='/images/ui-elements/bars-thin.svg' width={20} height={20} />
                    </button>
                </div>
                {/* header buttons */}

            </header>

            {cart && <div
                id='hardfadein'
                className={`${cart ? 'flex' : 'hidden'} fixed top-0 h-screen w-screen z-10 bg-grey bg-opacity-30 transition`}
                aria-label={`closing recently opened header interface`}
                onMouseEnter={() => closeAllExcept('')} />}
            <div className={`${cart ? 'opacity-100' : 'opacity-0 sm:translate-y-[20rem] md:-translate-y-[25rem] lg:-translate-y-[20rem]'} 
                     duration-500 transition lg:w-[20vw] lg:right-[17.6vw] lg:bottom-auto
                     md:w-80 md:right-[10vw] md:bottom-auto
                     sm:bottom-0
                     z-20 shadow-2xl pb-5 bg-white flex flex-col justify-center items-center w-full pt-6 max-h-fit fixed `
            } style={{ top: `${scrollHeightIsZero ? headerHeight + 80 : headerHeight - 35}px` }}>
                <Cart />
            </div>

            {products && <div
                id='hardfadein'
                className={`${products ? 'flex' : 'hidden'} duration-500 fixed top-0 h-screen w-screen z-10 bg-grey bg-opacity-30 transition-all`}
                aria-label={`closing recently opened header interface`}
                onMouseEnter={() => closeAllExcept('')} />}
            <div id='hardfadein'
                className={` ${products ? 'opacity-100' : ' opacity-0 -translate-y-[20rem]'} duration-500 transition fixed z-20  shadow-2xl flex flex-col 
                justify-center items-center bg-grey min-h-[20vh] w-[80vw] mx-[10vw]`}
                style={{ top: `${scrollHeightIsZero ? headerHeight + 80 : headerHeight - 35}px` }}>
                <ProductMenu />
            </div>

            {menu && <div
                id='hardfadein'
                className={` ${menu ? 'opacity-100' : ' opacity-0 '} duration-500 fixed top-0 h-screen w-screen z-10 mt-20
                bg-grey bg-opacity-30 transition-all`}
                onMouseEnter={() => closeAllExcept('')}
            />}
            <div
                className={` ${menu ? 'opacity-100' : ' opacity-0 translate-y-[20rem]'}
                 duration-500 transition fixed
                  lg:hidden
                  md:hidden
                  sm:visible
                   z-20 bottom-0 flex text-white flex-col justify-center items-center w-full shadow-grey shadow-xl bg-grey`}
                style={{ minHeight: '20vh' }}>
                <Links onProducts={() => ''} />
            </div>

        </>
    )
}


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


export const ProductMenu: FC = ({ }): JSX.Element => {

    return (
        <div className='h-full w-full flex flex-col lg:flex-row md:flex-row text-white'>
            {categoryItems.map(({ category, listItems }) => {
                return (
                    <div key={category} className='lg:w-1/3 w-full h-full flex-col justify-start items-start p-6'>
                        <Link href={`/products/${category.toLowerCase()}`}><h2 className='cursor-pointer p-0 max-w-fit hover:opacity-50'>{category}</h2></Link>
                        <ul className='w-full' style={{ color: 'rgb(140,140,140)' }}>
                            {listItems.map(({ title }) => <li key={title}>
                                <Link href={`/products/${category.toLowerCase()}/${title.toLowerCase()}`}>
                                    <p className='cursor-pointer p-0 max-w-fit hover:opacity-50'>{title}</p>
                                </Link>
                            </li>)}
                        </ul>
                    </div>
                )
            })}
        </div>
    )
}

export const Footer: FC = (): JSX.Element => {

    const [success, setSuccess] = useState(false)

    const handleResponse = async (data: FormData) => {
        const res = await client.mutation('mongo.add-maillist', { email: data.email })
        setSuccess(res.result === 'ADDED_MAILLIST')
        // window.location.reload();
        return null
    }

    return (
        <div id='hardfadein' className='flex bg-grey p-5 text-white flex-col justify-center items-center' style={{ color: 'rgb(150,150,150)' }}>
            <div className='flex flex-row items-center justify-center h-full flex-wrap'>

                <div className='flex lg:flex-row justify-evenly h-5/6 mx-20 mb-12 md:flex-col flex-col' style={{ color: 'rgb(150,150,150)' }}>
                    <div className='lg:w-1/6 pl-8 w-full mr-8 h-full'>
                        <Image alt='kleanse logo' src='/images/kleanse-logos/kleanse-k.svg' height={200} width={200} />
                    </div>
                    <div className='lg:w-1/6 flex flex-col justify-center items-start pt-4'>
                        <h3>FIND US HERE</h3>
                        <span className="flex flex-col items-start h-full w-full justify-evenly">
                            <Link href='https://www.facebook.com'><span className='flex flex-row w-full items-center' >
                                <div className='w-8 h-8'>
                                    <Image alt='' src='/images/ui-elements/facebook-f-brands.svg' width={20} height={20} />
                                </div>
                                <p className="ml-3">Facebook</p></span></Link>
                            <Link href='https://www.instagram.com'><span className='flex flex-row w-full items-center' >
                                <div className='w-8 h-8'>
                                    <Image alt='' src='/images/ui-elements/instagram-brands.svg' width={20} height={20} />
                                </div>
                                <p className="ml-3">Instagram</p></span></Link>
                            <Link href='https://www.twitter.com'><span className='flex flex-row w-full items-center' >
                                <div className='w-8 h-8'>
                                    <Image alt='' src='/images/ui-elements/twitter-brands.svg' width={20} height={20} />
                                </div>
                                <p className="ml-8">Twitter</p></span></Link>
                        </span>
                    </div>
                    <div className='lg:w-1/6 flex flex-col justify-center items-start pt-4'>
                        <h3>KLEANSE</h3>
                        <span className='h-full flex flex-col pt-6'>
                            <Link className='' href='/about'><span className=''><p>About Kleanse</p></span></Link>
                            <Link className='' href='/help/careers'><span className=''><p>Careers</p></span></Link>
                            <Link className='' href='/help/general'><span className=''><p>Code of Ethics</p></span></Link>
                            <Link className='' href='/help/general'><span className=''><p>Privacy Policy</p></span></Link>
                        </span>
                    </div>
                    <div className='lg:w-1/6 h-full flex flex-col items-start pt-4'>
                        <h3>HOW CAN WE HELP</h3>
                        <span className='h-full flex flex-col pt-6'>
                            <Link href='/help/general/shipping'><span className=''><p>Shipping</p></span></Link>
                            <Link className='' href='/help/general'><span className=''><p>FAQ&#39;s</p></span></Link>
                            <Link className='' href='/help/unsubscribe'><span className=''><p>Unsubscribe</p></span></Link>
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
