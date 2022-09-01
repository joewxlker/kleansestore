import { FC } from "react";

interface LayoverProps { children: JSX.Element; }
export const Layover: FC<LayoverProps> = ({ children }): JSX.Element => {
    return (
        <>
            <div id='fadein' className='fixed top-0 w-screen h-screen flex items-center justify-center' style={{ zIndex: '110', height: '100vh' }}>
                <div className='lg:w-4/6 md:w-5/6 w-full bg-white shadow-xl' style={{ height: '80%' }}>
                    {children}
                </div>
            </div>
            <div
                id='hardfadein'
                className='h-full fixed top-0 w-full'
                style={{ backgroundColor: 'rgba(0,0,0,0.7)', zIndex: '100' }}
            />
        </>
    )
}