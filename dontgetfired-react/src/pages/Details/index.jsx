import { Container, Content } from "./styles";
import { Button } from "../../components/Button";
import { ButtonText } from "../../components/ButtonText";
import axios from "../../utils/axios";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Details() {
  const [authenticated, setAuthenticated] = useState(Cookies.get("token"));

  const [data, setData] = useState(null);
  const params = useParams();
  const navigate = useNavigate();

  function handleBack() {
    navigate("/");
  }

  async function handleRemoveLog() {
    const confirmRemove = window.confirm("Deseja excluir o Log?");
    if (confirmRemove) {
      await axios.delete(`/api/log/${params.id}`);
      navigate("/");
    }
  }

  const idUser = localStorage.getItem("@dontgetfired:user");


  useEffect(() => {
    async function fetchLog() {
      const response = await axios.get(`/api/log/${params.id}`);
      // console.log(typeof response.data.userId);
      // console.log(typeof idUser);
      if (authenticated && response.data.userId.toString() === (idUser)) {

        setData(response.data);
      } 
      
    }
     fetchLog();

  }, []);

  if (!authenticated) {
    setAuthenticated("")
    return <Navigate replace to="/" />;
  } else {
    return (
      <Container>
        {data && (
          <main>
            <Content>
              <ButtonText title="Excluir Log" onClick={handleRemoveLog} />

              <h1>ID do Log: {data.id}</h1>

              <p>Data da Criação: {data.dataCreateAt}</p>
              <p>Mensagem: {data.mensagem}</p>
              <p>ID do Usuário: {data.userId}</p>

              <Button title="Voltar" onClick={handleBack} />
            </Content>
          </main>
        )}
      </Container>
    );
  }
}
