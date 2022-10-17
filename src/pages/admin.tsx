import { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import { FC, useCallback, useEffect, useRef, useState } from "react";

const Admin: NextPage = () => {

    const { data: session } = useSession();

    // if (!session) return (
    //     <div className='w-screen h-screen flex items-center justify-center'>
    //         <button onClick={e => signIn()}>LOGIN</button>
    //     </div>
    // )

    return (
        <>

            <Head>
                <meta name="description" content="Find out what drives us at kleanse" />
            </Head>
            <div className='w-screen flex flex-col justify-center items-center pt-18 flex-wrap'>
                <div className='h-80 w-1/2 flex flex-col items-center justify-evenly'>
                    <h1 className='text-4xl'>Admin KLEANSE</h1>
                </div>
                <Analytics />
            </div>
        </>

    )
}

export default Admin

export const Analytics: FC = (): JSX.Element => {
    const [mongo, setMongo] = useState(0);
    const [mongoIndex, setMongoIndex] = useState(0);
    return (
        <>
            <div className='container mb-6 flex flex-row justify-evenly items-center flex-wrap rounded-3xl'>
                <Wrapper
                    index={mongoIndex}
                    total={mongo}
                    title='MongoDB'
                    dark
                    listData={[
                        { title: 'Read', data: ['$0.10 / million for the first 50 million bytes per day', 'Next 500 million bytes: $0.05 / million bytes', 'Reads thereafter: $0.01 / million bytes'] },
                        { title: 'Write', data: ['$1.00 / million bytes'] },
                        { title: 'Storage', data: ['$0.25 / giga-bytes per month'] }
                    ]}
                    subTitle={['']}><MongoModule onMongo={(data) => { setMongo(data) }} setActive={(index: number) => setMongoIndex(index)} /></Wrapper>
            </div>
        </>
    )
}

const MongoModule: FC<{ onMongo: (data: number) => void; setActive: (index: number) => void }> = ({ onMongo, setActive }): JSX.Element => {
    const [type, setType] = useState<'reads' | 'writes' | 'storage'>('reads');
    const [numArr, setNumArr] = useState<Array<number>>([])
    const DIVELEMENT = useRef<HTMLDivElement>(null)
    const [bytes, setBytes] = useState({ reads: 0, writes: 0, storage: 0 });
    const items = ['reads', 'writes', 'storage']

    useEffect(() => {
        if (!DIVELEMENT.current?.clientWidth) return
        let numbers: Array<number> = [];
        for (let i = 0; i < DIVELEMENT.current?.clientWidth; i++) {
            numbers.push(i);
        }
        setNumArr(numbers);
    }, [])

    const handleCallback = () => {
        return onMongo(((bytes['reads'] / 10) * 30) + (bytes['writes'] * 30) + ((bytes['storage'] / 4)))
    }

    const handleSetActive = useCallback((types: typeof type) => {
        return setActive(items.indexOf(types))
    }, [setActive])

    const handleClick = (data: number) => {
        type === 'reads' && setBytes({ ...bytes, 'reads': (data) })
        type === 'writes' && setBytes({ ...bytes, 'writes': (data) })
        type === 'storage' && setBytes({ ...bytes, 'storage': (data) })
    }

    return (
        <div ref={DIVELEMENT} className='w-full h-full flex justify-center items-center flex-col text-white '>
            {type === 'reads' && <div className='h-[70%] w-full flex justify-center items-center flex-col'>
                <p>{bytes['reads']}M bytes</p>
                <p>${bytes['reads'] / 10} Daily</p>
            </div>}
            {type === 'writes' && <div className='h-[70%] w-full flex justify-center items-center flex-col'>
                <p>{bytes['writes']}M bytes</p>
                <p>${bytes['writes']} Daily</p>
            </div>}
            {type === 'storage' && <div className='h-[70%] w-full flex justify-center items-center flex-col'>
                <p>{bytes['storage']} Gigabytes</p>
                <p>${bytes['storage'] / 4} Monthly</p>
            </div>}
            <div className='container h-[10%]'>
                {numArr.map((data) => {
                    return (
                        <button
                            key={data}
                            value={data}
                            name=''
                            className={`${data % 2 === 0 ? 'bg-grey' : 'bg-white'} ${data === bytes[type] && '-translate-y-6 bg-accent'} w-px h-full`}
                            onMouseEnter={e => { handleClick(data); handleCallback() }}>
                        </button>
                    )
                })}
            </div>
            <div className='h-[20%] w-full flex flex-row justify-evenly items-center'>
                <button className={`${type === 'reads' && 'bg-accent'} w-[33.333333%] h-full translate-y-1`} onClick={e => { setType('reads'); handleSetActive('reads') }}>Reads</button>
                <button className={`${type === 'writes' && 'bg-accent'} w-[33.333333%] h-full translate-y-1`} onClick={e => { setType('writes'); handleSetActive('writes') }}>Writes</button>
                <button className={`${type === 'storage' && 'bg-accent'} w-[33.333333%] h-full translate-y-1`} onClick={e => { setType('storage'); handleSetActive('storage') }}>Storage</button>
            </div>
        </div>
    )
}

const Wrapper: FC<{
    children: JSX.Element;
    title: string;
    dark?: boolean;
    listData: Array<{ title: string, data: Array<string> }>;
    subTitle: Array<string>;
    total: number;
    index: number;
}> = ({ children, title, dark, total, listData, index }): JSX.Element => {
    useEffect(() => {
        console.log(index)
    })
    return (
        <div className='flex flex-row w-full my-20'>
            <div className='w-1/2 flex flex-col justify-start items-center min-w-[20rem] shadow-2xl translate-x-20 z-50 '>
                <div className={`${dark ? 'bg-grey' : ''} flex flex-col justify-start items-center w-full h-80 shadow-xl rounded-t-lg`}>
                    <h1 className='text-white p-5 font-bold text-lg'>{title}</h1>
                    {children}
                </div>
                <div className='flex flex-col justify-start items-start w-full h-40 shadow-xl bg-white rounded-b-lg'>
                    <ul className='flex flex-col justify-start items-start'>
                        <h2 className='font-bold'>{listData[index]?.title}</h2>
                        {listData[index]?.data.map((data, idx) => {
                            return (
                                <li key={idx} className='w-full text-left'>{data}</li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            <div className='w-1/2 h-[28rem] bg-grey translate-y-20 flex-col flex justify-center items-center opacity-80 shadow-xl -translate-x-20 '>
                <h1 className='text-6xl font-bold text-white'>${total}</h1>
                <h2 className='text-xl font-bold text-white '>Monthly</h2>
            </div>
        </div>
    )
}
