import AccessLink from "../components/AccessLink";
import Login from "../components/Login";
import "./login_style.css";
import dontgetfired from "../images/DGF.png";
import avatar from "../images/user_logo_white.svg";

export default function LoginPage() {
  return (
    <>
      <main>
        <div className="green_vertical_bar"></div>
        <div className="container_login_form">
          <div className="avatar">
            <img alt="logo" className="h-14 w-200" src={avatar} />
          </div>
          <Login />
          <AccessLink
            heading="Acesse sua conta"
            paragraph="Não possui cadastro? "
            linkName="Cadastre-se"
            linkUrl="/signup"
          />
        </div>
        <div className="flex justify-center">
          <img alt="logo" className="h-14 w-200" src={dontgetfired} />
        </div>
        <div className="padding: 0 3rem 0 0;"></div>
      </main>
    </>
  );
}
