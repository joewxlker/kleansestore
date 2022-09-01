import Image from "next/image";
import Link from "next/link";
import { FC, FormEvent, useCallback, useEffect, useState } from "react";
import useSetForm, { CheckoutForm, ContactForm, Email, FormType, JobApplicationForm, LoginForm, SignUpForm } from "../hooks/SetForm";
import { CheckoutWithoutSessionForm, CheckoutWithSessionForm } from "../pages/stripe/checkout";
import { dateData } from "../utils/siteInfo";
import { Login } from "./login";

interface FormProps {
    formData: SignUpForm | LoginForm | ContactForm | Email | CheckoutWithSessionForm | CheckoutWithoutSessionForm | JobApplicationForm
    onResponse: (data: any) => Promise<JSX.Element | null>;
    buttons: Array<'day' | 'month' | 'year'> | [];
};

export const Form: FC<FormProps> = ({ buttons, onResponse, formData }): JSX.Element => {

    const [form, setForm] = useSetForm(formData);
    const [input, setInput] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<JSX.Element | null>();

    const handleCallback = useCallback(async (data: FormType<SignUpForm | LoginForm | CheckoutForm | ContactForm | Email | JobApplicationForm>) => {
        setLoading(true);
        const res = await onResponse(data);
        setLoading(false)
        setError(res);
    }, [onResponse])

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!input) return
        // @ts-ignore
        handleCallback(form);
    }

    useEffect(() => {
        // @ts-ignore
        if (form['hidden'] !== '') return setInput(false);
        const text = Object.values(form).filter(e => e === '');
        //  @ts-ignore
        const button = buttons.filter((x) => form[x] === undefined);
        return setInput(text.length === 1 && button.length === 0);
    }, [form, setForm])


    return (
        <div className='h-1/2'>
            <form className='p-3 flex flex-col w-full justify-center items-center ' onSubmit={handleSubmit}>
                <div className='w-full'>

                    {Object.keys(formData).map((types) => {
                        /** type is passed from parent elements,  */
                        return (
                            <input
                                className='w-full bg-grey p-2 m-2 text-white'
                                style={{ paddingBottom: `${types === 'message' && '10rem'}` }}
                                key={types}
                                name={types}
                                // @ts-ignore
                                value={form[types]}
                                type={types === 'confirm_password' ? 'password' : types}
                                placeholder={types}
                                onChange={e => { setForm(e, '') }} />)
                        //renders form text input elements  
                    })}

                    {buttons.map((period) => {
                        return (<select className="w-full p-2 m-2" key={period} name={period}>

                            <option value="" disabled selected>{period}</option>
                            {dateData[period].map((value) => {
                                return (
                                    <>
                                        <option key={value} value={value} placeholder={period} onClick={(e: any) => { setForm(e, period) }}>{value}</option>
                                    </>
                                )
                            })}
                        </select>)
                    })}
                </div>
                <button className='bg-grey text-white p-2 px-5' type='submit' disabled={!input} style={{ opacity: `${!input ? '50%' : '100%'}` }}> Submit </button>
            </form>

            <div className='w-full justify-center items-center flex flex-col'>
                {error}
            </div>
            {loading && <p>Loading...</p>}
        </div>
    )
}