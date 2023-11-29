import { useEffect, useState } from "react";
import { Container } from "./styles";
import axios from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { FiX } from "react-icons/fi";
import { Section } from "../../components/Section";

export function LogTable({ isNew, value, onClick, ...rest }) {
  const navigate = useNavigate();
  const [logs, setLogs] = useState([]);

  const id = localStorage.getItem("@dontgetfired:user");

  let lista = [];

  useEffect(() => {
    axios.get("http://localhost:5001/api/log/").then((response) => {
    // axios.get(`http://localhost:5001/api/user/${id}`).then((response) => {
      for (const log of response.data) {
        if (id === log.userId.toString()) {
          lista.push(log);
        }

        setLogs(lista);
      }
      lista = [];
    });
  }, []);

  function handleLogDescription(id) {
    navigate(`/details/${id}`);
  }

  return (
    <Container>
      <Section title="Log Do Usuário do Sistema"></Section>

      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Data de Criação do Log</th>
            <th>Mensagem</th>
            <th>Id do Usuário</th>
            <th>Opção</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log) => (
            <tr key={log.id} onClick={() => handleLogDescription(log.id)}>
              <td>{log.id}</td>
              <td className={log.type}>{
              log.dataCreateAt
              }</td>
              <td>{log.mensagem}</td>
              <td>{log.userId}</td>
              <td className="x">
                <button type="button" onClick={onClick}>
                  {<FiX />}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
