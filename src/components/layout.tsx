import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";
import { Cart } from "./cart";
import { Login } from "./login";

interface LayoutProps { children: JSX.Element; }
interface HeaderProps { }
interface FooterProps { }

const Layout: FC<LayoutProps> = ({ children }): JSX.Element => {

    return (
        <>
            <Head>
                <title>kleanse</title>
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

    return (
        <>
            <header className='bg-white fixed flex items-center h-20 flex-row shadow-xl w-screen justify-center z-20' style={{ zIndex: '100' }} >
                <span id='hardfadein' className='w-2/6 flex flex-col items-center hover:cursor-pointer' onClick={e => window.scrollTo(0, 0)}>
                    <Image src='/Images/kleanse-logos/kleanse-wing-in-text.svg' width={130} height={70}></Image>
                </span>
                <div id='hardfadein' className='w-2/6 flex flex-row justify-evenly'>
                    <Link href='/'><a>HOME</a></Link>
                    <Link href='/products/all-products'><a>PRODUCTS</a></Link>
                    <Link href='/contact'><a>CONTACT</a></Link>
                    <Link href='/about'><a>ABOUT</a></Link>
                </div>
                <span id='hardfadein' className='w-2/6 flex justify-center flex-row justify-center'>
                    <button className='mx-2' onMouseEnter={e => { cartOpen(true); loginOpen(false) }}>CART</button>
                    <button className='mx-2' onMouseEnter={e => { loginOpen(true); cartOpen(false) }}>LOGIN</button>
                    {/**  triggers useCallback */}
                </span>
                {/* {cartItems.length > 0 && <div className='cart-notifier'></div>} */}
            </header>
            {login && <><div className='fixed top-0 h-screen w-screen z-10 mt-20' onMouseEnter={e => loginOpen(false)} />

                <div id='hardfadein' className='fixed h-60 w-80 z-10 right-20 top-20 bg-grey flex flex-col justify-center items-center'>
                    <Login />
                </div>
            </>}
            {cart && <><div className='fixed top-0 h-screen w-screen z-10 mt-20' onMouseEnter={e => cartOpen(false)} />
                <div id='hardfadein' className='fixed w-80 right-20 z-10 shadow-2xl top-20 bg-white flex flex-col justify-center items-center' style={{ minHeight: '20vh' }}>
                    <Cart onCloseCart={() => cartOpen(false)} />
                </div>
            </>}

        </>
    )
}

export const Footer: FC<FooterProps> = (): JSX.Element => {
    return (
        <div id='hardfadein' className='flex flex-row w-screen justify-center z-80 bg-grey h-80 flex flex-col justify-center items-center'
            style={{ color: 'rgb(120,120,120)' }}>
            <div className=''>
                {/* <img src={kleanseLogo} /> */}
                <p className=''>copyright  kleanse industries limited...</p>
            </div>
            <div className=''>
                <a className='' href=''><i className='' ></i></a>
                <a className='' href=''><i className='' ></i></a>
                <a className='' href=''><i className='' ></i></a>
            </div>
            <div className='additional-links'>
                <Link className='' href=''><a className='px-3'>about</a></Link>
                <Link className='' href=''><a className='px-3'>privacy policy</a></Link>
                <Link className='' href=''><a className='px-3'>careers</a></Link>
                <Link className='' href=''><a className='px-3'>shipping</a></Link>
            </div>
        </div>
    );
}


