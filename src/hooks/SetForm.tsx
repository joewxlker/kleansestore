import { useState } from "react";

interface FormObj {
  firstname?: '';
  lastname?: '';
  email?: '',
  pass?: '',
  word?: '',
  hidden?: '',
  message?: '',
  day?: '',
  month?: '',
  year?: ''
}

export const formObj: FormObj = {}

const useSetForm = () => {
  const [value, setForm] = useState(formObj);
  return [value, (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((oldValue) => {
      return { ...oldValue, [event.target.name]: event.target.value };
    });
  },
  ] as const;
};

export default useSetForm;