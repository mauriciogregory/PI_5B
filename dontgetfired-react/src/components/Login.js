import React, { useState } from "react";
import Cookies from "js-cookie";
import FormAction from "./FormAction";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import axios from "../utils/axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [loginState, setLoginState] = useState({});
  const [responseStatus, setResponseStatus] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    authenticateUser();
  };

  const authenticateUser = async () => {
    try {
      const response = await axios.post("/api/auth/login", {
        email: loginState["email"],
        password: loginState["password"],
      });

      if (response.data.user) {
        let jwtToken = response.data.jwtToken;
        if (jwtToken) {
          // Save the JWT in the browser's cookies
          Cookies.set("token", jwtToken, 30);
          axios.defaults.headers.common.Authorization = `Bearer ${jwtToken}`;

          const { user } = response.data;

          localStorage.setItem("@dontgetfired:user", JSON.stringify(user.id));
          // localStorage.setItem("@dontgetfired:token", token);

          navigate("/");
        } else {
          Cookies.remove("token");
          localStorage.removeItem("@dontgetfired:user");
          delete axios.defaults.headers.common.Authorization;
        }
      }
    } catch (error) {
      if (error.response.data.message) {
        const err_msg = error.response.data.message || "";
        setResponseStatus(err_msg);
      } else {
        setResponseStatus("Não foi possível autenticar");
      }
      Cookies.remove("token");
      // const token = localStorage.removeItem("@dontgetfired:token");
      localStorage.removeItem("@dontgetfired:user");
      delete axios.defaults.headers.common.Authorization;
      console.log(error);
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleLogin}>
      <div className="-space-y-px">
        <Input
          handleChange={handleChange}
          value={loginState["email"]}
          labelText="Email address"
          labelFor="email-address"
          id="email"
          name="email"
          type="email"
          isRequired={true}
          placeholder={"Informe seu e-mail"}
        />
        <Input
          handleChange={handleChange}
          value={loginState["password"]}
          labelText="Password"
          labelFor="password"
          id="password"
          name="password"
          type="password"
          isRequired={true}
          placeholder="Informe sua senha"
        />
        <Link
          to="/recover-password"
          className="text-sm font-medium text-green-600 hover:text-green-500"
        >
          Esqueceu a senha?
        </Link>
      </div>
      <p className="text-sm font-medium text-red-300">{responseStatus}</p>
      <FormAction handleLogin={handleLogin} text="Login" />
    </form>
  );
};

export default Login;
