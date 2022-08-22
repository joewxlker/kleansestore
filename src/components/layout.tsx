import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { FC, useCallback, useState } from "react";
import { FormType, LoginForm, SignUpForm } from "../hooks/SetForm";
import { client } from "../pages/_app";
import { Form } from "./form";
import { Login } from "./login";

interface LayoutProps { children: JSX.Element; }
interface HeaderProps { }
interface FooterProps { }

const Layout: FC<LayoutProps> = ({ children }): JSX.Element => {

    const [open, setOpen] = useState(false);

    return (
        <>
            <Head>
                <title>kleanse</title>
            </Head>
            <Header />
            <div id='spacer' className="h-24 w-full bg-salmon"> g <br /> h <br /></div>
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
                <span className='w-2/6'>
                    <span className=''><p>+61 0333643418</p></span>
                    <span><p>kleanseaustralia@kleansebeauty.co.au</p></span>
                </span>
                <div className='w-2/6 flex flex-row justify-evenly'>
                    <Link href='/'><a>HOME</a></Link>
                    <Link href='/all-products'><a>PRODUCTS</a></Link>
                    <Link href='/contact'><a>CONTACT</a></Link>
                    <Link href='/about'><a>ABOUT</a></Link>
                </div>
                <span className='w-2/6 flex justify-center flex-row justify-evenly'>
                    <button onMouseEnter={e => { cartOpen(true); loginOpen(false) }}>CART</button>
                    <button onMouseEnter={e => { loginOpen(true); cartOpen(false) }}>LOGIN</button>
                    {/**  triggers useCallback */}
                </span>
                {/* {cartItems.length > 0 && <div className='cart-notifier'></div>} */}
            </header>
            {login && <><div className='absolute h-screen w-screen z-10 mt-20' onMouseEnter={e => loginOpen(false)} />
                <Login /></>}

        </>
    )
}

export const Footer: FC<FooterProps> = (): JSX.Element => {
    return (
        <div className='relative bottom-0 flex flex-row w-screen justify-center z-2'>
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
                <Link className='' href=''><a>about</a></Link>
                <Link className='' href=''><a>privacy policy</a></Link>
                <Link className='' href=''><a>careers</a></Link>
                <Link className='' href=''><a>shipping</a></Link>
                <Link className='' href=''><a>shipping</a></Link>
            </div>
        </div>
    );
}


