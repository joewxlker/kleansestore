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
            <div id='spacer' className="h-24 w-full bg-salmon"> g <br /> h <br /></div>
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
    // toggles setBoolean in layout component

    return (
        <>
            <header className='bg-white fixed flex items-center h-20 flex-row shadow-xl w-screen justify-center z-10' >
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
                <span className='w-2/6 flex justify-center'>
                    <button onClick={callback}>CART</button>
                    {/**  triggers useCallback */}
                </span>
                {/* {cartItems.length > 0 && <div className='cart-notifier'></div>} */}
            </header>

        </>
    )
}

export const Footer: FC<FooterProps> = (): JSX.Element => {
    return (
        <div className='flex flex-row relative w-screen justify-center z-2'>
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

export const Sidemenu: FC<SidemenuProps> = ({ }): JSX.Element => {

    const [errer, setError] = useState<string | null>(null);
    const { data: session } = useSession()
    // using session here to render login / logout 

    if (session) {
        return (
            <>
                <button onClick={e => signOut()}>Log out</button>

            </>
        )
    } return (
        <>
            <div className='fixed h-60 w-100 z-10 right-32 top-32 bg-grey'>
                <Form formData={{ email: '', password: '', hidden: '' }} target={'mongo.login'} buttons={[]} onResponse={e => signIn()} />
                {errer !== null && <h1>{errer}</h1>}
                <Link href={'/signup'}><a><p>Don&#39;t have an account? Sign up here</p></a></Link>
            </div>
        </>
    )

}


