import { FC, FormEvent, useCallback, useEffect, useState } from "react";
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
        const emptyCheck = Object.values(form).map(e => { return e === '' });
        // returns true at index of ''
        const filtered = emptyCheck.filter((x) => x === true);
        // filters through array of boolean values, returns empty array | [true, ...] 
        // @ts-ignore
        if ((Object.values(formData).length) != Object.entries(form).length || filtered.length > 1 || form['hidden'] !== '')
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
                <div className='w-1/2'>

                    {Object.keys(formData).map((types) => {
                        /** type is passed from parent elements,  */
                        return (
                            <input
                                className='w-full bg-grey p-2 m-2 text-white'
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
                                    <option key={value} name={value} value={value} onClick={e => setForm(e)}>{value}</option>
                                )
                            })}
                        </select>)
                    })}
                </div>
                <button type='submit' disabled={false}> Submit </button>
            </form>
        </div>
    )
}