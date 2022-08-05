import type { NextPage } from "next";
import Link from "next/link";
import { FC } from "react";
import './HeaderBig.css'

interface LayoutProps{ children: JSX.Element; }
interface HeaderProps { }
interface FooterProps { }

const Layout: FC<LayoutProps> = ({children}): JSX.Element => {
    return (
        <>
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
                <header className={`header-container-${scroll}`} >
                    <span className='header-contact-info'>
                        {/* <span className=''><p>+61 0333643418</p><i class="fak fa-phone-office-thin-1-"></i></span> */}
                        <span><p>kleanseaustralia@kleansebeauty.co.au</p></span>
                    </span>
                        <ul className='nav-container'>
                            {/* {theme.map((data) => {
                                return (
                                )
                            })} */}
                        </ul>
                    <span className='header-button-container'>
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

export const Footer: FC<FooterProps> = ():JSX.Element => {
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



