import Header from "../components/Header";
import RecoverPassword from "../components/RecoverPassword";
import "./signup_style.css";

export default function RecoverPasswordPage(){
    return(
        <>
        <div className="container_signup">
            <Header
              heading="Recuperar sua senha"
              paragraph=""
              linkName="Voltar para o login"
              linkUrl="/signin"
            />
            <RecoverPassword/>
        </div>
        </>
    )
}

