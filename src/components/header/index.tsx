import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { HeaderClasses } from "../../styles";
import { Cart } from "../cart";
import { Links } from "./links";
import { ProductMenu } from "./productMenu";

export const Header: FC = (): JSX.Element => {
    
    // toggles setBoolean in layout component
    const [cart, cartOpen] = useState(false);
    const [login, loginOpen] = useState(false);
    const [products, productsOpen] = useState(false);
    const [menu, menuOpen] = useState(false);
    const { data: session } = useSession();
    const [scrollHeightIsZero, setScrollHeightIsZero] = useState(true);
    
    const scroller = () => {
        if (window.scrollY === 0) {
            setScrollHeightIsZero(true);
        } else if (scrollHeightIsZero) {
            setScrollHeightIsZero(false)
        }
    }
    
    useEffect(() => {
        window.addEventListener('scroll', scroller)
        return () => window.removeEventListener('scroll', scroller);
    })
    
    const closeAllExcept = (exception: string) => {
        exception !== 'cart' && cartOpen(false);
        exception !== 'login' && loginOpen(false);
        exception !== 'products' && productsOpen(false);
        exception !== 'menu' && menuOpen(false)
    }
    
    const handleLogoClick = () => window.location.pathname === '/' ?
        window.scrollTo(0, 0) : window.location.href = '/'
    
    return (
        <>
            <header className={HeaderClasses.header(scrollHeightIsZero)}>
                <span id='hardfadein' className={HeaderClasses.logoWrapper}
                    onClick={handleLogoClick}>
                    <Image alt='kleanse wing logo' src='/images/kleanse-logos/kleanse-wing-in-text.svg' width={100} height={50}/>
                </span>

                <div id='hardfadein' className={HeaderClasses.linksWrapper}>
                    <Links onProducts={() => { productsOpen(true); closeAllExcept('products')}} />
                </div>

                <div id='hardfadein' className={HeaderClasses.headerControlsWrapper}>
                    <button className={HeaderClasses.cartIcon} name="cart" aria-label={`${cart ? 'close' : 'open'} cart item display`} onMouseEnter={() => { cartOpen(true); closeAllExcept('cart'); }}>
                        <Image alt='' src='/images/ui-elements/bags-shopping-thin.svg' width={20} height={20} />
                    </button>
                    <button className={HeaderClasses.cartIconMobile} name='cart' aria-label={`${cart ? 'close' : 'open'} cart item display`} onClick={() => { cartOpen(!cart); closeAllExcept('cart');  }}>
                        <Image alt='' src='/images/ui-elements/bags-shopping-thin.svg' width={20} height={20} />
                    </button>
                    {/* mobile cart */}
                    <div className={HeaderClasses.authButtonWrapper}>
                        <button className={HeaderClasses.loginButton} name={`${session ? 'logout' : 'login'}`} aria-label={`${login ? 'close' : 'open'} login interface`} onClick={() => signIn()}>
                            <p className=''>{session ? 'Logout' : 'Login /'}</p>
                        </button>
                        <Link href='/signup' className=''>
                            <p className={HeaderClasses.signupText}>{session ? '' : 'Signup'}</p>
                        </Link>
                    </div>
                    {/* mobile navigation */}
                    <button className={HeaderClasses.mobileDropdownButton} name='site navigation menu' aria-label={`${login ? 'close' : 'open'} navigation menu`} onClick={() => { menuOpen(!menu); closeAllExcept('menu'); }}>
                        <Image alt='' className='hover:text-grey-light' src='/images/ui-elements/bars-thin.svg' width={20} height={20} />
                    </button>
                </div>
                {/* header controls */}
            </header>

            <div className="sticky top-0 z-50">
                <div className={HeaderClasses.cartContainer(cart)}>
                    <Cart />
                </div>
                <div id='hardfadein' className={HeaderClasses.productsContainer(products)}>
                    <ProductMenu />
                </div>
                <div className={HeaderClasses.menuContainer(menu)} style={{ minHeight: '20vh' }}>
                    <Links onProducts={() => ''} />
                </div>
            </div>
            {cart &&  <div id='hardfadein' className={HeaderClasses.underlay(cart)} aria-label={`closing recently opened header interface`} onMouseEnter={() => closeAllExcept('')} />}
            {menu &&  <div id='hardfadein' className={HeaderClasses.underlay(cart)} aria-label={`closing recently opened header interface`} onMouseEnter={() => closeAllExcept('')} />}
            {products &&  <div id='hardfadein' className={HeaderClasses.underlay(cart)} aria-label={`closing recently opened header interface`} onMouseEnter={() => closeAllExcept('')} />}
        </>
    )
}