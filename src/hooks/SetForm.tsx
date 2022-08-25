import { useState } from "react";
// import { SignUpForm } from "../pages/signup";

export interface SignUpForm {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  hidden: string;
  day: string;
  month: string;
  year: string;
}

export interface LoginForm {
  email: string;
  password: string;
  hidden: string;
}

export interface ContactForm {
  firstname: string;
  message: string;
  email: string
}

export type FormType<T extends SignUpForm | LoginForm | ContactForm> = T

const useSetForm = (component: FormType<LoginForm | SignUpForm | ContactForm>) => {
  // component = object, is either SignupForm or LoginForm
  const [value, setForm] = useState(component);
  return [value, (event: React.ChangeEvent<HTMLInputElement>, argument: string) => {
    if (event.target.name !== undefined) return setForm((oldValue) => {
      return { ...oldValue, [event.target.name]: event.target.value };
    }); else return setForm((oldValue) => {
      return { ...oldValue, [argument]: event.target.value };
    })
  },
  ] as const;
};

export default useSetForm;