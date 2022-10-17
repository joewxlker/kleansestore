import { useState } from "react";
// import { SignUpForm } from "../pages/signup";

export type FormData = {
  phonenumber?: string;
  firstname?: string;
  lastname?: string,
  email: string;
  password?: string,
  confirm_password?: string;
  message?: string;
  day?: string;
  month?: string;
  year?: string;
  subject?: string;
  hidden: string
}

const useSetForm = (component: FormData) => {
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