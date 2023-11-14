import Header from "../components/Header";
import Signup from "../components/Signup";
import "./signup_style.css";

export default function SignupPage(){
    return(
        <>
        <div className="container_signup">
            <Header
              heading="Faça seu cadastro"
              paragraph="Já possui cadastro? "
              linkName="Acesse"
              linkUrl="/signin"
            />
            <Signup/>
        </div>
        </>
    )
}

