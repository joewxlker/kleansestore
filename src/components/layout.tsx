import Head from "next/head";
import Link from "next/link";
import { FC } from "react";

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

export const Header: FC<HeaderProps> = ({ }): JSX.Element => {

    // if (cartItems === undefined) return
    // if (!mobile) {
    return (
        <>
            <header className='' style={{ zIndex: '10', display: 'fixed' }} >
                <span className='header-contact-info'>
                    <span className=''><p>+61 0333643418</p></span>
                    <span><p>kleanseaustralia@kleansebeauty.co.au</p></span>
                </span>
                <div className=''>
                    <Link href='/'><a>HOME</a></Link>
                    <Link href='/products'><a>PRODUCTS</a></Link>
                    <Link href=''><a>CONTACT</a></Link>
                    <Link href=''><a>ABOUT</a></Link>
                </div>
                <span className='header-button-container'>
                    <button>CART</button>
                </span>
                {/* {cartItems.length > 0 && <div className='cart-notifier'></div>} */}
            </header>

        </>
    )
    // } else {
    // return (
    //     <header className={`header-container-true`} >
    //         {/* {cartItems.length > 0 && <div className='cart-notifier'></div>} */}
    //     </header>
    // )
    // }
}

export const Footer: FC<FooterProps> = (): JSX.Element => {
    return (
        <div className='footer-main'>
            <div className='footer-text-container'>
                {/* <img src={kleanseLogo} /> */}
                <p className='footer-p'>copyright  kleanse industries limited...</p>
            </div>
            <div className='footer-links-container'>
                <a className='footer-svg-link' href=''><i className='footer-svg' ></i></a>
                <a className='footer-svg-link' href=''><i className='footer-svg' ></i></a>
                <a className='footer-svg-link' href=''><i className='footer-svg' ></i></a>
            </div>
            <div className='additional-links'>
                <Link className='text-link' href=''><a>about</a></Link>
                <Link className='text-link' href=''><a>privacy policy</a></Link>
                <Link className='text-link' href=''><a>careers</a></Link>
                <Link className='text-link' href=''><a>shipping</a></Link>
                <Link className='text-link' href=''><a>shipping</a></Link>
            </div>
        </div>
    );
}



