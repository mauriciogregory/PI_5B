import FormAction from "./FormAction";
import Input from "./Input";
import useRecoverPassword from "../hooks/useRecoverpassword";

export default function Signup() {

  const {handleChange, handleSubmit, step, recoverLogin, actionLabel, actionDisabled, responseStatus} = useRecoverPassword();
  

  return (
        <form className="mt-8 space-y-6 w-full" onSubmit={handleSubmit}>
            <div>
            <Input
                handleChange={handleChange}
                value={recoverLogin["email"]}
                labelText="Endereço de email"
                labelFor="email-address"
                id="email"
                name="Endereço de email"
                type="email"
                isRequired={true}
                disabled={step!=='send-code'}
                placeholder="Informe seu email"
            />
                {step === 'validate-code' &&
                <div>
                <Input
                    handleChange={handleChange}
                    value={recoverLogin["recovery_code"]}
                    labelText="Código de recuperação"
                    labelFor="recovery-code"
                    id="recovery_code"
                    name="Código de verificação"
                    isRequired={true}
                    placeholder="Informe o código recebido por email"
                />
                <Input
                    handleChange={handleChange}
                    value={recoverLogin["password"]}
                    labelText="Nova senha"
                    labelFor="new-password"
                    id="password"
                    name="Nova senha"
                    isRequired={true}
                    placeholder="Informe a nova senha"
                    type="password"
                />
                <Input
                    handleChange={handleChange}
                    value={recoverLogin["confirm_password"]}
                    labelText="Confirme a nova senha"
                    labelFor="new-password-confirm"
                    id="confirm_password"
                    name="Confirme a nova senha"
                    isRequired={true}
                    placeholder="Informe novamente a senha"
                    type="password"
                />
                </div>
            }
            <p className="text-sm font-medium text-red-300">{responseStatus}</p>
                <FormAction handleSubmit={handleSubmit} text={actionLabel} disabled={actionDisabled}/>
            </div>
        </form>
      
  );
}
