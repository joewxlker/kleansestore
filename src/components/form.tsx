import { FC, FormEvent, useCallback, useEffect, useState } from "react";
import { object } from "zod";
import useSetForm, { ContactForm, FormType, LoginForm, SignUpForm } from "../hooks/SetForm";
import { dateData } from "../utils/siteInfo";

interface FormProps {
    formData: SignUpForm | LoginForm | ContactForm
    onResponse: (data: any) => Promise<void> | void;
    buttons: Array<'day' | 'month' | 'year'> | [];
};

export const Form: FC<FormProps> = ({ buttons, onResponse, formData }): JSX.Element => {

    const [form, setForm] = useSetForm(formData);
    const [loading, setLoading] = useState<boolean>(false);

    const handleCallback = useCallback((data: FormType<SignUpForm | LoginForm | ContactForm>) => {
        onResponse(data)
    }, [onResponse])

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setLoading(true)

        //@ts-ignore
        if (form['hidden'] !== '') return;
        const emptyCheck = Object.values(form).map(e => { return e === '' });
        const filtered = emptyCheck.filter((x) => x === true);
        if ((Object.values(formData).length + Object.values(buttons).length) != Object.entries(form).length || filtered.length > 1)
            return setLoading(false);
        /** -1 here to remove hidden input value from equation, 
        * checks length of properties passed to component matches form input length.
        */
        handleCallback(form)

        //TODO fix infered output typing from tRPC
    }

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
                                type={types}
                                placeholder={types}
                                onChange={setForm} />)
                        //renders form text input elements  
                    })}

                    {buttons.map((period) => {
                        return (<select className="w-full p-2 m-2" key={period} name={period}>
                            {dateData[period].map((value) => {
                                return (
                                    //@ts-ignore
                                    <option key={value} name={value} value={value} onClick={e => { setForm(e, period) }}>{value}</option>
                                )
                            })}
                        </select>)
                    })}
                </div>
                <button className='bg-grey text-white p-2 px-5' type='submit' disabled={false}> Submit </button>
            </form>
        </div>
    )
}