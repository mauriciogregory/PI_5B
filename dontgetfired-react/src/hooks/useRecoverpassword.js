import { useState } from "react";
import axios from "../utils/axios";
import { useNavigate } from "react-router-dom";

const useRecoverPassword = () => {
    const [recoverLogin, setRecoverLogin] = useState({email: "", recovery_code: "", password: "",confirm_password: "" });
    const [step, setStep] = useState("send-code");
    const navigate = useNavigate();
    const [responseStatus, setResponseStatus] = useState("");
    const handleChange = (e) =>
    setRecoverLogin({ ...recoverLogin, [e.target.id]: e.target.value });
  
    const handleSubmit = (e) => {
      e.preventDefault();
      if (step === "send-code")
        validateEmail();
    else if (step === "validate-code")
        validateCode();
    else{
        changePassword();
    }
    };

  const validateEmail = async () => {
    try {
        const response = await axios.post('/api/auth/send-email', {
          email: recoverLogin["email"],
        })
        const data = response.data;
        if (data){
            setStep("validate-code")
            setResponseStatus("Código enviado para o email informado!")
        } else {
            setRecoverLogin({...recoverLogin, email: ""})
            setResponseStatus("Email não encontrado!")
        }
      } catch (error) {
        if (error.response.data.message){
          const err_msg = error.response.data.message || ""
          setResponseStatus(err_msg)
        }
        console.log(error)
      }
  }

  const validateCode = async () => {
    try {
        const response = await axios.post('/api/auth/validate-code', {
          email: recoverLogin["email"],
          token: recoverLogin["recovery_code"],
          password: recoverLogin["password"]
        })
        if (response.status === 200){
          setResponseStatus("Senha alterada com sucesso!");
          setRecoverLogin({email: "", recovery_code: "", password: "",confirm_password: "" });
          navigate("/signin")
        } else {
          setRecoverLogin({...recoverLogin, password: "",confirm_password:"" })
          setResponseStatus("Não foi possível alterar a senha!")
        }
      } catch (error) {
        if (error.response.data.message){
          const err_msg = error.response.data.message || ""
          if (err_msg.includes('Token expirado')){
            setStep("send-code")
            setRecoverLogin({recovery_code: "", password: "",confirm_password: "" });
          }
          setResponseStatus(error.response.data.message)
        } else{
          setResponseStatus("Não foi possível alterar a senha!")
        }
        console.log(error)
      }
  }

  const changePassword = async () => {
    try {
        const response = await axios.post('/api/user/change-password', {
          email: recoverLogin["email"],
          password: recoverLogin["password"]
        })
        const data = response.data;
        console.log(data);
        if (data.success){
            setResponseStatus("Senha alterada com sucesso!");
            setRecoverLogin({email: "", recovery_code: "", password: "",confirm_password: "" });
            navigate("/signin")
        } else {
            setRecoverLogin({...recoverLogin, password: "",confirm_password:"" })
            setResponseStatus("Não foi possível alterar a senha!")
        }
      } catch (error) {
        console.log(error)
      }
  }

  const actionLabel = step === 'send-code' ? "Enviar código" : step === 'validate-code' ? "Alterar senha" : "Alterar senha" 

  const actionDisabled = step === 'new-password' && recoverLogin.password !== recoverLogin.confirm_password

    return { 
        handleChange, 
        handleSubmit, 
        recoverLogin, 
        step,
        actionLabel,
        responseStatus,
        actionDisabled
    }
};

export default useRecoverPassword

