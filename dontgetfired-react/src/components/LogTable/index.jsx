import { useEffect, useState } from "react";
import { Container } from "./styles";
import axios from "../../utils/axios";

// interface Log{
//     id: number;
//     dataCreatedAt: string;
//     mensagem: string;
//     userId: Number;
// }

export function LogTable() {
  const [logs, setLogs] = useState([]);

  const id = localStorage.getItem("@dontgetfired:user");

  let lista = [];

  // console.log(id);

  useEffect(() => {
    // fetch('https://localhost:5001/api/log').then(response => response.json())
    // .then(data => console.log(data[0].id))

    axios.get("https://localhost:5001/api/log/").then((response) => {
      // const { UserId } = response.data;
      // console.log(response.data);

      for (const log of response.data) {
        // console.log(log.userId);
        // setLogs(response.data)
        console.log(log.userId);
        if (id === log.userId.toString()) {
          lista.push(log);
          // setLogs(log[id])
          // console.log(response.data)
        }

        setLogs(lista);
        console.log(lista);
      }
    });
  }, []);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>DataCreatedAt</th>
            <th>Mensagem</th>
            <th>UserId</th>
          </tr>
        </thead>

        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.id}</td>
              <td className={log.type}>{log.dataCreateAt}</td>
              <td>{log.mensagem}</td>
              <td>{log.userId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
