import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { FC, useCallback, useState } from "react";
import { Form } from "./form";

interface LayoutProps { children: JSX.Element; }
interface HeaderProps { onOpenSidebar: (e: any) => void, sidebar: boolean }
interface SidemenuProps { }
interface FooterProps { }

const Layout: FC<LayoutProps> = ({ children }): JSX.Element => {

    const [open, setOpen] = useState(false);

    return (
        <>
            <Head>
                <title>kleanse</title>
            </Head>
            {open && <Sidemenu />}
            <Header onOpenSidebar={e => { setOpen(e) }} sidebar={open} />
            {children}
            <Footer />
        </>
    )
}

export default Layout;

export const Header: FC<HeaderProps> = ({ onOpenSidebar, sidebar }): JSX.Element => {

    const callback = useCallback(() => {
        onOpenSidebar(!sidebar);
    }, [sidebar, onOpenSidebar])

    return (
        <>
            <header className='' style={{ zIndex: '10', display: 'fixed' }} >
                <span className='header-contact-info'>
                    <span className=''><p>+61 0333643418</p></span>
                    <span><p>kleanseaustralia@kleansebeauty.co.au</p></span>
                </span>
                <div className=''>
                    <Link href='/'><a>HOME</a></Link>
                    <Link href='/all-products'><a>PRODUCTS</a></Link>
                    <Link href='/contact'><a>CONTACT</a></Link>
                    <Link href='/about'><a>ABOUT</a></Link>
                </div>
                <span className='header-button-container'>
                    <button onClick={callback}>CART</button>
                </span>
                {/* {cartItems.length > 0 && <div className='cart-notifier'></div>} */}
            </header>

        </>
    )
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

export const Sidemenu: FC<SidemenuProps> = ({ }): JSX.Element => {

    const [errer, setError] = useState<string | null>(null);
    const { data: session } = useSession()

    if (session) {
        return (
            <>
                <button onClick={e => signOut()}>Log out</button>

            </>
        )
    } return (
        <>
            <div className=''>
                <Form type={['email', 'password', 'hidden']} target={'mongo.login'} buttons={[]} onResponse={e => signIn()} />
                {errer !== null && <h1>{errer}</h1>}
                <Link href={'/signup'}><a>Don't have an account? Sign up here</a></Link>
            </div>
        </>
    )

}


