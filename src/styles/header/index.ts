export const HeaderClasses = {
    header: (top: boolean) =>
        `${top ? 'bg-white h-20' : "bg-grey h-12 text-white"}
        transition-all sticky top-0 flex items-center flex-row shadow-xl w-[100vw] justify-evenly z-[100]
        p-3 duration-800`,
    
    underlay: (subject: boolean) =>
        `${subject ? 'flex' : 'hidden'}
        duration-500 fixed top-0 h-screen w-screen z-[1] bg-grey bg-opacity-30 transition-all`,

    cartContainer: (subject: boolean) =>
        `${subject ? 'opacity-100' : 'opacity-0 -translate-y-[20rem]'}
        lg:w-[20vw] lg:right-[17.6vw] lg:absolute lg:top-0
        md:w-80 md:right-[10vw] md:absolute md:top-0
        sm:bottom-0 sm:absolute
        z-20 shadow-2xl pb-5 bg-white flex flex-col justify-center items-center w-full h-60 fixed duration-500 transition overflow-scroll pt-60`,
    
    productsContainer: (subject: boolean) =>
        `${subject ? 'opacity-100' : ' opacity-0 -translate-y-[20rem]'}
        lg:absolute lg:top-0
        md:absolute md:top-0
        duration-500 transition z-20 shadow-2xl h-60 pt-8 flex flex-col justify-center items-center bg-grey min-h-[20vh] w-[80vw] mx-[10vw]`,
    
    menuContainer: (subject: boolean) =>
        `${subject ? 'opacity-100' : ' opacity-0 translate-y-[20rem]'} 
        duration-500 transition fixed lg:hidden md:hidden sm:visible z-20 bottom-0
        flex text-white flex-col justify-center items-center w-full shadow-grey
        shadow-xl bg-grey`,
    
    logoWrapper: 'lg:w-2/6 md:w-2/6 sm:1/6 flex flex-col  items-center hover:cursor-pointer',
    linksWrapper: 'lg:w-2/6 md:w-2/6 sm:w-px flex flex-row justify-evenly  lg:visible md:visible invisible',
    headerControlsWrapper: 'lg:w-2/6 md:w-2/6 sm:w-2/6 h-full justify-center flex flex-row',
    cartIcon: 'lg:flex mx-2 h-full md:flex sm:hidden',
    cartIconMobile: 'lg:hidden md:hidden sm:flex h-full w-1/2',
    authButtonWrapper: 'flex flex-row w-[7rem] items-center space-evenly flex-nowrap md:flex lg:flex sm:hidden ',
    loginButton: 'hover:text-grey-light text-center text-sm',
    signupText: "hover:text-grey-light cursor-pointer text-center w-1/2 text-sm",
    mobileDropdownButton: 'md:hidden lg:hidden flex hover:text-grey-light',
}  