import { FC, FormEvent, useState } from "react";

interface MessengerProps { }
export const Messenger: FC<MessengerProps> = ({ }): JSX.Element => {

    const [formData, setFormData] = useState('');
    const [messages, setMessages] = useState<Array<string>>([]);
    const [popup, setPopup] = useState<boolean>(false);

    const fetch = () => {
        const messageList = window.localStorage.getItem('messages');
        if (messageList === null) return
        setMessages(JSON.parse(messageList));
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setMessages([...messages, formData]);
        window.localStorage.setItem('messages', JSON.stringify([...messages, formData]));
        setFormData('');
    }

    const DEVELOPMENT = false
    if (!DEVELOPMENT) return <></>

    return (
        <div className={`fixed bottom-0 right-40 w-[25rem] ${popup ? 'h-[50vh]' : 'h-12'}  bg-white z-50 shadow-2xl`}>
            <header onClick={e => { setPopup(!popup); fetch() }} className='w-full h-12 bg-grey-light flex flex-row justify-evenly items-center shadow-lg'>
                <div className='w-1/3 flex items-center'>
                </div>
                <div className='w-1/3 flex items-center'>
                    <div className='h-2 w-full bg-white' />
                </div>
                <div className='w-1/3 flex items-center'>
                </div>
            </header>
            <main className='shadow-grey shadow-inner'>
                {messages.length > 0 && messages.map((message) => { return <div key={message}>{message}</div> })}
            </main>
            {popup && <form className='w-full bottom-0 absolute h-12' onSubmit={e => handleSubmit(e)}>
                <input className='w-full h-full shadow-inner' value={formData} name='msg' onChange={e => setFormData(e.target.value)}></input>
            </form>}
        </div>
    )
}