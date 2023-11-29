import { useState } from "react";
import { signupFields } from "../constants";
import FormAction from "./FormAction";
import Input from "./Input";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

const fields = signupFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ""));

export default function Signup() {
  const [signupState, setSignupState] = useState(fieldsState);
  const disabledBtn = signupState.password !== signupState["confirm-password"] || !signupState.email || !signupState.name || !signupState.password
  const helperText = !signupState.email || !signupState.name || !signupState.password ? "Preencha os campos do formulário!" : signupState.password !== signupState["confirm-password"]  ? "As senhas informadas estão diferentes!" : ""  ;
  const navigate = useNavigate();

  const handleChange = (e) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(signupState);
    createAccount();
  };

  const createAccount = async () => {
    const body = {
      name: signupState.name,
      email: signupState.email,
      password: signupState.password,
      log: []
    };

    const res = await axios.post("/api/user", body ).then((res) => {
      alert("Usuário criado com sucesso")
      navigate("/signin")
    }).catch((error) => {
      if( error.response ){
          console.log(error.response.data); // => the response payload 
          const erro = (error.response.data).split("at")[0]
          alert(erro.split(":")[1]); //
      }
    })

    console.log(res);
    if(res !== undefined) {
      console.log("usuário criado com sucesso");
      alert("Usuário com sucesso!");
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={signupState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
            minLength={5}
          />
        ))}
        <p className="text-sm font-medium text-red-300">{helperText}</p>
        <FormAction handleSubmit={handleSubmit} text="Signup" disabled={disabledBtn} />
      </div>
    </form>
  );
}

